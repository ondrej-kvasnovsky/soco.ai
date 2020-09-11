import axios from 'axios';

import { getAdminConfig } from '../http/getAdminConfig';
import { DataUploadRequest } from './DataUploadRequest';
import { DataUploadResponse } from './DataUploadResponse';
import { Config } from '../Config';
import { toError } from '../http/toError';

const URL = 'https://api.soco.ai/v1/data/upload';

export async function uploadData(request: DataUploadRequest, config: Config): Promise<DataUploadResponse> {
  try {
    const response = await axios.post(URL, request, getAdminConfig(config));
    return response.data;
  } catch (error) {
    throw toError(error);
  }
}
