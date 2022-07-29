import { render, screen } from '@testing-library/react';

import DocumentPage from './DocumentPage';

describe('DocumentPage', () => {
  it('should render', () => {
    render(<DocumentPage />);

    expect(screen.getByText('List Documents')).toBeInTheDocument();
  });
});
