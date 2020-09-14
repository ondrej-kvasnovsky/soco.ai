import { Config } from './Config';
import { AddDocsRequest } from './doc/add/AddDocsRequest';
import { AddDocsResponse } from './doc/add/AddDocsResponse';
import { addDocs } from './doc/add/addDocs';
import { addFAQsFromCSVs } from './doc/add/addFAQsFromCSVs';
import { OperationStatus } from './system/operation/OperationStatus';
import { getOperationStatus } from './system/operation/getOperationStatus';
import { readOperations } from './system/operation/readOperations';
import { Operation } from './system/operation/Operation';
import { DataUploadRequest } from './data/DataUploadRequest';
import { DataUploadResponse } from './data/DataUploadResponse';
import { uploadData } from './data/uploadData';
import { readDocs } from './doc/read/readDocs';
import { ReadDocsRequest } from './doc/read/ReadDocsRequest';
import { ReadDocsResponse } from './doc/read/ReadDocsResponse';
import { ParseDocRequest } from './doc/parse/ParseDocRequest';
import { DocPart } from './doc/DocPart';
import { parseDoc } from './doc/parse/parseDoc';
import { UpdateDocsRequest } from './doc/update/UpdateDocsRequest';
import { UpdateDocsResponse } from './doc/update/UpdateDocsResponse';
import { updateDocs } from './doc/update/updateDocs';
import { DeleteDocsRequest } from './doc/delete/DeleteDocsRequest';
import { DeleteDocsResponse } from './doc/delete/DeleteDocsResponse';
import { defaultRequest, deleteDocs } from './doc/delete/deleteDocs';
import { AggregateDocsRequest } from './doc/aggregate/AggregateDocsRequest';
import { AggregateDocsResponse } from './doc/aggregate/AggregateDocsResponse';
import { aggregateDocs } from './doc/aggregate/aggregateDocs';
import { QueryRequest } from './search/QueryRequest';
import { QueryResponse } from './search/QueryResponse';
import { query } from './search/query';
import { ReindexResponse } from './index/ReindexResponse';
import { reindex } from './index/reindex';
import { RefreshRequest } from './index/RefreshRequest';
import { RefreshResponse } from './index/RefreshResponse';
import { refresh } from './index/refresh';
import { addUnstructuredDoc } from './doc/add/addUnstructuredDoc';
import { ReindexRequest } from './index/ReindexRequest';
import { waitUntilFinished } from './system/operation/waitUntilFinished';

/**
 * Facade for all SOCO.ai functions.
 */
export class SocoClient {
  constructor(readonly config: Config) {
  }

  async query(request: QueryRequest): Promise<QueryResponse> {
    return query(request, this.config);
  }

  async addDocs(request: AddDocsRequest, waitUntilOpFinished = false): Promise<AddDocsResponse> {
    return addDocs(request, this.config, waitUntilOpFinished);
  }

  async readDocs(request: ReadDocsRequest): Promise<ReadDocsResponse[]> {
    return readDocs(request, this.config);
  }

  async updateDocs(request: UpdateDocsRequest, waitUntilOpFinished = false): Promise<UpdateDocsResponse> {
    return updateDocs(request, this.config, waitUntilOpFinished);
  }

  async deleteDocs(
    request: DeleteDocsRequest = defaultRequest,
    waitUntilOpFinished = false
  ): Promise<DeleteDocsResponse> {
    return deleteDocs(request, this.config, waitUntilOpFinished);
  }

  async aggregateDocs(request: AggregateDocsRequest): Promise<AggregateDocsResponse[]> {
    return aggregateDocs(request, this.config);
  }

  async parseDoc(request: ParseDocRequest): Promise<DocPart[]> {
    return parseDoc(request, this.config);
  }

  async addFAQsFromCSVs(
    rootDir: string,
    meta: any,
    auto_index: boolean,
    waitUntilOpFinished = false
  ): Promise<AddDocsResponse> {
    return addFAQsFromCSVs(rootDir, meta, auto_index, this.config, waitUntilOpFinished);
  }

  async addUnstructuredDoc(
    parseRequest: ParseDocRequest,
    meta: any = {},
    auto_index = true,
    waitUntilOpFinished = false
  ): Promise<AddDocsResponse> {
    return addUnstructuredDoc(parseRequest, meta, auto_index, this.config, waitUntilOpFinished);
  }

  async getOperationStatus(opId: string): Promise<OperationStatus> {
    return getOperationStatus(opId, this.config);
  }

  async readOperations(skip, limit, sort_direction): Promise<Operation[]> {
    return readOperations(skip, limit, sort_direction, this.config);
  }

  async uploadData(request: DataUploadRequest, waitUntilOpFinished = false): Promise<DataUploadResponse> {
    return uploadData(request, this.config, waitUntilOpFinished);
  }

  /**
   * Creates a new index.
   *
   * @param request {@see ReindexRequest}
   * @param waitUntilOpFinished false by default, will wait for operation to finish or fail
   */
  async reindex(request: ReindexRequest, waitUntilOpFinished = false): Promise<ReindexResponse> {
    return reindex(request, this.config, waitUntilOpFinished);
  }

  /**
   * Updates existing index, only useful when new data is inserted,
   * won't have any effects after data is removed.
   *
   * @param request {@see RefreshRequest}
   * @param waitUntilOpFinished false by default, will wait for operation to finish or fail
   */
  async refresh(request: RefreshRequest, waitUntilOpFinished = false): Promise<RefreshResponse> {
    return refresh(request, this.config, waitUntilOpFinished);
  }

  async waitUntilFinished(opId: string): Promise<void> {
    return waitUntilFinished(opId, this.config);
  }
}
