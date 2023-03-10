import { fireEvent, render } from '@testing-library/react';
import CollectionModal from '..';

describe('CollectionModal', () => {
  it('should render correctly', () => {
    const { getByText } = render(<CollectionModal
      title="Test"
      fields={[]}
      submitHandler={() => {}}
      cancelHandler={() => {}}
      showDefault={false}
    />);
    expect(getByText('Test')).toBeInTheDocument();
  });
  it('should call cancelHandler when cancel button is clicked', () => {
    const cancelHandler = jest.fn();
    const { getByText } = render(<CollectionModal
      title="Test"
      fields={[]}
      submitHandler={() => {}}
      cancelHandler={cancelHandler}
      showDefault={false}
    />);
    fireEvent.click(getByText('Cancel'));
    expect(cancelHandler).toHaveBeenCalled();
  });
  it('should show default values when showDefault is true', () => {
    const { getByDisplayValue } = render(<CollectionModal
      title="Test"
      fields={{ test: 'test' }}
      submitHandler={() => {}}
      cancelHandler={() => {}}
      showDefault
    />);
    expect(getByDisplayValue('test')).toBeInTheDocument();
  });
  it('should not show default values when showDefault is false', () => {
    const { queryByDisplayValue } = render(<CollectionModal
      title="Test"
      fields={{ test: 'test' }}
      submitHandler={() => {}}
      cancelHandler={() => {}}
      showDefault={false}
    />);
    expect(queryByDisplayValue('test')).not.toBeInTheDocument();
  });
});
