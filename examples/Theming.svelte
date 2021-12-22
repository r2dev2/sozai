<script>
  import Prism from 'prismjs';
  import 'prism-svelte';
  import 'prismjs/themes/prism.css';

  import { getCssDocs } from './example.js';

  const docs = getCssDocs();
</script>

<div class="theming-docs">
  {#each $docs as { section, description, attrs }}
    <section name={section}>
      <h2>{section}</h2>
      <p class="section-description">{description}</p>
      <table>
        <tr>
          <th>Variable name</th>
          <th>Variable value</th>
          <th>Variable description</th>
        </tr>
        {#each attrs as { name, value, info }}
          <tr>
            <td>{name}</td>
            <td>{@html Prism.highlight(value, Prism.languages.css, 'css')}</td>
            <td>{info}</td>
          </tr>
        {/each}
      </table>
    </section>
  {/each}
</div>

<style>
  table, td, th {
    border: 1px solid black;
    border-collapse: collapse;
  }

  th, td {
    padding: 0.25rem 0.5rem;
  }

  th {
    text-align: left;
  }
</style>
