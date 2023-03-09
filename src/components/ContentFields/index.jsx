import React from 'react';
import './ContentFields.css';
import PropTypes from 'prop-types';
import DottedButton from '../DottedButton';
import Field from '../Field';

const ContentFields = ({
  contentType, handleFieldDelete, handleFieldUpdate, handleAddFieldClick,
}) => (
  contentType && (
    <div className="content-fields-body">
      <div>
        <div className="content-fields-body-header">
          {contentType.name}
          <div>
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

export default ContentFields;

ContentFields.propTypes = {
  contentType: PropTypes.shape({
    name: PropTypes.string,
    fields: PropTypes.shape({}),
  }).isRequired,
  handleFieldDelete: PropTypes.func.isRequired,
  handleFieldUpdate: PropTypes.func.isRequired,
  handleAddFieldClick: PropTypes.func.isRequired,
};
