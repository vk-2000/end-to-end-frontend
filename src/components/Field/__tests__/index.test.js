import { fireEvent, render } from '@testing-library/react';
import Field from '..';

describe('Field', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Field
      field="Hello"
      type="World"
      handleFieldDelete={jest.fn()}
      handleFieldUpdate={jest.fn()}
    />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should show input when clicked', () => {
    const { getByTestId } = render(<Field
      field="Hello"
      type="World"
      handleFieldDelete={jest.fn()}
      handleFieldUpdate={jest.fn()}
    />);
    const btnEdit = getByTestId('btn-field-edit');
    fireEvent.click(btnEdit);
    expect(getByTestId('field-test-input')).toBeInTheDocument();
  });
  it('should call handleFieldUpdate when input is changed and enter is pressed', () => {
    const handleFieldUpdate = jest.fn();
    const { getByTestId } = render(<Field
      field="Hello"
      type="World"
      handleFieldDelete={jest.fn()}
      handleFieldUpdate={handleFieldUpdate}
    />);
    const btnEdit = getByTestId('btn-field-edit');
    fireEvent.click(btnEdit);
    const input = getByTestId('field-test-input');
    fireEvent.change(input, { target: { value: 'Hello World' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(handleFieldUpdate).toHaveBeenCalled();
  });
  it('should not call handleFieldUpdate when input is changed and outside is pressed', () => {
    const handleFieldUpdate = jest.fn();
    const { getByTestId } = render(<Field
      field="Hello"
      type="World"
      handleFieldDelete={jest.fn()}
      handleFieldUpdate={handleFieldUpdate}
    />);
    const btnEdit = getByTestId('btn-field-edit');
    fireEvent.click(btnEdit);
    const input = getByTestId('field-test-input');
    fireEvent.change(input, { target: { value: 'Hello World' } });
    fireEvent.blur(input);
    expect(handleFieldUpdate).toHaveBeenCalled();
  });
  it('should call handleFieldDelete when delete button is clicked', () => {
    const handleFieldDelete = jest.fn();
    const { getByTestId } = render(<Field
      field="Hello"
      type="World"
      handleFieldDelete={handleFieldDelete}
      handleFieldUpdate={jest.fn()}
    />);
    const btnDelete = getByTestId('btn-field-delete');
    fireEvent.click(btnDelete);
    expect(handleFieldDelete).toHaveBeenCalled();
  });
});
