<script lang="ts">
	import '../styles.css';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
</script>

<svelte:head>
	<title>whentrain.nyc</title>
</svelte:head>

<Header />
<slot />
<Footer />

<style>
</style>
