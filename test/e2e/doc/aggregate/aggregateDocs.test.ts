import { aggregateDocs } from '../../../../src';
import { AggregateDocsRequest } from '../../../../src';

import { getTestConfig } from '../../getTestConfig';
import { cleanup } from '../../cleanup';
import { addSampleDocs } from '../add/addSampleDocs';

describe('aggregateDocs', () => {
  beforeEach(async () => {
    await cleanup();
  });

  it('aggregates docs', async () => {
    await addSampleDocs();
    const request: AggregateDocsRequest = { field: '$meta.doc_id' };

    const response = await aggregateDocs(request, getTestConfig());

    expect(response).toEqual([
      { _id: { value: '1' }, totalCount: 1 },
      { _id: { value: '2' }, totalCount: 1 }
    ]);
  });
});
