import { defaultRequest, deleteDocs } from '../../../../src/doc/delete/deleteDocs';

import { addSampleDocs } from '../add/addSampleDocs';
import { getTestConfig } from '../../getTestConfig';
import { cleanup } from '../../cleanup';

describe('deleteDocs', () => {
  beforeEach(async () => {
    await cleanup();
  });

  it('delete all docs', async () => {
    const docs = await addSampleDocs();

    const response = await deleteDocs(defaultRequest, getTestConfig(), true);

    expect(response.deleted.acknowledged).toBeTruthy();
    expect(response.deleted.deleted_count).toEqual(docs.length);
  });

  it('delete a single doc by ID', async () => {
    const docs = await addSampleDocs();

    const request = { doc_ids: [docs[0]], auto_index: true };
    const response = await deleteDocs(request, getTestConfig(), true);

    expect(response.deleted.acknowledged).toBeTruthy();
    expect(response.deleted.deleted_count).toEqual(1);
  });
});
