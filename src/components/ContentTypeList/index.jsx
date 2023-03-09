import React from 'react';
import './ContentTypeList.css';
import PropTypes from 'prop-types';
import DottedButton from '../DottedButton';

const ContentTypeList = ({ contentTypes, handleContentTypeClick, handleAddContentClick }) => (
  <div className="content-type-list-body">
    <div className="content-type-list-header">
      <div>
        {contentTypes.length}
        {' '}
        Types
      </div>
      <div>
        <img src="" alt="" />
      </div>
    </div>
    <DottedButton onClick={handleAddContentClick} text="+ New Type" />
    <div className="content-type-list-container">
      {contentTypes.map((contentType) => (
        <button onClick={() => handleContentTypeClick(contentType.id)} type="button" key={contentType.id} className="content-type-list-item">
          <div>{contentType.name}</div>
          <div>13</div>
        </button>
      ))}
    </div>
  </div>
);

export default ContentTypeList;

ContentTypeList.propTypes = {
  contentTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  handleContentTypeClick: PropTypes.func.isRequired,
  handleAddContentClick: PropTypes.func.isRequired,
};
