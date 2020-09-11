import { AddDocsRequest, SocoClient } from '../../src';
import { getTestConfig } from './getTestConfig';

describe('SocoClient', () => {
  let client: SocoClient;
  beforeEach(async () => {
    client = new SocoClient(getTestConfig());
  });

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

    const response = await client.addDocs(request, true);

    expect(response.doc_ids[0]).toBeDefined();
    expect(response.op_id).toBeDefined();
  });
});
