import { addDocs } from '../../../../src';
import { AddDocsRequest } from '../../../../src';

import { getTestConfig } from '../../getTestConfig';

describe('addDocs', () => {

  it('adds a doc', async () => {
    const request: AddDocsRequest = {
      data: [
        {
          data: [{ text: 'there was bear called Jimmy', type: 'content' }],
          meta: { doc_id: '123' },
          doc_type: 'soco_doc',
        },
      ],
      auto_index: true,
    };

    const response = await addDocs(request, getTestConfig(), true);

    expect(response.doc_ids[0]).toBeDefined();
    expect(response.op_id).toBeDefined();
  });
});
