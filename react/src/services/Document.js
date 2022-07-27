import http from '../utils/axios';

export const addDocumentBody = (RequestDetail, RequestorName, OrganisationUnitID) => {
  return {
    ChangeSet: {
      Changes: ['RequestDetail', 'RequestorName', 'OrganisationUnitID'],
      Updated: {
        RequestDetail,
        RequestorName,
        OrganisationUnitID,
      },
    },
  };
};

export const addDocument = (requestBody) => http(`/api/documents/add_document`, { method: 'POST', data: requestBody });
