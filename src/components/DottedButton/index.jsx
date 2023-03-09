import React from 'react';
import PropTypes from 'prop-types';
import './DottedButton.css';

const DottedButton = ({ text, onClick }) => (
  <button className="dotted-button" onClick={onClick} type="button">
    {text}
  </button>
);

export default DottedButton;

DottedButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
