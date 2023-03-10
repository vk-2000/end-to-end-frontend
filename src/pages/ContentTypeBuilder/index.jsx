import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddModal from '../../components/AddModal';
import ContentFields from '../../components/ContentFields';
import ContentTypeList from '../../components/ContentTypeList';
import Navbar from '../../components/Navbar';
import {
  ADD_CONTENT_TYPE,
  ADD_FIELD_BY_ID,
  DELETE_FIELDBY_ID,
  GET_ALL_CONTENT_TYPES,
  UPDATE_CONTENT_NAME_BY_ID,
  UPDATE_FIELD_BY_ID,
} from '../../constants/apiEndPoints';
import { LOGIN } from '../../constants/routes';
import makeRequest from '../../utils/makeRequest';
import './ContentTypeBuilder.css';

const ContentTypeBuilder = () => {
  // eslint-disable-next-line no-unused-vars
  const [contentTypes, setContentTypes] = useState(null);
  const [selectedContentType, setSelectedContentType] = useState(null);
  const [toAddField, setToAddField] = useState(false);
  const [toAddContent, setToAddContent] = useState(false);
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
    });
  }, []);

  const handleContentTypeClick = (id) => {
    const contentType = contentTypes.find((type) => type.id === id);
    setSelectedContentType(contentType);
  };
  const handleAddContentClick = () => {
    setToAddContent(true);
  };
  const handleAddFieldClick = () => {
    setToAddField(true);
  };

  const handleAddContentCancel = () => {
    setToAddContent(false);
  };
  const handleAddFieldCancel = () => {
    setToAddField(false);
  };
  const handleAddContentSubmit = (name) => {
    setToAddContent(false);
    makeRequest(ADD_CONTENT_TYPE, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      data: {
        name,
      },
    }, navigate).then((res) => {
      setContentTypes([...contentTypes, res]);
    });
  };

  const handleContentNameUpdate = (name) => {
    makeRequest(UPDATE_CONTENT_NAME_BY_ID(selectedContentType.id), {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      data: {
        name,
      },
    }, navigate).then(() => {
      const updatedContentTypes = contentTypes.map((type) => {
        if (type.id === selectedContentType.id) {
          return {
            ...type,
            name,
          };
        }
        return type;
      });
      setContentTypes(updatedContentTypes);
      const newContentType = { ...selectedContentType };
      newContentType.name = name;
      setSelectedContentType(newContentType);
    });
  };

  const handleAddFieldSubmit = (name) => {
    setToAddField(false);
    makeRequest(ADD_FIELD_BY_ID(selectedContentType.id), {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      data: {
        name,
        type: 'string',
      },
    }, navigate).then(() => {
      const newContentType = { ...selectedContentType };
      newContentType.fields[name] = 'string';
      setSelectedContentType(newContentType);
    });
  };

  const handleFieldDelete = (fieldName) => {
    makeRequest(DELETE_FIELDBY_ID(selectedContentType.id, fieldName), {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }, navigate).then(() => {
      const newContentType = { ...selectedContentType };
      delete newContentType.fields[fieldName];
      setSelectedContentType(newContentType);
    });
  };
  const handleFieldUpdate = (oldName, newName) => {
    if (oldName === newName) return;
    makeRequest(UPDATE_FIELD_BY_ID(selectedContentType.id, oldName), {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      data: {
        newName,
        type: 'string',
      },
    }, navigate).then(() => {
      const newContentType = { ...selectedContentType };
      newContentType.fields[newName] = newContentType.fields[oldName];
      delete newContentType.fields[oldName];
      setSelectedContentType(newContentType);
    });
  };

  return (!contentTypes ? <div>loading</div> : (
    <div className="content-builder-body">
      {toAddContent && (
      <AddModal
        title="Add Content Type"
        label="Content Type Name"
        cancelHandler={handleAddContentCancel}
        submitHandler={handleAddContentSubmit}
      />
      )}
      {toAddField && (
      <AddModal
        title="Add Field"
        label="Field Name"
        cancelHandler={handleAddFieldCancel}
        submitHandler={handleAddFieldSubmit}
      />
      )}
      <Navbar
        collectionList={contentTypes.map((contentType) => (
          { id: contentType.id, name: contentType.name }
        ))}
      />
      <div className="content-container">
        <div className="content-header">
          Content Types
        </div>
        <div className="content-body">
          <ContentTypeList
            contentTypes={contentTypes}
            handleContentTypeClick={handleContentTypeClick}
            handleAddContentClick={handleAddContentClick}
          />
          <ContentFields
            contentType={selectedContentType}
            handleFieldDelete={handleFieldDelete}
            handleFieldUpdate={handleFieldUpdate}
            handleAddFieldClick={handleAddFieldClick}
            handleContentNameUpdate={handleContentNameUpdate}

          />

        </div>

      </div>
    </div>
  ));
};

export default ContentTypeBuilder;
