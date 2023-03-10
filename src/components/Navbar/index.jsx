import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { COLLECTION, DASHBOARD } from '../../constants/routes';
import searchIcon from '../../assets/icons/search-icon.png';

const Navbar = ({ collectionList }) => {
  const selectedStyle = {
    backgroundColor: '#000',
    color: '#fff',
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { contentId } = useParams();
  return (
    <nav>
      <div className="logo">
        CMS+
      </div>
      <div className="list-header">
        <div>
          COLLECTION TYPES
        </div>
        <div>
          <img src={searchIcon} alt="search" />
        </div>
      </div>
      <div className="list-container">
        {collectionList.map((collection) => (
          <div style={contentId?.toString() === collection?.id.toString() ? selectedStyle : {}} className="list-item" key={collection.id}>
            <div />
            <button style={contentId?.toString() === collection?.id.toString() ? selectedStyle : {}} onClick={() => navigate(`${COLLECTION}/${collection.id}`)} type="button">{collection.name}</button>
          </div>
        ))}
      </div>
      <button data-testid="btn-ctb-builder" onClick={() => navigate(DASHBOARD)} type="button" style={location.pathname === DASHBOARD ? selectedStyle : {}} className="content-btn">
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
