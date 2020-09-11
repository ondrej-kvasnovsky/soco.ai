import { deleteDocs, refresh } from '../../src';
import { defaultRequest } from '../../src/doc/delete/deleteDocs';
import { getTestConfig } from './getTestConfig';

export async function cleanup(): Promise<void> {
  await deleteDocs(defaultRequest, getTestConfig(), true);
  const request = {
    params: { lm: {}, qa: {}, kw: {}, qq: {}, tuple: {} },
  };
  await refresh(request, getTestConfig(), true);
}
