import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ImageAttachCard from '../Card/ImageAttachCard';
import * as DocumentServices from '../../services/Document';

describe('CreateRequestCard', () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('should warning when input is empty', async () => {
    render(<ImageAttachCard />);

    const RequestID = screen.getByLabelText('Request ID');
    const attachButton = screen.getByText('Attach');

    await act(() => {
      fireEvent.change(RequestID, { target: { value: '' } });
      fireEvent.click(attachButton);
    });

    expect(screen.getByText('Request ID is required')).toBeInTheDocument();

    const spy = jest.spyOn(DocumentServices, 'addDocument');

    await act(() => {
      fireEvent.change(RequestID, { target: { value: '67' } });
      fireEvent.click(attachButton);
    });

    await waitFor(
      () => {
        expect(spy).toHaveBeenCalledTimes(0);
      },
      { timeout: 1000 }
    );
  });

  it('should ok to upload image', async () => {
    const axiosMock = new MockAdapter(axios);

    axiosMock.onPost('/api/documents/add_document').reply(200, {
      Document: {
        ObjectKey: {
          objectType: 'ObjectType_Request',
          int32Value: 67,
        },
        DocumentID: 28,
        Order: 3,
        DocumentDescription: 'test',
        ContentType: 'image/png',
        CreatedBy: 'alan liu',
        CreateTime: '2022-07-29T08:50:40.971Z',
      },
      UploadUri:
        'https://developolisstorage.blob.core.windows.net/developoliscontainer/image.png?sv=2019-07-07&sr=b&sig=9h%2F4ZXQjfu0hq45Wk4j72hPVCkdfk6Mq%2FS5F5PU0eY8%3D&st=2022-07-29T08%3A45%3A54Z&se=2022-07-30T08%3A50%3A54Z&sp=rw&rscd=attachment%3B%20filename%3Dimage.png',
      UploadMethod: 'PUT',
      UploadExpireTime: '2022-07-29T09:49:54.348036900Z',
      UploadHeaders: {
        'x-ms-blob-type': 'BlockBlob',
      },
    });

    axiosMock
      .onPut(
        'https://developolisstorage.blob.core.windows.net/developoliscontainer/image.png?sv=2019-07-07&sr=b&sig=9h%2F4ZXQjfu0hq45Wk4j72hPVCkdfk6Mq%2FS5F5PU0eY8%3D&st=2022-07-29T08%3A45%3A54Z&se=2022-07-30T08%3A50%3A54Z&sp=rw&rscd=attachment%3B%20filename%3Dimage.png'
      )
      .reply(200, {});

    const image = new File(['image file'], 'image.png', { type: 'image/png' });

    render(<ImageAttachCard />);

    const ImgDropzone = screen.getByTestId('img-dropzone-parent').childNodes[0];
    const attachButton = screen.getByText('Attach');

    await act(() => {
      fireEvent.change(ImgDropzone, {
        target: { files: [image] },
      });
    });

    expect(ImgDropzone.files[0].name).toBe('image.png');
    expect(ImgDropzone.files.length).toBe(1);

    await waitFor(
      () => {
        expect(screen.getByText('Crop your picture')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    const saveButton = screen.getByText('Save');
    const dialog = screen.getByText('Crop your picture');

    await act(() => {
      fireEvent.click(saveButton);
    });

    await waitFor(
      () => {
        expect(dialog).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    await act(() => {
      fireEvent.click(attachButton);
    });
  });

  it('should handel error', async () => {
    const image = new File(['image file'], 'image.png', { type: 'image/png' });

    render(<ImageAttachCard />);

    const ImgDropzone = screen.getByTestId('img-dropzone-parent').childNodes[0];
    const attachButton = screen.getByText('Attach');

    await act(() => {
      fireEvent.change(ImgDropzone, {
        target: { files: [image] },
      });
    });

    expect(ImgDropzone.files[0].name).toBe('image.png');
    expect(ImgDropzone.files.length).toBe(1);

    await waitFor(
      () => {
        expect(screen.getByText('Crop your picture')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    const saveButton = screen.getByText('Save');
    const dialog = screen.getByText('Crop your picture');

    await act(() => {
      fireEvent.click(saveButton);
    });

    await waitFor(
      () => {
        expect(dialog).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    await act(() => {
      fireEvent.click(attachButton);
    });
  });
});
