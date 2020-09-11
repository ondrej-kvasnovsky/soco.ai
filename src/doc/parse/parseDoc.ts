import axios from 'axios';

import { getAdminConfig } from '../../http/getAdminConfig';
import { ParseDocRequest } from './ParseDocRequest';
import { DocPart } from '../DocPart';
import { toError } from '../../http/toError';
import { Config } from '../../Config';

const URL = 'https://api.soco.ai/v1/data/parse';

export async function parseDoc(request: ParseDocRequest, config: Config): Promise<DocPart[]> {
  try {
    const response = await axios.post(URL, request, getAdminConfig(config));
    return response.data;
  } catch (error) {
    throw toError(error);
  }
}
