import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ImgCropDialog from './ImgCropDialog';

describe('ImgCropDialog', () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('should render', async () => {
    render(
      <ImgCropDialog
        open={open}
        DialogClose={() => {}}
        image={'image'}
        afterCrop={() => {}}
        aspectRatio={1}
        lockAspectRatio={true}
      />
    );

    const saveButton = screen.getByText('Save');

    await act(() => {
      fireEvent.click(saveButton);
    });
  });
});
