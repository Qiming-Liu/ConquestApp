import { http } from '../utils/axios';

export const createRequestBody = (RequestDetail, RequestorName, OrganisationUnitID) => {
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

export const createRequest = (requestBody) =>
  http(`/api/requests/create_request`, { method: 'POST', data: requestBody });
