import { addUnstructuredDoc } from '../../../../src';
import { ParseDocRequest } from '../../../../src';

import { getTestConfig } from '../../getTestConfig';

describe('addUnstructuredDoc', () => {
  it('adds a PDF file', async () => {
    const parseRequest: ParseDocRequest = {
      client_id: getTestConfig().clientId,
      file_type: 'url',
      file_url: 'http://qiiip.org/Adobe Acrobat Reader FAQs.pdf',
      lang: 'en',
    };

    const response = await addUnstructuredDoc(parseRequest, undefined, true, getTestConfig(), true);

    expect(response.doc_ids[0]).toBeDefined();
    expect(response.op_id).toBeDefined();
  });
});
