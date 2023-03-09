import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Field.css';

const Field = ({
  field, type, handleFieldDelete, handleFieldUpdate,
}) => {
  const [showInputEle, setShowInputEle] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFieldUpdate(field, e.target.value);
      setShowInputEle(false);
    }
  };
  return (
    <div className="content-fields-body-item">
      <div className="field-name">
        {showInputEle ? (
          <input onKeyDown={handleKeyDown} />
        ) : (
          <span>{field}</span>
        )}
      </div>
      <div className="field-type">
        {type}
      </div>
      <div className="edit-actions-field">
        <button onClick={() => setShowInputEle(true)} type="button">
          E
        </button>
        <button onClick={() => handleFieldDelete(field)} type="button">
          X
        </button>
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
