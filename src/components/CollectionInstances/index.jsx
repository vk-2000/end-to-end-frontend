import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CollectionInstances.css';
import CollectionModal from '../CollectionModal';

const editIcon = require('../../assets/icons/user-edit-large.png');
const deleteIcon = require('../../assets/icons/delete-icon.png');

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
  const getFieldsWithoutId = (fields) => {
    const newFields = {};
    Object.keys(fields).forEach((key) => {
      if (key !== 'id') {
        newFields[key] = fields[key];
      }
    });
    return newFields;
  };

  const submitEditHandler = (data) => {
    const newData = {};
    Object.keys(data).forEach((key) => {
      if (key !== 'id') {
        newData[key] = data[key];
      }
    });
    setShowEditModal(false);
    handleEditCollection(editCollectionId, newData);
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
      {showAddModal && <CollectionModal showDefault={false} title={`New ${contentType.name}`} fields={contentType.fields} submitHandler={submitAddHandler} cancelHandler={onCancelHandler} />}
      {showEditModal && (
      <CollectionModal
        showDefault
        title={`Modify ${contentType.name}`}
        fields={
            getFieldsWithoutId(collections.find(
              (collection) => collection.id === editCollectionId,
            ).values)
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
                  <img src={editIcon} alt="edit" />

                </button>
                <button onClick={() => handleDeleteCollection(collection.id)} type="button">
                  <img src={deleteIcon} alt="delete" />
                </button>
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
