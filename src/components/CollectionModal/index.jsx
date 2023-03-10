/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './CollectionModal.css';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const CollectionModal = ({
  title, fields, submitHandler, cancelHandler, showDefault,
}) => {
  const { register, handleSubmit } = useForm();
  return (
    <div className="collection-modal-body">
      <div className="collection-modal-container">
        <div className="header">
          <div className="header-text">
            <h3>{title}</h3>
          </div>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="collection-modal-form">
          {Object.keys(fields).map((field) => (
            <label htmlFor={field}>
              <div>
                {field}
              </div>
              <input defaultValue={showDefault ? fields[field] : ''} type="string" name={field} id={field} {...register(field)} />
            </label>
          ))}
          <div className="collection-modal-btn-container">
            <button onClick={cancelHandler} className="collection-modal-btn-cancel" type="button">Cancel</button>
            <button className="collection-modal-btn-create" type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionModal;

CollectionModal.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  submitHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  showDefault: PropTypes.bool.isRequired,
};
