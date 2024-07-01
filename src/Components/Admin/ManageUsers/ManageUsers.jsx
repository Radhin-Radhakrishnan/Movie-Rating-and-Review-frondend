import React, { useEffect, useState } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { FaGreaterThan } from "react-icons/fa6";
import './ManageUsers.css'
import { Link } from 'react-router-dom';
import axios from '../../../axios/axios';

const ManageUsers = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("jwt_token")
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/admin/users', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                setData(response.data)
            } catch (error) {
                console.log(error)

            }
        }

        fetchData()
    }, [])
    
    return (
        <section className='manage_users py-4'>
            <Container>
            <Row>
                {
                    data.map((item) => {
                        return (
                            <Col xs={12} md={6} lg={4} className="mb-4" key={item._id}>
                            <div className="users_container mt-2 d-flex flex-column gap-2 py-2 px-2 py-md-4 px-md-4"  >
                                <div className="first_part d-flex flex-row gap-3 justify-content-start align-items-center">
                                   
                                        {/* <p className='pt-2'>{item.email[0]}</p> */}
                                    
                                    <div className="username_part text-capitalize">
                                        <h1>{item.email}</h1>
                                    </div>
                                </div>
                                <div className="second_part align-self-start align-self-md-end">
                                    <Link to={`/admin/users/${item._id}/activity`} className='text-decoration-none'>
                                    <span className="greaterthan_icon me-1">
                                            <FaGreaterThan />
                                        </span>
                                        Check More Activity
                                    </Link>
                                </div>
                            </div>
                            </Col>

                        )
                    })
                }
           </Row>
            </Container>
        </section>
    )
}

export default ManageUsers;