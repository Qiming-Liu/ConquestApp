import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ImgCropper from './ImgCropper';

describe('ImgDromzone', () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('should render', async () => {
    render(<ImgCropper />);
  });
});
