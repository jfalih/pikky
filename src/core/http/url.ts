import qs, {StringifiableRecord} from 'query-string';
import Config from 'react-native-config';

const baseUrl = (
  host: string | undefined,
  path: string,
  query?: StringifiableRecord,
): string => qs.stringifyUrl({url: new URL(path, host).toString(), query});

export const apiGatewayUrl = (path: string, query?: StringifiableRecord): string =>
  baseUrl(Config.API_GATEWAY_URL, path, query);

export default apiGatewayUrl;
