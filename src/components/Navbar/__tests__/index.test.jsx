import { fireEvent, render } from '@testing-library/react';
import Navbar from '..';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/collection/1' }),
  useParams: () => ({ contentId: 1 }),
}));

describe('Navbar', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Navbar collectionList={[
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' },
    ]}
    />);
    expect(getByText('CMS+')).toBeInTheDocument();
  });

  it('should navigate to dashboard on click of content type builder button', () => {
    const { getByTestId } = render(<Navbar collectionList={[
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' },
    ]}
    />);
    const btn = getByTestId('btn-ctb-builder');
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
