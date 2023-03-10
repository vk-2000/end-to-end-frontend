import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CollectionInstances.css';
import CollectionModal from '../CollectionModal';

const CollectionInstances = ({
  collections,
  contentType,
  handleAddCollection,
  handleDeleteCollection,
  handleEditCollection,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCollectionId, setEditCollectionId] = useState(null);
  const submitAddHandler = (data) => {
    setShowAddModal(false);
    handleAddCollection(data);
  };
  const submitEditHandler = (data) => {
    setShowEditModal(false);
    handleEditCollection(editCollectionId, data);
  };
  const onCancelHandler = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };
  useEffect(() => {
    if (editCollectionId) {
      setShowEditModal(true);
    }
  }, [editCollectionId]);
  return (
    <div className="collection-instance-body">
      {showAddModal && <CollectionModal title={contentType.name} label="hiii" fields={contentType.fields} submitHandler={submitAddHandler} cancelHandler={onCancelHandler} />}
      {showEditModal && (
      <CollectionModal
        title={contentType.name}
        label="hiii"
        fields={
            collections.find((collection) => collection.id === editCollectionId).values
        }
        submitHandler={submitEditHandler}
        cancelHandler={onCancelHandler}
      />
      )}
      <div className="collection-instance-header">
        <div className="collection-header-text">
          {collections.length}
          {' '}
          Entries Found
        </div>
        <div>
          <button onClick={() => setShowAddModal(true)} type="button">Add New Entry</button>
        </div>
      </div>
      {collections.length > 0 && (

      <div className="collection-instance-table">
        <div className="collection-instance-table-header">
          {Object.keys(collections[0].values).splice(0, 4).map((key) => (
            <div className="collection-instance-table-header-item">
              {key}
            </div>
          ))}
          <div className="collection-action">
            Action
          </div>
        </div>
        <div className="collection-instance-table-body">
          {collections.map((collection) => (
            <div className="collection-instance-table-body-item">
              {Object.values(collection.values).splice(0, 4).map((value) => (
                <div className="collection-instance-table-body-item-value">
                  {value}
                </div>
              ))}
              <div className="collection-action">
                <button
                  onClick={() => {
                    setEditCollectionId(collection.id);
                    setShowEditModal(true);
                  }}
                  type="button"
                >
                  E

                </button>
                <button onClick={() => handleDeleteCollection(collection.id)} type="button">D</button>
              </div>
            </div>

          ))}

        </div>
      </div>
      )}

    </div>
  );
};

export default CollectionInstances;

CollectionInstances.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    values: PropTypes.shape({}),
  })).isRequired,
  contentType: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  handleAddCollection: PropTypes.func.isRequired,
  handleDeleteCollection: PropTypes.func.isRequired,
  handleEditCollection: PropTypes.func.isRequired,
};
