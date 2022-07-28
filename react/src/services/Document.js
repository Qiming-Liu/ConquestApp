import { http } from '../utils/axios';

export const addDocumentBody = (FileName, DocumentDescription, ContentType, RequestID) => {
  return {
    Address: `blob://developolisdocuments/${FileName}`,
    ContentType,
    DocumentDescription,
    CreateTime: new Date(),
    ObjectKey: {
      int32Value: RequestID,
      objectType: 'ObjectType_Request',
    },
  };
};

export const addDocument = (requestBody) => http(`/api/documents/add_document`, { method: 'POST', data: requestBody });

export const removeDocument = (RequestID, DocumentID) =>
  http(`/api/documents/remove_document`, {
    method: 'POST',
    data: {
      DocumentID,
      ObjectKey: {
        int32Value: RequestID,
        objectType: 'ObjectType_Request',
      },
    },
  });

export const uploadBlob = (uploadUrl, uploadMethod, contentType, imgBlob) => {
  // const data = new FormData();
  // data.append('file', imgBlob);

  console.log([
    uploadUrl,
    {
      method: uploadMethod,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'x-ms-blob-type': 'BlockBlob',
      },
      body: imgBlob,
    },
  ]);

  return fetch(uploadUrl, {
    method: uploadMethod,
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'x-ms-blob-type': 'BlockBlob',
    },
    body: imgBlob,
  });
};

export const getDocumentListBody = (RequestID) => {
  return {
    ObjectKey: {
      int32Value: RequestID,
      objectType: 'ObjectType_Request',
    },
  };
};

export const getDocumentList = (requestBody) => http(`/api/documents/list`, { method: 'POST', data: requestBody });

export const getDocumentThumbnailBody = (RequestID, DocumentID) => {
  return {
    ObjectKey: {
      int32Value: RequestID,
      objectType: 'ObjectType_Request',
    },
    DocumentID,
    XThumbnailParameter: 'medium',
  };
};

export const getDocumentThumbnail = (requestBody) =>
  http(`/api/documents/generate_document_link`, { method: 'POST', data: requestBody });
