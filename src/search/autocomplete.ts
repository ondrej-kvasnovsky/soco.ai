import axios from 'axios';

import { toError } from '../http/toError';
import { QueryRequest } from './QueryRequest';
import { getClientConfig } from '../http/getClientConfig';
import { Config } from '../Config';
import { AutocompleteResponse } from './AutocompleteResponse';

const URL = 'https://api.soco.ai/v1/search/autocomplete';

export async function autocomplete(request: QueryRequest, config: Config): Promise<AutocompleteResponse[]> {
  try {
    const response = await axios.post(URL, request, getClientConfig(config));
    return response.data;
  } catch (error) {
    throw toError(error);
  }
}
