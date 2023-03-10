import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { COLLECTION, DASHBOARD } from '../../constants/routes';

const Navbar = ({ collectionList }) => {
  const selectedStyle = {
    backgroundColor: '#000',
    color: '#fff',
  };
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav>
      <div className="logo">
        CMS+
      </div>
      <div className="list-header">
        COLLECTION TYPES
      </div>
      <div className="list-container">
        {collectionList.map((collection) => (
          <div style={location.pathname === 'ad' ? selectedStyle : {}} className="list-item" key={collection.id}>
            <div />
            <button onClick={() => navigate(`${COLLECTION}/${collection.id}`)} type="button">{collection.name}</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate(DASHBOARD)} type="button" style={location.pathname === DASHBOARD ? selectedStyle : {}} className="content-btn">
        CONTENT TYPE BUILDER
      </button>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  collectionList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};
