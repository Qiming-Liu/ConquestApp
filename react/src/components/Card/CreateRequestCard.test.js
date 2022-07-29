import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import CreateRequestCard from '../Card/CreateRequestCard';

describe('CreateRequestCard', () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('should warning when input is empty', async () => {
    render(<CreateRequestCard />);

    const RequestDetail = screen.getByLabelText('Request Detail');
    const RequestName = screen.getByLabelText('Request Name');
    const OrganisationUnitID = screen.getByLabelText('Organisation Unit ID');
    const submitButton = screen.getByText('Submit');

    await act(() => {
      fireEvent.change(RequestDetail, { target: { value: '' } });
      fireEvent.change(RequestName, { target: { value: '' } });
      fireEvent.change(OrganisationUnitID, { target: { value: '' } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Request Detail is required')).toBeInTheDocument();
    expect(screen.getByText('Request Name is required')).toBeInTheDocument();
    expect(screen.getByText('OrganisationUnitID is required')).toBeInTheDocument();
  });

  it('should show response when request successed', async () => {
    const axiosMock = new MockAdapter(axios);

    axiosMock.onPost('/api/requests/create_request').reply(200, 67);

    render(<CreateRequestCard />);
    const submitButton = screen.getByText('Submit');

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(
      () => {
        expect(localStorage.getItem('createRequest')).toBe("67");
      },
      { timeout: 1000 }
    );
  });


  it('should show error when request failed', async () => {
    new MockAdapter(axios);

    render(<CreateRequestCard />);
    const submitButton = screen.getByText('Submit');

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(
      () => {
        expect(localStorage.getItem('createRequest')).toBe("Request failed with status code 404");
      },
      { timeout:1000 }
    );
  });
});
