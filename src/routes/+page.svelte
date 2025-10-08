<script>
	import AddNewIssue from "$lib/components/AddNewIssue.svelte";
	import IssueCard from "$lib/components/IssueCard.svelte";
	import ArchiveLane from "$lib/components/lanes/ArchiveLane.svelte";
	import DoingLane from "$lib/components/lanes/DoingLane.svelte";
	import DoLane from "$lib/components/lanes/DoLane.svelte";
	import DoneLane from "$lib/components/lanes/DoneLane.svelte";

    let doList = $state([]);
    let doingList = $state([]);
    let doneList = $state([]);
    let archiveList = $state([]);
    let createIssue = $state(false);

</script>

{#if createIssue}
    <AddNewIssue bind:doList bind:createIssue/>
{/if}

<header class="w-full flex items-center justify-end p-4 bg-gray-100 shadow">
    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" 
        onclick={() => createIssue = true}>
        Add Task
    </button>
</header>

<main class="p-4 flex gap-4 w-full h-[calc(100vh-80px)] overflow-x-auto">
    <DoLane class="flex-1" bind:doList/>
    <DoingLane class="flex-1" bind:doingList/>
    <DoneLane class="flex-1" bind:doneList/>
    <ArchiveLane class="flex-1" bind:archiveList/>
</main>
