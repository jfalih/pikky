export type ListItemDTO = {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
};

export type ListParams = {
    page: number;
    limit: number;
};

export type ListResponseDTO = ListItemDTO[];
