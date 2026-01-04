import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getList } from "@core/api/list";
import { ListItemDTO } from "@core/api/list.types";

export const listQueryKeys = createQueryKeyStore({
    list: {
        getList: (limit: number) => ({
            queryKey: ['getList', limit],
            queryFn: ({ pageParam = 1 }: { pageParam?: number }): Promise<ListItemDTO[]> => {
                return getList({
                    page: pageParam || 1,
                    limit,
                });
            },
        }),
    },
});

export const useGetList = (limit: number = 100) => {
    return useInfiniteQuery<ListItemDTO[], Error, ListItemDTO[], readonly ["list", "getList", string, number], number>({
        ...listQueryKeys.list.getList(limit),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            // If the last page has items, return the next page number
            if (lastPage && lastPage.length > 0) {
                return allPages.length + 1;
            }
            // Otherwise, there are no more pages
            return undefined;
        },
    });
};