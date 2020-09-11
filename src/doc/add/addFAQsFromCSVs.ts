import { loadFAQsFromCSVs } from '../..';
import { addDocs } from './addDocs';
import { AddDocsRequest } from './AddDocsRequest';
import { AddDocsResponse } from './AddDocsResponse';
import { Config } from '../../Config';

export async function addFAQsFromCSVs(
  rootDir: string,
  meta: any = {},
  auto_index = false,
  config: Config,
  waitUntilOpFinished = false
): Promise<AddDocsResponse> {
  const docParts = await loadFAQsFromCSVs(rootDir);

  const request: AddDocsRequest = {
    data: [
      {
        data: docParts,
        meta,
        doc_type: 'soco_faq',
      },
    ],
    auto_index,
  };

  return addDocs(request, config, waitUntilOpFinished);
}
