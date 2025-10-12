<script>
    import { onMount } from "svelte";
	let { createIssue = $bindable() } = $props();
	let country = $state('');

	async function getCountry() {
		if (!navigator.geolocation) {
			country = "Geolocation not supported";
			return;
		}

		navigator.geolocation.getCurrentPosition(async (pos) => {
			const { latitude, longitude } = pos.coords;

			try {
				const res = await fetch(
					`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
				);
				const data = await res.json();
				country = data.address?.country || "Unknown country";
			} catch (err) {
				country = "Failed to fetch country";
				console.error(err);
			}
		}, () => {
			country = "Permission denied";
		});
	}

	onMount(() => {
		getCountry();
	});
</script>

<header class="w-full flex items-center justify-between p-4 bg-gray-100 shadow">
	<div class="text-s text-gray-600">
		{country}
	</div>
	<button
		class="px-4 py-2 border border-blue-700 cursor-pointer rounded text-blue-700 transition"
		onclick={() => (createIssue = true)}>
		Add Task
	</button>
</header>
