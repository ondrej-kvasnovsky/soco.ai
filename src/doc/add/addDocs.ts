import axios from 'axios';

import { toError } from '../../http/toError';
import { getAdminConfig } from '../../http/getAdminConfig';
import { waitUntilFinished } from '../..';

import { AddDocsRequest } from './AddDocsRequest';
import { AddDocsResponse } from './AddDocsResponse';
import { Config } from '../../Config';

const URL = 'https://api.soco.ai/v1/index/add';

export async function addDocs(
  request: AddDocsRequest,
  config: Config,
  waitUntilOpFinished = false
): Promise<AddDocsResponse> {
  try {
    const response = await axios.post(URL, request, getAdminConfig(config));
    if (waitUntilOpFinished) {
      await waitUntilFinished(response.data.op_id, config);
    }
    return response.data;
  } catch (error) {
    throw toError(error);
  }
}
