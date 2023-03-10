import React, { useState } from 'react';
import './ContentFields.css';
import PropTypes from 'prop-types';
import DottedButton from '../DottedButton';
import Field from '../Field';
import editIcon from '../../assets/icons/user-edit-small.png';

const ContentFields = ({
  contentType, handleFieldDelete, handleFieldUpdate, handleAddFieldClick, handleContentNameUpdate,
}) => {
  const [allowEdit, setAllowEdit] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      handleContentNameUpdate(e.target.value);
      setAllowEdit(false);
    }
  };
  const handleBlur = (e) => {
    if (e.target.value !== '') {
      handleContentNameUpdate(e.target.value);
      setAllowEdit(false);
    }
  };
  return (
    contentType && (
    <div className="content-fields-body">
      <div>
        <div className="content-fields-body-header">
          <div className="header-text">
            {allowEdit ? (
              <input type="text" defaultValue={contentType.name} data-testid="test-input" onKeyDown={handleKeyDown} onBlur={handleBlur} />
            ) : (
              <span>{contentType.name}</span>
            )}
            <button data-testid="btn-edit" className="btn-edit" onClick={() => setAllowEdit(!allowEdit)} type="button">
              <img src={editIcon} alt="edit" />
            </button>
          </div>
          <div className="header-sub-text">
            {Object.keys(contentType.fields).length}
            {' '}
            Fields
          </div>
        </div>
        <DottedButton onClick={handleAddFieldClick} text="Add another field" />

        <div className="content-fields-body-container">
          {Object.keys(contentType.fields).map((field) => (
            <Field
              field={field}
              type={contentType.fields[field]}
              handleFieldDelete={handleFieldDelete}
              handleFieldUpdate={handleFieldUpdate}
            />
          ))}
        </div>
      </div>
    </div>
    )
  );
};

export default ContentFields;

ContentFields.propTypes = {
  contentType: PropTypes.shape({
    name: PropTypes.string,
    fields: PropTypes.shape({}),
  }).isRequired,
  handleFieldDelete: PropTypes.func.isRequired,
  handleFieldUpdate: PropTypes.func.isRequired,
  handleAddFieldClick: PropTypes.func.isRequired,
  handleContentNameUpdate: PropTypes.func.isRequired,
};
