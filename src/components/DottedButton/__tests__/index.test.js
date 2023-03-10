import { render } from '@testing-library/react';
import DottedButton from '..';

describe('DottedButton', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<DottedButton
      text="Hello"
      onClick={() => {}}
    />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should call onClick when clicke', () => {
    const onClick = jest.fn();
    const { getByText } = render(<DottedButton
      text="Hello"
      onClick={onClick}
    />);
    getByText('Hello').click();
    expect(onClick).toHaveBeenCalled();
  });
});
