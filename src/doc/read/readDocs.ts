import axios from 'axios';

import { getAdminConfig } from '../../http/getAdminConfig';

import { ReadDocsRequest } from './ReadDocsRequest';
import { ReadDocsResponse } from './ReadDocsResponse';
import { toError } from '../../http/toError';
import { Config } from '../../Config';

const URL = 'https://api.soco.ai/v1/index/read';

export async function readDocs(request: ReadDocsRequest, config: Config): Promise<ReadDocsResponse[]> {
  try {
    const response = await axios.post(URL, request, getAdminConfig(config));
    return response.data;
  } catch (error) {
    throw toError(error);
  }
}
