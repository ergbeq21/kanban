<script>
   	import { onMount } from "svelte";
    import { Globe } from "lucide-svelte";
    let { createIssue = $bindable(), exportToCSV } = $props();
    let country = $state('');
    let countryCode = $state('');

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

                if (country !== "Unknown country") {
                    const countryRes = await fetch(
                        `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fields=cca2`
                    );
                    const countryData = await countryRes.json();
                    countryCode = countryData[0]?.cca2 || '';
                }
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
	<div class="flex items-center gap-2 text-sm text-gray-600">
        {#if countryCode && country !== "Unknown country" && country !== "Failed to fetch country" && country !== "Permission denied"}
            <img 
                src={`https://flagsapi.com/${countryCode}/flat/32.png`} 
                alt={`${country} flag`} 
                class="w-8 h-8 rounded-sm"
            />
            {country}
        {:else}
            <div class="flex items-center gap-2">
                <Globe size={20} class="text-gray-600" />
                <span>{country || "Loading..."}</span>
            </div>
        {/if}
    </div>

	<div class="flex gap-3 flex-row">
		<button
			class="px-4 py-2 border border-gray-700 cursor-pointer rounded text-gray-700 transition"
			onclick={exportToCSV}>
			Export as CSV
		</button>

		<button
			class="px-4 py-2 border border-gray-700 cursor-pointer rounded text-gray-700 transition"
			onclick={() => (createIssue = true)}>
			Add Task
		</button>
	</div>

</header>
