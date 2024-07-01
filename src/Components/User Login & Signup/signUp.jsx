import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '../../axios/axios';
import './Login.css';

const schema = z.object({
  firstName: z.string().min(4, 'First name must be at least 4 characters'),
  lastName: z.string().min(1, 'Last name must be at least 1 character'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  authorization_keyValue: z.string()
    .refine((val) => val === import.meta.env.VITE_ADMIN_AUTH_KEY, {
      message: 'Invalid Authorization key',
      path: ['authorization_keyValue'],
    }).optional()
});

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const url = isChecked ? '/api/v1/admin/signUp' : '/api/v1/user/signUp';
    console.log(data)
    try {
      const response = await axios.post(url, data);

      if (response.status === 201) { // Handle successful signup
        alert(response.data.message);
        navigate('/login');
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      }
      console.log('Signup error:', error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setInputValue('');
  };

  return (
    <Container fluid className='login_section'>
      <Row className='d-flex justify-content-center align-items-center w-100'>
        <Col xs={12} md={8} lg={6}>
          <div className="login_container mx-1 mx-md-5">
            <h1 className='text-center px-lg-1 py-lg-1'>FRAME RATE</h1>
            <h4 className='text-center py-lg-1 text-white'>SIGN UP</h4>
            <Form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-1 px-lg-5 py-lg-3'>
              <Form.Control
                type='text'
                placeholder='First Name'
                {...register("firstName")}
                className='mb-2 mt-2 py-2 px-2 py-md-2 px-md-2'
              />
              {errors.firstName && (
                <div className="error_message">{errors.firstName.message}</div>
              )}

              <Form.Control
                type='text'
                placeholder='Last Name'
                {...register("lastName")}
                className='mb-2 mt-2 py-2 px-2 py-md-2 px-md-2'
              />
              {errors.lastName && (
                <div className="error_message">{errors.lastName.message}</div>
              )}

              <Form.Control
                type='email'
                placeholder='Email'
                {...register("email")}
                className='mb-2 mt-2 py-2 px-2 py-md-2 px-md-2'
              />
              {errors.email && (
                <div className="error_message">{errors.email.message}</div>
              )}

              <Form.Control
                type='password'
                placeholder='Password'
                {...register("password")}
                className='mb-2 mt-2 py-2 px-2 py-md-2 px-md-2'
              />
              {errors.password && (
                <div className="error_message">{errors.password.message}</div>
              )}

              {isChecked && (
                <Form.Control
                  type='password'
                  placeholder='Authorization Key'
                  {...register("authorization_keyValue")}
                  className='mb-2 mt-2 py-2 px-2 py-md-3 px-md-3 '
                />
              )}
              {errors.authorization_keyValue && (
                <div className="error_message">{errors.authorization_keyValue.message}</div>
              )}

              <Button
                type='submit'
                className='signin_button py-2 px-2 py-md-2 px-md-2'
              >
                Sign Up
              </Button>

              <div className="bottom_section mt-3 d-flex flex-column flex-md-row justify-content-md-between align-items-center gap-2">
                <p className='text-decoration-none'>Already have an account?
                  <Link to={"/login"} className='text-decoration-none'>
                    <span className='text_bold'>Sign In Here.</span>
                  </Link>
                </p>
                <div className="input_group d-flex flex-row justify-content-start align-items-center gap-1 mb-2">
                  <Form.Check
                    type="checkbox"
                    label="Admin Sign Up"
                    name='authorization_keyValue'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
