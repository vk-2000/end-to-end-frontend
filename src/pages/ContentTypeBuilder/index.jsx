import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { GET_ALL_CONTENT_TYPES } from '../../constants/apiEndPoints';
import { LOGIN } from '../../constants/routes';
import makeRequest from '../../utils/makeRequest';

const ContentTypeBuilder = () => {
  // eslint-disable-next-line no-unused-vars
  const [contentTypes, setContentTypes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate(LOGIN);
    }
    makeRequest(GET_ALL_CONTENT_TYPES, {
      headers: {
        authorization: token,
      },
    }).then((res) => {
      setContentTypes(res);
    }).catch((err) => {
      if (err.response.status === 401) {
        navigate('/login');
      }
    });
  }, []);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default ContentTypeBuilder;
