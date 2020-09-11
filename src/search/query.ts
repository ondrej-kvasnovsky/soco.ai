import axios from 'axios';

import { toError } from '../http/toError';
import { QueryRequest } from './QueryRequest';
import { getClientConfig } from '../http/getClientConfig';
import { QueryResponse } from './QueryResponse';
import { Config } from '../Config';

const URL = 'https://api.soco.ai/v1/search/query';

export async function query(request: QueryRequest, config: Config): Promise<QueryResponse> {
  try {
    const response = await axios.post(URL, request, getClientConfig(config));
    return response.data;
  } catch (error) {
    throw toError(error);
  }
}
