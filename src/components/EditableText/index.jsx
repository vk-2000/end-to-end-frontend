import React from 'react';
import PropTypes from 'prop-types';

const EditableText = ({
  showInputEle, value, handleChange, handleBlur,
}) => (
  <span>
    {
        showInputEle ? (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ) : (
          <span
            style={{
              display: 'inline-block',
              height: '25px',
              minWidth: '300px',
            }}
          >
            {value}
          </span>
        )
      }
  </span>
);

export default EditableText;

EditableText.propTypes = {
  showInputEle: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};
