import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ListDocumentCard from '../Card/ListDocumentCard';

describe('ListDocumentCard', () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('should warning when input is empty', async () => {
    render(<ListDocumentCard />);

    const RequestID = screen.getByLabelText('Request ID');
    const listButton = screen.getByText('List');

    await act(() => {
      fireEvent.change(RequestID, { target: { value: '' } });
      fireEvent.click(listButton);
    });

    expect(screen.getByText('Request ID is required')).toBeInTheDocument();
  });

  it('should show response when request successed', async () => {
    const axiosMock = new MockAdapter(axios);

    axiosMock.onPost('/api/documents/list').reply(200, {
      documents: [
        {
          ObjectKey: {
            objectType: 'ObjectType_Request',
            int32Value: 67,
          },
          DocumentID: 3,
          Order: 2,
          DocumentDescription: 'Request Image 2022-07-27 22:02',
          ContentType: 'image/jpeg',
          CreatedBy: 'alan liu',
          CreateTime: '2022-07-27T12:32:24Z',
          UploadStatus: 'UploadStatus_Completed',
          FileShouldBeAccessible: true,
        },
      ],
    });

    axiosMock.onPost('/api/documents/generate_document_link').reply(200, {
      LinkExpireTime: '2022-07-29T03:45:49.590126900Z',
      Link: 'https://developolisstorage.blob.core.windows.net/developolisthumbnails/res/medium/1658925144.jpeg?sv=2019-07-07&sr=b&sig=ivJLiUThB9HY3iNE6XaePJjcWnd7D6EwYwe%2Fi%2FqvSC4%3D&st=2022-07-29T02%3A41%3A49Z&se=2022-07-30T02%3A46%3A49Z&sp=r&rscd=attachment%3B%20filename%3D1658925144.jpeg',
    });

    axiosMock.onPost('/api/documents/remove_document').reply(200, {});

    render(<ListDocumentCard />);
    const listButton = screen.getByText('List');

    act(() => {
      fireEvent.click(listButton);
    });

    await waitFor(
      () => {
        expect(screen.getByText(/Request Image 2022-07-27 22:02/i)).toBeInTheDocument();
        expect(screen.getByText(/CreatedBy: alan liu/i)).toBeInTheDocument();
        expect(screen.getByText(/DocumentID: 3/i)).toBeInTheDocument();
        expect(screen.getByText(/Order: 2/i)).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    const deleteButton = screen.getByText('Delete');

    act(() => {
      fireEvent.click(deleteButton);
    });

    await waitFor(
      () => {
        expect(localStorage.getItem('listDocument')).toBe('67,3');
      },
      { timeout: 1000 }
    );
  });

  it('should show error when request failed', async () => {
    new MockAdapter(axios);

    render(<ListDocumentCard />);
    const listButton = screen.getByText('List');

    act(() => {
      fireEvent.click(listButton);
    });

    await waitFor(
      () => {
        expect(localStorage.getItem('listDocument')).toBe('Request failed with status code 404');
      },
      { timeout: 1000 }
    );
  });

  it('should show no documents', async () => {
    const axiosMock = new MockAdapter(axios);

    axiosMock.onPost('/api/documents/list').reply(200, {});

    render(<ListDocumentCard />);
    const listButton = screen.getByText('List');

    act(() => {
      fireEvent.click(listButton);
    });

    await waitFor(
      () => {
        expect(screen.getByText('No Documents.')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('should handle error when image error code 3', async () => {
    const axiosMock = new MockAdapter(axios);

    axiosMock.onPost('/api/documents/list').reply(200, {
      documents: [
        {
          ObjectKey: {
            objectType: 'ObjectType_Request',
            int32Value: 67,
          },
          DocumentID: 3,
          Order: 2,
          DocumentDescription: 'Request Image 2022-07-27 22:02',
          ContentType: 'image/jpeg',
          CreatedBy: 'alan liu',
          CreateTime: '2022-07-27T12:32:24Z',
          UploadStatus: 'UploadStatus_Completed',
          FileShouldBeAccessible: true,
        },
      ],
    });

    axiosMock.onPost('/api/documents/generate_document_link').reply(400, {
      code: 3,
    });

    render(<ListDocumentCard />);
    const listButton = screen.getByText('List');

    act(() => {
      fireEvent.click(listButton);
    });

    await waitFor(
      () => {
        expect(screen.getByAltText(/3/i)).toHaveAttribute('src', '');
      },
      { timeout: 1000 }
    );
  });

  it('should handle error when image error code not 3', async () => {
    const axiosMock = new MockAdapter(axios);

    axiosMock.onPost('/api/documents/list').reply(200, {
      documents: [
        {
          ObjectKey: {
            objectType: 'ObjectType_Request',
            int32Value: 67,
          },
          DocumentID: 3,
          Order: 2,
          DocumentDescription: 'Request Image 2022-07-27 22:02',
          ContentType: 'image/jpeg',
          CreatedBy: 'alan liu',
          CreateTime: '2022-07-27T12:32:24Z',
          UploadStatus: 'UploadStatus_Completed',
          FileShouldBeAccessible: true,
        },
      ],
    });

    render(<ListDocumentCard />);
    const listButton = screen.getByText('List');

    act(() => {
      fireEvent.click(listButton);
    });

    await waitFor(
      () => {
        expect(localStorage.getItem('listDocument')).toBe('Request failed with status code 404');
      },
      { timeout: 1000 }
    );
  });

  it('should handle remove document error', async () => {
    const axiosMock = new MockAdapter(axios);

    axiosMock.onPost('/api/documents/list').reply(200, {
      documents: [
        {
          ObjectKey: {
            objectType: 'ObjectType_Request',
            int32Value: 67,
          },
          DocumentID: 3,
          Order: 2,
          DocumentDescription: 'Request Image 2022-07-27 22:02',
          ContentType: 'image/jpeg',
          CreatedBy: 'alan liu',
          CreateTime: '2022-07-27T12:32:24Z',
          UploadStatus: 'UploadStatus_Completed',
          FileShouldBeAccessible: true,
        },
      ],
    });

    axiosMock.onPost('/api/documents/generate_document_link').reply(200, {
      LinkExpireTime: '2022-07-29T03:45:49.590126900Z',
      Link: 'https://developolisstorage.blob.core.windows.net/developolisthumbnails/res/medium/1658925144.jpeg?sv=2019-07-07&sr=b&sig=ivJLiUThB9HY3iNE6XaePJjcWnd7D6EwYwe%2Fi%2FqvSC4%3D&st=2022-07-29T02%3A41%3A49Z&se=2022-07-30T02%3A46%3A49Z&sp=r&rscd=attachment%3B%20filename%3D1658925144.jpeg',
    });

    render(<ListDocumentCard />);
    const listButton = screen.getByText('List');

    act(() => {
      fireEvent.click(listButton);
    });

    await waitFor(
      () => {
        expect(screen.getByText(/Request Image 2022-07-27 22:02/i)).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    const deleteButton = screen.getByText('Delete');

    act(() => {
      fireEvent.click(deleteButton);
    });

    await waitFor(
      () => {
        expect(localStorage.getItem('listDocument')).toBe('Request failed with status code 404');
      },
      { timeout: 1000 }
    );
  });

  it('should sort the document', async () => {
    const axiosMock = new MockAdapter(axios);

    axiosMock.onPost('/api/documents/list').reply(200, {
      documents: [
        {
          ObjectKey: {
            objectType: 'ObjectType_Request',
            int32Value: 67,
          },
          DocumentID: 4,
          Order: 2,
          DocumentDescription: 'sencond document',
          ContentType: 'image/jpeg',
          CreatedBy: 'alan liu',
          CreateTime: '2022-07-27T12:32:24Z',
          UploadStatus: 'UploadStatus_Completed',
          FileShouldBeAccessible: true,
        },
        {
          ObjectKey: {
            objectType: 'ObjectType_Request',
            int32Value: 67,
          },
          DocumentID: 3,
          Order: 1,
          DocumentDescription: 'first document',
          ContentType: 'image/jpeg',
          CreatedBy: 'alan liu',
          CreateTime: '2022-07-27T12:32:24Z',
          UploadStatus: 'UploadStatus_Completed',
          FileShouldBeAccessible: true,
        },
      ],
    });

    axiosMock.onPost('/api/documents/generate_document_link').reply(200, {
      LinkExpireTime: '2022-07-29T03:45:49.590126900Z',
      Link: 'https://developolisstorage.blob.core.windows.net/developolisthumbnails/res/medium/1658925144.jpeg?sv=2019-07-07&sr=b&sig=ivJLiUThB9HY3iNE6XaePJjcWnd7D6EwYwe%2Fi%2FqvSC4%3D&st=2022-07-29T02%3A41%3A49Z&se=2022-07-30T02%3A46%3A49Z&sp=r&rscd=attachment%3B%20filename%3D1658925144.jpeg',
    });

    render(<ListDocumentCard />);
    const listButton = screen.getByText('List');

    act(() => {
      fireEvent.click(listButton);
    });

    await waitFor(
      () => {
        expect(screen.getByText(/Order: 1/i)).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    const Order1 = screen.getByText(/Order: 1/i);
    const Order2 = screen.getByText(/Order: 2/i);
    const ImageList = screen.getByTestId('image-list');

    expect(ImageList.childNodes[1]).toContainElement(Order1.parentElement);
    expect(ImageList.childNodes[2]).toContainElement(Order2.parentElement);
  });
});
