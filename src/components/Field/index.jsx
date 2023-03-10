import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Field.css';
import deleteIcon from '../../assets/icons/delete-icon.png';
import editIcon from '../../assets/icons/user-edit-large.png';

const Field = ({
  field, type, handleFieldDelete, handleFieldUpdate,
}) => {
  const [showInputEle, setShowInputEle] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      handleFieldUpdate(field, e.target.value);
      setShowInputEle(false);
    }
  };
  return (
    <div className="content-fields-body-item">
      <div className="field-image">
        Ab
      </div>
      <div className="field-container">
        <div className="field-name">
          {showInputEle ? (
            <input defaultValue={field} onKeyDown={handleKeyDown} />
          ) : (
            <span>{field}</span>
          )}
        </div>
        <div className="field-type">
          {type}
        </div>
        <div className="edit-actions-field">
          <button className="btn-edit" onClick={() => setShowInputEle(true)} type="button">
            <img src={editIcon} alt="edit" />
          </button>
          <button className="btn-delete" onClick={() => handleFieldDelete(field)} type="button">
            <img src={deleteIcon} alt="delete" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Field;

Field.propTypes = {
  field: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleFieldDelete: PropTypes.func.isRequired,
  handleFieldUpdate: PropTypes.func.isRequired,
};
