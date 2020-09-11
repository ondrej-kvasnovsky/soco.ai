import axios from 'axios';

import { waitUntilFinished } from '../..';
import { toError } from '../../http/toError';
import { getAdminConfig } from '../../http/getAdminConfig';

import { UpdateDocsRequest } from './UpdateDocsRequest';
import { UpdateDocsResponse } from './UpdateDocsResponse';
import { Config } from '../../Config';

const URL = 'https://api.soco.ai/v1/index/update';

export async function updateDocs(
  request: UpdateDocsRequest,
  config: Config,
  waitUntilOpFinished = false
): Promise<UpdateDocsResponse> {
  try {
    const response = await axios.post(URL, request, getAdminConfig(config));
    const data: UpdateDocsResponse = response.data;
    if (waitUntilOpFinished) {
      await waitUntilFinished(data.op_id, config);
    }
    return data;
  } catch (error) {
    throw toError(error);
  }
}
