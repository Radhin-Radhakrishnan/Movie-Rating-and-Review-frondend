import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../../axios/axios';
import './UpdatePassword.css';

const schema = z.object({
    email: z.string().email('Invalid email address'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8)
}).refine((val) => val.newPassword === val.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

const UpdatePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.patch('/api/v1/user/updatepassword', data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                }
            });
            if (response.status === 200) {
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            alert("Updating password failed! Please ensure your email ID is correct.");
        }
    };

    return (
        <section className='update_password_section'>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={12}>
                        <div className="form_container">
                            <h1 className='text-center'>Update Password</h1>
                            <Form onSubmit={handleSubmit(onSubmit)} className='p-4 border rounded'>
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter your email..." 
                                         className='rounded-pill'
                                        {...register('email')}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter new password..." 
                                        className='rounded-pill'
                                        {...register('newPassword')}
                                        isInvalid={!!errors.newPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.newPassword?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Confirm new password..." 
                                         className='rounded-pill'
                                        {...register('confirmPassword')}
                                        isInvalid={!!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" className='w-100 rounded-pill'>
                                    Update Password
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default UpdatePassword;
