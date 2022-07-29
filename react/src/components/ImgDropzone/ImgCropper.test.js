import { render } from '@testing-library/react';

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
