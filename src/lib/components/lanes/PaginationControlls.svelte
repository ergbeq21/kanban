<script>
    import { ChevronLeft, ChevronRight } from "lucide-svelte";
    let { prevPage, currentPage,totalPages,nextPage } = $props();
</script>

<div class="flex justify-between items-center mt-3">
                <button
                    onclick={prevPage}
                    disabled={currentPage === 0}
                    class="p-2 rounded-md border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    aria-label="Previous page"
                >
                    <ChevronLeft size={20} />
                </button>
                <span class="text-sm text-gray-700"
                    >Page {currentPage + 1} of {totalPages}</span
                >
                <button
                    onclick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    class="p-2 rounded-md border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    aria-label="Next page"
                >
                    <ChevronRight size={20} />
        </button>
</div>