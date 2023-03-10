import { render } from '@testing-library/react';
import ContentTypeList from '..';

describe('ContentTypeList', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ContentTypeList
      contentTypes={[{ id: 1, name: 'Test' }]}
      handleContentTypeClick={() => {}}
      handleAddContentClick={() => {}}
    />);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('should call handleContentTypeClick when a content type is clicked', () => {
    const handleContentTypeClick = jest.fn();
    const { getByText } = render(<ContentTypeList
      contentTypes={[{ id: 1, name: 'Test' }]}
      handleContentTypeClick={handleContentTypeClick}
      handleAddContentClick={() => {}}
    />);
    getByText('Test').click();
    expect(handleContentTypeClick).toHaveBeenCalled();
  });

  it('should call handleAddContentClick when the add content button is clicked', () => {
    const handleAddContentClick = jest.fn();
    const { getByText } = render(<ContentTypeList
      contentTypes={[{ id: 1, name: 'Test' }]}
      handleContentTypeClick={() => {}}
      handleAddContentClick={handleAddContentClick}
    />);
    getByText('+ New Type').click();
    expect(handleAddContentClick).toHaveBeenCalled();
  });
});
