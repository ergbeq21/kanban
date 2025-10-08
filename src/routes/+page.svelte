<script>
	import AddNewIssue from "$lib/components/AddNewIssue.svelte";
	import IssueCard from "$lib/components/IssueCard.svelte";


    let doList = $state([]);
    let doingList = $state([]);
    let doneList = $state([]);
    let archivList = $state([]);

    let createIssue = $state(false);

</script>

{#if createIssue}
    <AddNewIssue bind:doList bind:createIssue/>
{/if}
 
<header class="w-full h-15 flex flex-row items-center justify-end p-10">

    <button class="p-2 bg-blue-500 text-white rounded cursor-pointer" onclick={()=> createIssue = true}>
        Add Task
    </button>

</header>
 
 
<main class="p-8 bg-gray-200 h-full w-full flex justify-between items-center gap-5">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <section class=" bg-white h-[350px] w-full space-y-2 flex flex-col gap-1 p-3">
        {#each doList as issue}
            <IssueCard {issue}/>
        {/each}
    </section>


</main>