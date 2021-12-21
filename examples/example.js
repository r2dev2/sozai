import { derived, readable } from 'svelte/store';

const sozaiSrc = '../src/components/SozaiApp/SozaiApp.svelte';
let sourceMap = null;

export const getSourceMap = () => readable(sourceMap, set => {
	if (sourceMap != null) return;
	fetch('./build/bundle.js.map')
		.then(r => r.json())
		.then(map => {
			sourceMap = map;
			set(sourceMap);
		})
		.catch(e => console.error('Failed to fetch source map', e));
});

export const getSource = filename => derived(getSourceMap(), $sourceMap => {
	if ($sourceMap == null) return '...';
	const idx = $sourceMap.sources.findIndex(s => s == `../${filename}`);
	if (idx == null) return `ERR: did not find file '${filename}'`;
	return $sourceMap.sourcesContent[idx];
});

export const getExample = (filename, name) => derived(getSource(filename), $source => {
	if ($source == '...' || $source.startsWith('ERR')) return $source;
	// parsing html with regex will cause zalgo to come
	// so we use string methods like the sigma males that we are
	
	// Find start of sequence, then find idx of newline
	// <Example name="test-example-name" {filename}>
	//          ^^^^^^^^^^^^^^^^^^^^^^^^
	const exampleStartMidLineIdx = $source.indexOf(`name="${name}"`);
	const exampleStartIdx = $source.indexOf('\n', exampleStartMidLineIdx);
	const exampleEndIdx = $source.indexOf('</Example>', exampleStartIdx);
	const exampleSource = $source.substring(exampleStartIdx, exampleEndIdx);
	
	// exampleSource will start like
	// \n      <Component
	// ^^^^^^^^
	// whitespace to remove
	const amountSpaces = exampleSource.indexOf('<') - 1;
	return exampleSource.replaceAll(`\n${' '.repeat(amountSpaces)}`, '\n').trim();
});

const defaultSection = () => ({
	section: '',
	description: '',
	attrs: [{
		name: '',
		value: '',
		info: ''
	}].slice(1)
});

const parseDocExp = /(.+): (.+); \/\* (.+) \*\//;

export const getCssDocs = () => derived(getSource(sozaiSrc), $source => {
	// we will parse html with string methods once more cause we are sigmas
	const styleStartIdx = $source.indexOf('\n', $source.indexOf('<style'));
	const styleEndIdx = $source.indexOf('</style>');
	const styleSrc = $source.substring(styleStartIdx, styleEndIdx);

	let isCollectingSectionInfo = false;
	let currentSection = defaultSection();
	const sections = [];
	for (const line of styleSrc.split('\n').map(l => l.trim()).filter(Boolean)) {
		if (line.startsWith('/**')) {
			if (currentSection.attrs.length) {
				sections.push(currentSection);
				currentSection = defaultSection();
			}
			isCollectingSectionInfo = true;
			continue;
		}
		if (line.startsWith('*/')) {
			isCollectingSectionInfo = false;
			continue;
		}
		if (isCollectingSectionInfo) {
			const [ headerName, headerValue ] = line.split(': ');
			currentSection[headerName.toLowerCase()] = headerValue;
			continue;
		}
		const parsed = parseDocExp.exec(line);
		if (parsed) {
			const [_all, name, value, info ] = parsed;
			currentSection.attrs.push({ name, value, info });
		}
	}
	if (currentSection.attrs.length) {
		sections.push(currentSection);
	}
	return sections;
});
