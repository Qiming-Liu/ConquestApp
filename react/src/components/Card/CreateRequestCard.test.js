import { render, screen, fireEvent } from '@testing-library/react';
import CreateRequestCard from '../Card/CreateRequestCard';
import { act } from 'react-dom/test-utils';

// render

// behave

// 不输入数据 直接submit

describe('creaate request form', () => {
  it('renders current label', () => {
    const { debug } = render(<CreateRequestCard />);

    const RequestDetail = screen.getByLabelText('Request Detail');
    // const RequestorName = screen.getByLabel('Request Name');
    // const OrganisationUnitID = screen.getByLabel('Organisation Unit ID');
    const submitButton = screen.getByText('Submit');

    
    // fireEvent.change(RequestorName, { target: { value: '' } });
    // fireEvent.change(OrganisationUnitID, { target: { value: '' } });

    // await
    act(() => {
      fireEvent.change(RequestDetail, { target: { value: '' } });
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
