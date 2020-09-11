# SOCO.ai JavaScript/TypeScript Client

NodeJS client for SOCO.ai. 

* [SOCO.ai](https://www.soco.ai)
* [SOCO Documentation](https://docs.soco.ai)

## Install

```bash
npm install soco.ai
```

## Usage

```typescript
import { SocoClient, Config } from 'soco.ai';

const config: Config = {
  adminApiKey: '...', // needed for Admin APIs
  clientId: '...', // needed for APIs & Parse Doc API
  queryApiKey: '...',// needed for Query APIs
};
const client = new SocoClient(config);
```

### Query / Search

Using: 
* https://docs.soco.ai/soco-api/operation-guide/information-retrieval

```typescript
import { QueryRequest } from 'soco.ai';
const request: QueryRequest = {
  uid: 'ID of the end user',
  query: {
    query: 'who is Jimmy?',
    n_best: 3
  }
};
const answers = await client.query(request);
```

### Waiting for Operation to Finish

It is possible to pass `waitUntilOpFinished` to `SocoClient` functions, that call APIs that return an operation ID, 
which will make the function wait until the operation is finished or failed. 
The default value of `waitUntilOpFinished` is `false`. If `waitUntilOpFinished` set to `true`, 

```typescript
const waitUntilOpFinished = true;
const response = await client.addDocs(request, waitUntilOpFinished);
```

The function that waits for operation to be finished is available as well.

```typescript
const operationId = '...';
const status = client.waitUntilFinished(operationId);
```

Using:
* https://docs.soco.ai/soco-api/system-management-1/op-management

### Add Documents

Using:
* https://docs.soco.ai/soco-api/data-process/json-files-crud-operation/add-documents

```typescript
import { AddDocsRequest } from 'soco.ai';

const request: AddDocsRequest = {
  data: [
    {
      data: [{ text: 'there was bear called Jimmy', type: 'content' }],
      meta: { doc_id: '123' },
      doc_type: 'soco_doc'
    }
  ],
  auto_index: true
};

const response = await client.addDocs(request, true);
```

### Add FAQs from CSV files

Using:
* https://docs.soco.ai/soco-api/data-process/json-files-crud-operation/add-documents
* https://docs.soco.ai/soco-api/data-process/file-type#soco_faq

```typescript
const filePath = 'test/e2e/fixtures/dataset-1'; // dir with CSV files 
const response = await client.addFAQsFromCSVs(filePath, {}, true, true);
```

### Add unstructured data (PDF or MS Word)

Using:
* https://docs.soco.ai/soco-api/data-process/parse-raw-files
* https://docs.soco.ai/soco-api/data-process/json-files-crud-operation/add-documents

```typescript
import { ParseDocRequest } from 'soco.ai';
const parseRequest: ParseDocRequest = {
  client_id: 'a client ID',
  file_type: 'url',
  file_url: 'http://qiiip.org/Adobe Acrobat Reader FAQs.pdf',
  lang: 'en',
};

const response = await client.addUnstructuredDoc(parseRequest, undefined, true, true);
```

### Read documents

Using:
* https://docs.soco.ai/soco-api/data-process/json-files-crud-operation/read-documents

```typescript
import { ReadDocsRequest } from 'soco.ai';

const request: ReadDocsRequest = {};
const response = await client.readDocs(request);
```

### Update documents

Using:
* https://docs.soco.ai/soco-api/data-process/json-files-crud-operation/update-documents

```typescript
import { UpdateDocsRequest } from 'soco.ai';
const request: UpdateDocsRequest = {
  data: [
    {
      _id: '...',
      data: [{ text: 'ok, lets talk about something else', type: 'content' }],
      meta: { someMeta: 'mata info is mandatory' },
      doc_type: 'soco_doc'
    }
  ]
};

const response = await client.updateDocs(request, true);
```

### Delete documents

Using:
* https://docs.soco.ai/soco-api/data-process/json-files-crud-operation/delete-documents

If `data` is left empty or undefined, it removes all the documents.

```typescript
import { DeleteDocsRequest } from 'soco.ai';
export const request: DeleteDocsRequest = {
  doc_ids: undefined,
  auto_index: false,
};

const response = await client.deleteDocs(request, true);
```

### Aggregate Documents

Using:
* https://docs.soco.ai/soco-api/data-process/json-files-crud-operation/aggregate-documents

If `data` is left empty or undefined, it removes all the documents.

```typescript
import { AggregateDocsRequest } from 'soco.ai';
const request: AggregateDocsRequest = { field: '$meta.doc_id' };

const response = await aggregateDocs(request, getTestConfig());
```

### Reindex

Using:
* https://docs.soco.ai/soco-api/system-management-1/index-management/re-index

```typescript
const answers = await client.reindex();
```

### Refresh

Using:
* https://docs.soco.ai/soco-api/system-management-1/index-management/refresh

```typescript
const request: RefreshRequest = {
  params: { lm: {}, qa: {}, kw: {}, qq: {}, tuple: {} }
};
const answers = await client.refresh(request);
```

### Get Operation Status

Using:
* https://docs.soco.ai/soco-api/system-management-1/op-management

```typescript
const operationId = response.op_id;
const status = await client.getOperationStatus(operationId);
```

### Get Operations

Using:
* https://docs.soco.ai/soco-api/system-management-1/op-management

```typescript
const operations = await client.readOperations(0, 10, -1);
```

### Error Handling

When API fails to return the result, it `SocoClient` functions throw an error with all the details.  

# Examples

## Load CSV and PDF data

CSV files with FAQ need to be in this structure. 
There can/should be multiple questions leading to a single answer 
to improve matching accuracy.
 
```csv
question         ,answer
how are you doing,I am doing fine
how is it going  ,I am doing fine
how is life      ,It is fine
how old are you  ,I am 42 years old
what is your age ,I am 42 years old
```

```typescript
import { SocoClient, Config, RefreshRequest, ParseDocRequest } from "soco.ai";

const pdfFile = "http://path to your pdf.pdf"; // there is no OCR, text needs to be in the PDF 
const jllQnA = "/Users/path to your folder with CSV files";

async function loadData() {
  // create config with secrets 
  const config: Config = {
    adminApiKey: "copy paste the key here from https://app.soco.ai",
    clientId: "copy paste the key here from https://app.soco.ai",
    queryApiKey: "copy paste the key here from https://app.soco.ai"
  };
  // create SOCO client
  const client = new SocoClient(config);
 
  // delete all the docs from SOCO (if needed, to ensure clean start)
  await client.deleteDocs({ doc_ids: undefined, auto_index: true }, true);
  
  // refresh all indexes
  const request: RefreshRequest = {
    params: { lm: {}, qa: {}, kw: {}, qq: {}, tuple: {} }
  };
  await client.refresh(request);
  
  // add FAQs from CSV files
  await client.addFAQsFromCSVs(jllQnA, {}, true, true);
 
  // add content of PDF file (unstructured data)
  const parseRequest: ParseDocRequest = {
    client_id: config.clientId,
    file_type: "url",
    file_url: pdfFile,
    lang: "en"
  };
  await client.addUnstructuredDoc(parseRequest, {}, true, true);

  // refresh all indexes
  await client.refresh(request);
}

loadData()
  .then(_ => console.log("Done"))
  .catch(error => console.error(error));
```


