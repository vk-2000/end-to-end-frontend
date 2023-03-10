import { fireEvent, render } from '@testing-library/react';
import AddModal from '..';

describe('AddModal', () => {
  it('should render correctly', () => {
    const { getByText } = render(<AddModal title="Add Content Type" label="Content Type Name" submitHandler={() => {}} cancelHandler={() => {}} />);
    expect(getByText('Add Content Type')).toBeInTheDocument();
  });
  it('should call submitHandler when submit button is clicked', () => {
    const submitHandler = jest.fn();
    const { getByText } = render(<AddModal title="Add Content Type" label="Content Type Name" submitHandler={submitHandler} cancelHandler={() => {}} />);
    getByText('Create').click();
    expect(submitHandler).toHaveBeenCalled();
  });
  it('should call cancelHandler when cancel button is clicked', () => {
    const cancelHandler = jest.fn();
    const { getByText } = render(<AddModal title="Add Content Type" label="Content Type Name" submitHandler={() => {}} cancelHandler={cancelHandler} />);
    getByText('Cancel').click();
    expect(cancelHandler).toHaveBeenCalled();
  });
  it('should change input value when input is changed', () => {
    const { getByLabelText } = render(<AddModal title="Add Content Type" label="Content Type Name" submitHandler={() => {}} cancelHandler={() => {}} />);
    const input = getByLabelText('Content Type Name');
    fireEvent.change(input, { target: { value: 'New Content Type' } });
    expect(input.value).toBe('New Content Type');
  });
});
