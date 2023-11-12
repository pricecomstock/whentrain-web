<script lang="ts">
	import TrainIcon from './TrainIcon.svelte';

	const trainGroups = [
		['A', 'C', 'E'],
		['B', 'D', 'F', 'M'],
		['G'],
		['J', 'Z'],
		['L'],
		['N', 'Q', 'R', 'W'],
		['S'],
		['1', '2', '3'],
		['4', '5', '6'],
		['7']
	];

	let selected = '';

	function select(train: string) {
		selected = train;
	}
</script>

<div class="container">
	{#each trainGroups as trainGroup}
		<div class="train-group">
			{#each trainGroup as train, i}
				<a href={`/train/${train.toLowerCase()}`} class="option">
					<TrainIcon {train} size="max(3vw, 2rem)" />
				</a>
			{/each}
		</div>
	{/each}
</div>

<style>
	.container {
		padding: 0.75rem 0;

		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
	}

	.option {
		cursor: pointer;
		padding: 0 0.1rem;
	}
</style>
