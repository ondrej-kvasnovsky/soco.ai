import { ParseDocRequest } from '../..';
import { parseDoc } from '../..';
import { AddDocsRequest } from './AddDocsRequest';
import { addDocs } from './addDocs';
import { AddDocsResponse } from './AddDocsResponse';
import { Config } from '../../Config';

export async function addUnstructuredDoc(
  parseRequest: ParseDocRequest,
  meta: any = {},
  auto_index = true,
  config: Config,
  waitUntilOpFinished = false
): Promise<AddDocsResponse> {
  const docParts = await parseDoc(parseRequest, config);

  const request: AddDocsRequest = {
    data: [
      {
        data: docParts,
        meta,
        doc_type: 'soco_doc',
      },
    ],
    auto_index,
  };

  return addDocs(request, config, waitUntilOpFinished);
}
