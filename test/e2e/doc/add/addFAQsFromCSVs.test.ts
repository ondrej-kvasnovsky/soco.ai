import { addFAQsFromCSVs } from '../../../../src';

import { getTestConfig } from '../../getTestConfig';
import { cleanup } from '../../cleanup';

describe('addFAQsFromCSVs', () => {
  beforeEach(async () => {
    await cleanup();
  });

  it('adds a doc', async () => {
    const filePath = 'test/e2e/fixtures/dataset-1';

    const response = await addFAQsFromCSVs(filePath, {}, true, getTestConfig(), true);

    expect(response.doc_ids[0]).toBeDefined();
    expect(response.op_id).toBeDefined();
  });
});
