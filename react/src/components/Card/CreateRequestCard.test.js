import { render, screen, fireEvent } from '@testing-library/react';
import CreateRequestCard from '../Card/CreateRequestCard';
import { act } from 'react-dom/test-utils';

// render

// behave

// 不输入数据 直接submit

describe('creaate request form', () => {
  it('renders current label', () => {
    const { debug } = render(<CreateRequestCard />);

    // const RequestDetail = getByLabel("Request Detail");
    // const RequestorName = getByLabel("Request Name");
    // const OrganisationUnitID = getByLabel("Organisation Unit ID");
    const submitButton = screen.getByText('Submit');

    act(() => {
      fireEvent.click(submitButton);
    });

    debug();

    // expect(RequestDetail.label).toBe("Request Detail");
    // expect(RequestorName.label).toBe("Requestor Name");
    // expect(OrganisationUnitID.label).toBe("Organisation Unit ID");

    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  });
});
