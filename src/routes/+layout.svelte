<script lang="ts">
  import favicon from "$lib/assets/favicon/favicon.svg";
  import favicon96 from "$lib/assets/favicon/favicon-96x96.png";
  import favicon180 from "$lib/assets/favicon/apple-touch-icon.png";
  import faviconIco from "$lib/assets/favicon/favicon.ico";

  import ogImage from "$lib/assets/images/intro.png";
  import "./styles.css";

  let { children } = $props();
</script>

<svelte:head>
  <meta property="og:title" content="Patron Saint of the Squirrels" />
  <meta property="og:description" content="Happy birthday Helen!" />
  <meta property="og:image" content={ogImage} />
  <meta
    property="og:url"
    content="https://patron-saint-of-squrrels.vercel.app/"
  />
  <meta property="og:site_name" content="Patron Saint of the Squirrels" />
  <meta property="og:locale" content="en_US" />
  <meta property="article:author" content="Tim Smith" />

  <title>Patron Saint of the Squirrels</title>

  <link rel="icon" type="image/png" href={favicon96} sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href={favicon} />
  <link rel="shortcut icon" href={faviconIco} />
  <link rel="apple-touch-icon" sizes="180x180" href={favicon180} />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

{@render children()}
