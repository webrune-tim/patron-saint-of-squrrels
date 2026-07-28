<script lang="ts">
  import "./css/styles.css";

  let { children } = $props();
</script>

<svelte:head>
  <meta property="og:title" content="Patron Saint of the Squirrels" />
  <meta property="og:description" content="Happy birthday Helen!" />
  <meta property="og:image" content="https://patron-saint-of-squrrels.vercel.app/intro.png" />
  <meta
    property="og:url"
    content="https://patron-saint-of-squrrels.vercel.app/"
  />
  <meta property="og:site_name" content="Patron Saint of the Squirrels" />
  <meta property="og:locale" content="en_US" />
  <meta property="article:author" content="Tim Smith" />

  <title>Patron Saint of the Squirrels</title>

  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.json" />
</svelte:head>

{@render children()}
