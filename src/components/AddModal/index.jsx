import React, { useState } from 'react';
import './AddContentModal.css';
import PropTypes from 'prop-types';

const AddModal = ({
  title, label, submitHandler, cancelHandler,
}) => {
  const [name, setName] = useState('');
  return (
    <div className="add-modal">
      <div className="add-container">
        <h3>{title}</h3>
        <div className="form">
          <label htmlFor="name">
            <div>
              {label}
            </div>
            <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" />
          </label>
          <div className="add-btn-container">
            <button className="add-btn-cancel" onClick={cancelHandler} type="button">Cancel</button>
            <button className="add-btn-create" onClick={() => submitHandler(name)} type="button">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;

AddModal.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  submitHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};
