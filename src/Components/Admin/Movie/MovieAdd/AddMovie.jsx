import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from '../../../../axios/axios';
import './AddMovie.css';

const AddMovie = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !description || !genre || !language || (!imageFile && !imageUrl)) {
      setErrorMessage('All fields are required, including an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('language', language);

    if (imageFile) {
      formData.append('image', imageFile);
    } else {
      formData.append('imageUrl', imageUrl);
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        const response = await axios.post('/api/v1/admin/movies',formData, {
          headers: {
            "Content-Type": "multipart/formdata",
            "Authorization": `Bearer ${token}`
          }
        });
        setSuccessMessage(response.data.message);
        navigate('/admin/listOfMovies');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while adding the movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="addMovie_Section py-4">
      <Container>
        <div className="addMovie_container py-3 px-1">
          <div className="main_header pt-3">
            <h1 className="text-capitalize">Add Movie Here...</h1>
          </div>
          <div className="addMovie_form d-flex flex-column justify-content-start align-items-start mt-4">
            <Form onSubmit={handleSubmit} className='d-flex flex-column gap-3 w-100 py-2 mt-4'>
              {loading && <div className='loading_message'>Loading... Please wait...</div>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              <Form.Control
                type="text"
                name='name'
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder='Title'
                className='py-3 px-3 text-capitalize'
              />
              <Form.Control
                type="text"
                name='description'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder='Description'
                className='py-3 px-3 text-capitalize'
              />
              <Form.Control
                type="text"
                name='genre'
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                placeholder='Genre'
                className='py-3 px-3 text-capitalize'
              />
              <Form.Control
                type="text"
                name='language'
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                placeholder='Language'
                className='py-3 px-3 text-capitalize'
              />
              <Form.Control
                type="text"
                name='imageUrl'
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder='Image URL'
                className='py-3 px-3 text-capitalize'
              />
              <Form.Control
                type="file"
                name='imageFile'
                onChange={handleImageChange}
                className='py-3 px-3 text-capitalize'
              />
              <Button type="submit" className='py-3 submit_button' disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit'}
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AddMovie;
