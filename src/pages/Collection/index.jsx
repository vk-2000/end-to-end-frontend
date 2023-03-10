import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CollectionInstances from '../../components/CollectionInstances';
import Navbar from '../../components/Navbar';
import {
  ADD_COLLECTION_BY_ID,
  DELETE_COLLECTION_BY_ID,
  GET_ALL_CONTENT_TYPES,
  GET_COLLECTIONS_BY_ID,
  UPDATE_COLLECTION_BY_ID,
} from '../../constants/apiEndPoints';
import { LOGIN } from '../../constants/routes';
import makeRequest from '../../utils/makeRequest';
import './Collection.css';

const Collection = () => {
  const [contentTypes, setContentTypes] = useState(null);
  const [selectedContentType, setSelectedContentType] = useState(null);
  const [collections, setCollections] = useState(null);
  const { contentId } = useParams();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    setToken(localStorageToken);
    if (!localStorageToken) {
      navigate(LOGIN);
    }
    makeRequest(GET_ALL_CONTENT_TYPES, {
      headers: {
        authorization: localStorageToken,
      },
    }).then((res) => {
      setContentTypes(res);
      setSelectedContentType(res.filter((c) => c.id === Number(contentId))[0]);
    }).catch((err) => {
      if (err.response.status === 401) {
        navigate('/login');
      }
    });
    makeRequest(GET_COLLECTIONS_BY_ID(contentId), {
      headers: {
        authorization: localStorageToken,
      },
    }).then((res) => {
      console.log(res);
      setCollections(res);
    }).catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        navigate('/login');
      }
    });
  }, [contentId]);
  const handleAddCollection = (data) => {
    makeRequest(ADD_COLLECTION_BY_ID(contentId), {
      headers: {
        authorization: token,
      },
      data: {
        values: data,
      },
    }).then((res) => {
      console.log(res);
      setCollections([...collections, res]);
    }).catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        navigate('/login');
      }
    });
  };
  const handleDeleteCollection = (id) => {
    makeRequest(DELETE_COLLECTION_BY_ID(contentId, id), {
      headers: {
        authorization: token,
      },
    }).then((res) => {
      console.log(res);
      setCollections(collections.filter((c) => c.id !== id));
    }).catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        navigate('/login');
      }
    });
  };
  const handleEditCollection = (id, data) => {
    makeRequest(UPDATE_COLLECTION_BY_ID(contentId, id), {
      headers: {
        authorization: token,
      },
      data: {
        values: data,
      },
    }).then((res) => {
      const updatedCollections = collections.map((c) => {
        if (c.id === id) {
          return res[1][0];
        }
        return c;
      });
      console.log(updatedCollections);
      setCollections(updatedCollections);
    }).catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        navigate('/login');
      }
    });
  };
  if (!contentTypes) return (<div>Loading...</div>);
  return (
    <div className="collection-page-body">
      <Navbar
        collectionList={contentTypes.map((contentType) => (
          { id: contentType.id, name: contentType.name }
        ))}
      />
      <div className="collection-container">
        <div className="collection-header">
          {selectedContentType.name}
        </div>
        <div className="collection-body">
          {
            collections && (
            <CollectionInstances
              collections={collections}
              contentType={selectedContentType}
              handleAddCollection={handleAddCollection}
              handleDeleteCollection={handleDeleteCollection}
              handleEditCollection={handleEditCollection}
            />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Collection;
