<script>
  // @ts-nocheck

  import Prism from 'prismjs';
  import 'prism-svelte';
  import 'prismjs/themes/prism.css';

  import { exampleApp, exampleTheming } from './constants.js';
  import { getCssDocs } from './example.js';

  const docs = getCssDocs();
</script>

<div class="theming-docs">
  <section name="intro">
    <h2>Introduction</h2>
    <p>
      Theming Sozai apps is done through overriding the css variables in this
      document.
    </p>
    <pre class="language-svelte">
      <code>
{@html Prism.highlight(exampleApp, Prism.languages.svelte, 'svelte')}
      </code>
    </pre>
  </section>

  <section name="multiple-themes">
    <h2>Multiple Themes</h2>
    <p>
      Sozai apps may have multiple themes. The current theme is set through a
      theming store which is a string value of the theme name. Theme palletes
      are modified through [data-theme=] selectors. Sozai ships with a light
      theme and a dark theme.
    </p>
    <pre class="language-svelte">
      <code>
{@html Prism.highlight(exampleTheming, Prism.languages.svelte, 'svelte')}
      </code>
    </pre>
  </section>

  {#each $docs as { section, description, attrs }}
    <section name={section}>
      <h2>{section}</h2>
      <p class="section-description">{description}</p>
      <table>
        <tr>
          <th>Variable name</th>
          <th>Default value</th>
          <th>Description</th>
        </tr>
        {#each attrs as { name, value, info, style }}
          <tr>
            <td>
              {name}
            </td>
            <td {style}>
              {@html Prism.highlight(value, Prism.languages.css, 'css')}
            </td>
            <td>{info}</td>
          </tr>
        {/each}
      </table>
    </section>
  {/each}
</div>

<style>
  section {
    padding-bottom: 2rem;
  }

  table,
  td,
  th {
    border: 1px solid black;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.25rem 0.5rem;
  }

  th {
    text-align: left;
  }

  code {
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace !important;
    font-size: 1em !important;
  }
</style>
