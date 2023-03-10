import { fireEvent, render } from '@testing-library/react';
import ContentFields from '..';

describe('ContentFields', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ContentFields
      contentType={{
        fields: {
          name: 'content-fields',
        },
      }}
      handleFieldUpdate={() => {}}
      handleFieldDelete={() => {}}
      handleAddFieldClick={() => {}}
      handleContentNameUpdate={() => {}}

    />);
    expect(getByText('content-fields')).toBeInTheDocument();
  });
  it('should call handleNameUpdate when name is changed', () => {
    const handleContentNameUpdate = jest.fn();
    const { getByTestId } = render(<ContentFields
      contentType={{
        fields: {
          name: 'content-fields',
        },
      }}
      handleFieldUpdate={() => {}}
      handleFieldDelete={() => {}}
      handleAddFieldClick={() => {}}
      handleContentNameUpdate={handleContentNameUpdate}
    />);
    const editButton = getByTestId('btn-edit');
    fireEvent.click(editButton);
    const input = getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'new name' } });
    fireEvent.blur(input);
    expect(handleContentNameUpdate).toHaveBeenCalled();
  });
  it('should call handleNameUpdate when name is changed and enter is clicked', () => {
    const handleContentNameUpdate = jest.fn();
    const { getByTestId } = render(<ContentFields
      contentType={{
        fields: {
          name: 'content-fields',
        },
      }}
      handleFieldUpdate={() => {}}
      handleFieldDelete={() => {}}
      handleAddFieldClick={() => {}}
      handleContentNameUpdate={handleContentNameUpdate}
    />);
    const editButton = getByTestId('btn-edit');
    fireEvent.click(editButton);
    const input = getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'new name' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(handleContentNameUpdate).toHaveBeenCalled();
  });
});
