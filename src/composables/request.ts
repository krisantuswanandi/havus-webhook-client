import { computed } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";

interface Response {
  data: WadawRequest[] | null;
}

export function useWadawRequests(accountId: string) {
  const { data, isFetching, fetchNextPage, fetchPreviousPage } =
    useInfiniteQuery({
      queryKey: ["requests"],
      queryFn: async ({ pageParam = "", direction }) => {
        const baseUrl = import.meta.env.VITE_SERVER_URL;
        const url = `${baseUrl}api/v1/admin/${accountId}/requests`;

        const pageParamKey = direction === "forward" ? "max_id" : "min_id";

        const query = new URLSearchParams({ [pageParamKey]: pageParam });

        const response = await fetch(url + (query ? `?${query}` : ""));
        return response.json() as Promise<Response>;
      },
      initialPageParam: "",
      getNextPageParam: (lastPage, _pages, lastPageParam) => {
        if (!lastPage.data) {
          return lastPageParam || null;
        }
        const pageParam = lastPage.data[lastPage.data.length - 1].id;
        return pageParam || lastPageParam;
      },
      getPreviousPageParam: (lastPage, _pages, lastPageParam) => {
        if (!lastPage.data) {
          return lastPageParam || null;
        }
        const pageParam = lastPage.data[0].id;
        return pageParam || lastPageParam;
      },
      staleTime: 1000 * 60 * 15,
    });

  const count = computed(() => {
    return data.value?.pages.reduce(
      (acc, curr) => acc + (curr.data?.length || 0),
      0,
    );
  });

  return { data, count, isFetching, fetchNextPage, fetchPreviousPage };
}
