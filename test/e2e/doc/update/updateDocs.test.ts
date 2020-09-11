import { updateDocs } from '../../../../src';
import { UpdateDocsRequest } from '../../../../src';

import { addSampleDocs } from '../add/addSampleDocs';
import { getTestConfig } from '../../getTestConfig';
import { cleanup } from '../../cleanup';

describe('updateDocs', () => {
  beforeEach(async () => {
    await cleanup();
  });

  it('adds a doc', async () => {
    const sampleDocs = await addSampleDocs();

    const request: UpdateDocsRequest = {
      data: [
        {
          _id: sampleDocs[0],
          data: [{ text: 'ok, lets talk about something else', type: 'content' }],
          meta: { someMeta: 'mata info is mandatory' },
          doc_type: 'soco_doc',
        },
      ],
    };
    const response = await updateDocs(request, getTestConfig(), true);

    expect(response).toBeDefined();
  });
});
