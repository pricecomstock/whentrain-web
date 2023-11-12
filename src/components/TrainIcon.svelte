<script lang="ts">
	export let train: string;
	export let size: string = '1em';
	export let alignMiddle: boolean = false;

	const iconDirectory = '/img/subway-icons';

	function iconImgFromTrain(trainName: string) {
		// All shuttles use same icon, but are labeled GS, or FS
		if (trainName.length > 1 && /s$/i.test(trainName)) return `${iconDirectory}/s.svg`;

		return `${iconDirectory}/${trainName.toLowerCase()}.svg`;
	}

	$: iconImg = iconImgFromTrain(train);
</script>

<span class={`icon ${alignMiddle ? 'align-middle' : ''}`} style={`height: ${size}; width: ${size}`}>
	{#if train}
		<img src={iconImg} alt={`${train}`} />
	{/if}
</span>

<style>
	img {
		height: 100%;
		width: auto;
	}

	.icon {
		display: inline-block;
	}

	.align-middle {
		vertical-align: middle;
		padding-bottom: 0.2em;
	}
</style>
