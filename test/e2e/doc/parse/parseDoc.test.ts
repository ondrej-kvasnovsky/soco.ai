import { parseDoc } from '../../../../src';
import { ParseDocRequest } from '../../../../src';

import { getTestConfig } from '../../getTestConfig';

describe('parseDoc', () => {
  it('parses a PDF document', async () => {
    const request: ParseDocRequest = {
      client_id: `a random string, does not have to be real SOCO client ID`,
      file_type: 'url',
      file_url: 'http://qiiip.org/Adobe Acrobat Reader FAQs.pdf',
      lang: 'en',
    };

    const response = await parseDoc(request, getTestConfig());

    expect(response).toBeDefined();
  });
});
