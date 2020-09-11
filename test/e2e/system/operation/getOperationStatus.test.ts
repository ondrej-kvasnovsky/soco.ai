import { getOperationStatus } from '../../../../src';
import { AddDocsRequest } from '../../../../src';
import { addDocs } from '../../../../src';

import { getTestConfig } from '../../getTestConfig';
import { cleanup } from '../../cleanup';

describe('getOperationStatus', () => {
  beforeEach(async () => {
    await cleanup();
  });

  it('gets operation status by ID', async () => {
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
    const operationId = response.op_id;

    const status = await getOperationStatus(operationId, getTestConfig());

    expect(status._id).toBeDefined();
    expect(status.status).toBeDefined();
    expect(status.name).toEqual('add_doc');
    expect(status.progress).toBeDefined();
  });
});
