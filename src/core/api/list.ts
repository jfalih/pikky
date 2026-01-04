import request from '@http/request';
import { ListParams, ListResponseDTO } from './list.types';

const PICSUM_BASE_URL = 'https://picsum.photos/v2';

export const getList = (params: ListParams): Promise<ListResponseDTO> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });
  return request(`${PICSUM_BASE_URL}/list?${queryParams.toString()}`);
};

