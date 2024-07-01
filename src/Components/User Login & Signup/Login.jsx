
import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Container,Row,Col,Form, Button } from 'react-bootstrap';
import { z } from 'zod'
import './Login.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRecoilState } from 'recoil'
import { isLoginState} from '../../Atoms/loginAtom';
import axios from '../../axios/axios'



const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  authorization_keyValue: z
      .string()
      .refine((val) => val === import.meta.env.VITE_ADMIN_AUTH_KEY, {
          message: 'Invalid Authorization key',
          path: ['authorization_keyValue'],
      }).optional()
})

const Login = () => {

  const [isChecked, setIsChecked] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState)
  const navigate = useNavigate()
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors, reset },
  } = useForm({
      resolver: zodResolver(schema),
      
  });

  const onSubmit = async (data) => {
      if (isChecked === false) {
          console.log(data)
          try {
              
              const response = await axios.post('/api/v1/user/signIn',data);

              if (response.status === 200) {
                  alert(response.data.message) 
                  const token = response.data.token;
                  localStorage.setItem("jwt_token", token)
                  localStorage.setItem('isLogin', JSON.stringify(true)); // Set isSignup in local storage
                  setIsLogin(true)
                  navigate('/home');
                  window.location.reload();    
              }
              else {
                  console.log('Signin error:', response.data);
                  
                  
              }
          } catch (error) {
              if (error.response) {
                  console.log(error.response.data.error)
                  alert(error.response.data.error)
              }
              console.log('Signin error:', error);
              
          }
      } else {
          try {
              console.log(data)
              const response = await axios.post('/api/v1/admin/signin', data)

              if(response.status === 200) {
                  alert(response.data.message)
                  const token = response.data.token
                  localStorage.setItem("jwt_token", token)
                  localStorage.setItem('isLogin', JSON.stringify(true))
                  setIsLogin(true)
                  navigate('/admin/users')
                  window.location.reload()

              }else {
                  alert(response.data.error)
              }
          } catch (error) {
              console.log('Signin error:', error);
          }
         
      }
  }

  const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
  }
  return (
    <div className='login_section'>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={8} lg={6}>
            <div className="login_container">
              <h1 className='text-capitalize text-center px-lg-1 py-lg-1'>Framerate</h1>
              <h4 className='text-capitalize text-center text-white px-lg-1 py-lg-1'>Sign In</h4>
              <Form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-1 px-lg-5 py-lg-4'>
                <Form.Group className='mb-1 mt-1' controlId='formBasicEmail'>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    {...register('email')}
                    className='py-2 px-2 py-md-3 px-md-3'
                  />
                  {errors.email && <div className='error_message'>{errors.email.message}</div>}
                </Form.Group>
                <Form.Group className='mb-1 mt-1' controlId='formBasicPassword'>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    {...register('password')}
                    className='py-2 px-2 py-md-3 px-md-3'
                  />
                  {errors.password && <div className='error_message'>{errors.password.message}</div>}
                  {isChecked && (
                    <>
                      <Form.Control
                        type='password'
                        placeholder='authorization_keyValue'
                        {...register('authorization_keyValue')}
                        className='mb-2 mt-2 py-2 px-2 py-md-3 px-md-3'
                      />
                      {errors.authorization_key && (
                        <div className='error_message'>{errors.authorization_key.message}</div>
                      )}
                    </>
                  )}
                </Form.Group>
                <Button type='submit' className='signin_button py-2 px-2 py-md-3 px-md-3'>
                  Sign In
                </Button>
                <div className="bottom_section mt-3 d-flex flex-column flex-md-row justify-content-md-between align-items-center gap-4">
                  <p>
                    New to Framerate?
                    <Link to="/signup" className='text-decoration-none'>
                      <span className='text_bold'> Sign up now.</span>
                    </Link>
                  </p>
                  <div className="input_group d-flex flex-row justify-content-start align-items-center gap-1 pb-3">
                    <Form.Check 
                      type="checkbox" 
                      name='authorization_keyValue'
                      label="Admin Sign In"
                      checked={isChecked} // Set checked state for checkbox
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
