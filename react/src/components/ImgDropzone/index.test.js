import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ImgDropzoneComponent from './index';

describe('ImgDromzone', () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('should render', async () => {
    const afterCropImg = () => {};
    render(
      <ImgDropzoneComponent accept="image/png" afterCrop={afterCropImg} aspectRatio={1}>
        <div>Upload Image</div>
      </ImgDropzoneComponent>
    );
  });

  it('should ok to upload image', async () => {
    const image = new File(['image file'], 'image.png', { type: 'image/png' });

    const afterCropImg = () => {};

    render(
      <ImgDropzoneComponent accept="image/png" afterCrop={afterCropImg} aspectRatio={1} lockAspectRatio={false}>
        <div>Upload Image</div>
      </ImgDropzoneComponent>
    );
    const ImgDropzone = screen.getByTestId('img-dropzone-parent').childNodes[0];

    await act(() => {
      fireEvent.drop(ImgDropzone, {
        target: { files: [image] },
      });
    });

    expect(ImgDropzone.files[0].name).toBe('image.png');
    expect(ImgDropzone.files.length).toBe(1);

    await waitFor(
      () => {
        expect(screen.getByText('Crop your picture')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
