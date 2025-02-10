import { isClient } from '../_utils/detect-server-environment';
import { clientApi } from './client-api';
import { serverApi } from './server-api';

export const api = isClient() ? clientApi : serverApi;
