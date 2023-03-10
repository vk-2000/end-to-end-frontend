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
  const navigate = useNavigate();
  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    if (!localStorageToken) {
      navigate(LOGIN);
    }
    makeRequest(GET_ALL_CONTENT_TYPES, {
      headers: {
        authorization: localStorageToken,
      },
    }, navigate).then((res) => {
      setContentTypes(res);
      setSelectedContentType(res.filter((c) => c.id === Number(contentId))[0]);
    });
    makeRequest(GET_COLLECTIONS_BY_ID(contentId), {
      headers: {
        authorization: localStorageToken,
      },
    }, navigate).then((res) => {
      setCollections(res);
    });
  }, [contentId]);
  const handleAddCollection = (data) => {
    makeRequest(ADD_COLLECTION_BY_ID(contentId), {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      data: {
        values: data,
      },
    }, navigate).then((res) => {
      setCollections([...collections, res]);
    });
  };
  const handleDeleteCollection = (id) => {
    makeRequest(DELETE_COLLECTION_BY_ID(contentId, id), {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }, navigate).then(() => {
      setCollections(collections.filter((c) => c.id !== id));
    });
  };
  const handleEditCollection = (id, data) => {
    makeRequest(UPDATE_COLLECTION_BY_ID(contentId, id), {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      data: {
        values: data,
      },
    }, navigate).then((res) => {
      const updatedCollections = collections.map((c) => {
        if (c.id === id) {
          return res[1][0];
        }
        return c;
      });
      setCollections(updatedCollections);
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
              collections={
                // add id to values object of each collection
                collections.map((collection) => ({
                  ...collection,
                  values: {
                    id: collection.id,
                    ...collection.values,
                  },
                }))
              }
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
