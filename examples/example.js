import { derived, readable } from 'svelte/store';

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
