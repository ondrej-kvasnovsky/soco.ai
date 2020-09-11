import { waitUntilFinished } from '../../../../src';
import { AddDocsRequest } from '../../../../src';
import { addDocs } from '../../../../src';

import { getTestConfig } from '../../getTestConfig';
import { cleanup } from '../../cleanup';

describe('waitUntilDone', () => {
  beforeEach(async () => {
    await cleanup();
  });

  it('waits until the operation is done', async () => {
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
    const response = await addDocs(request, getTestConfig());
    const operationId = response.op_id;

    const status = waitUntilFinished(operationId, getTestConfig());

    await expect(status).resolves.not.toThrow(Error);
  });
});
