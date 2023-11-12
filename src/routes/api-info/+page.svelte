<script lang="ts">
</script>

<div>
	<p>🚧 Work in progress 🚧</p>
	<p>
		This website uses the <a href="https://new.mta.info/developers">MTA's API</a>. They send the
		data in GTFS format using protobufs. I found this intimidating when I was starting out, and had
		to solve several hard-to-debug issues when I was getting it set up.
	</p>
	<p>
		Since I already am converting all of that data to JSON format, I wanted to make that a
		publically available API, and have written the backend with that in mind. I just have to figure
		out some stuff with how to actually sign up and assign API keys and rate limit.
	</p>
	<p>
		If you want to make a subway related project, please email me at <span class="email"
			>api.info@whentrain.nyc</span
		>
		and I can give you access. My name is Price!
	</p>
	<p>
		If you're in a hurry, you can take a look at how my code handles protobufs <a
			href="https://github.com/pricecomstock/whentrain-api/blob/main/src/mta/mtaRealTimeApi.ts"
			>here</a
		>. You could even download that
		<a href="https://github.com/pricecomstock/whentrain-api">repo</a> and run it yourself with your own
		MTA API key if you want to get started right away.
	</p>
</div>

<style>
	div {
		margin: auto;
		max-width: 30rem;
		/* text-align: center; */
	}

	.email {
		font-family: monospace;
	}
</style>
