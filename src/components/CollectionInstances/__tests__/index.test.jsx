import { fireEvent, render } from '@testing-library/react';
import CollectionInstances from '..';

describe('CollectionInstances', () => {
  it('should render correctly', () => {
    const { getByText } = render(<CollectionInstances
      collections={[{
        id: 1, values: { name: 'Collection 1' },
      }]}
      contentType={{ name: 'Collection Instances' }}
      handleDeleteCollection={() => {}}
      handleEditCollection={() => {}}
      handleAddCollection={() => {}}
    />);
    expect(getByText('Collection 1')).toBeInTheDocument();
  });
  it('should show add modal when add button is clicked', () => {
    const { getByText } = render(<CollectionInstances
      collections={[{
        id: 1, values: { name: 'Collection 1' },
      }]}
      contentType={{ name: 'Collection Instances', fields: [{ name: 'name' }] }}
      handleDeleteCollection={() => {}}
      handleEditCollection={() => {}}
      handleAddCollection={() => {}}
    />);
    const addNewEntryButton = getByText('Add New Entry');
    fireEvent.click(addNewEntryButton);
    expect(getByText('New Collection Instances')).toBeTruthy();
  });
  it('should show edit modal when edit button is clicked', () => {
    const { getByAltText, getByText } = render(<CollectionInstances
      collections={[{
        id: 1, values: { name: 'Collection 1' },
      }]}
      contentType={{ name: 'Collection Instances', fields: [{ name: 'name' }] }}
      handleDeleteCollection={() => {}}
      handleEditCollection={() => {}}
      handleAddCollection={() => {}}
    />);
    const editButton = getByAltText('edit');
    fireEvent.click(editButton);
    expect(getByText('Modify Collection Instances')).toBeTruthy();
  });
  it('should call handleDeleteCollection when delete button is clicked', () => {
    const handleDeleteCollection = jest.fn();
    const { getByAltText } = render(<CollectionInstances
      collections={[{
        id: 1, values: { name: 'Collection 1' },
      }]}
      contentType={{ name: 'Collection Instances', fields: { name: 'name' } }}
      handleDeleteCollection={handleDeleteCollection}
      handleEditCollection={() => {}}
      handleAddCollection={() => {}}
    />);
    const deleteButton = getByAltText('delete');
    fireEvent.click(deleteButton);
    expect(handleDeleteCollection).toHaveBeenCalled();
  });
});
