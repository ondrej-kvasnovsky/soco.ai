import { addDocs, refresh } from '../../../../src';
import { AddDocsRequest } from '../../../../src';
import { getTestConfig } from '../../getTestConfig';

export async function addSampleDocs() {
  const request: AddDocsRequest = {
    data: [
      {
        data: [
          {
            text: 'there was bear called Jimmy',
            type: 'content',
          },
        ],
        meta: {
          doc_id: '1',
        },
        doc_type: 'soco_doc',
      },
      {
        data: [
          {
            text: 'Jimmy is a great and amazing guy, everyone likes him',
            type: 'content',
          },
        ],
        meta: {
          doc_id: '2',
        },
        doc_type: 'soco_doc',
      },
    ],
    auto_index: true,
  };

  const response = await addDocs(request, getTestConfig(), true);
  const refreshRequest = { params: { lm: {}, qa: {}, kw: {}, qq: {}, tuple: {} } };
  await refresh(refreshRequest, getTestConfig(), true);
  return response.doc_ids;
}
