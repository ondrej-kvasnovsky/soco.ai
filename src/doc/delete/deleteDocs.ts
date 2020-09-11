import axios from 'axios';

import { getAdminConfig } from '../../http/getAdminConfig';
import { DeleteDocsRequest } from './DeleteDocsRequest';
import { DeleteDocsResponse } from './DeleteDocsResponse';
import { toError } from '../../http/toError';
import { waitUntilFinished } from '../..';
import { Config } from '../../Config';

const URL = 'https://api.soco.ai/v1/index/delete';

export const defaultRequest: DeleteDocsRequest = {
  doc_ids: undefined,
  auto_index: false,
};

export async function deleteDocs(
  request: DeleteDocsRequest = defaultRequest,
  config: Config,
  waitUntilOpFinished = false
): Promise<DeleteDocsResponse> {
  try {
    const response = await axios.post(URL, request, getAdminConfig(config));
    const data: DeleteDocsResponse = response.data;
    if (waitUntilOpFinished) {
      await waitUntilFinished(data.op_id, config);
    }
    return data;
  } catch (error) {
    throw toError(error);
  }
}
