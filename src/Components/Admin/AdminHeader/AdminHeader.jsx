import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import '../../Header/Header.css'
import { useRecoilState } from 'recoil';
import { isLoginState, userDataState } from '../../../Atoms/loginAtom';
import axios from '../../../axios/axios';
import '../../DarkMode/DarkMode'
import DarkMode from '../../DarkMode/DarkMode';

const AdminHeader = () => {


    const [isLogin, setIsLogin] = useRecoilState(isLoginState)
    const [userData, setUserData] = useRecoilState(userDataState)

    const navigate = useNavigate();

    //signin fetch
    useEffect(() => {

        const storedIsLogin = localStorage.getItem('isLogin');
        if (storedIsLogin !== null) {
            setIsLogin(JSON.parse(storedIsLogin));
        }
        if (isLogin) {

            const fetchData = async () => {
                try {
                    console.log("This is the login data");
                    const response = await axios.get('/api/v1/admin',{
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                        }
                    });

                    localStorage.setItem("admin", JSON.stringify(response.data));
                    const adminDataString = localStorage.getItem("admin");

                    if (adminDataString) {
                        const userData = JSON.parse(adminDataString);
                        setUserData(userData);
                    } else {
                        console.log("No user data found in local storage");
                    }

                } catch (error) {
                    console.error('Error fetching user info:',error);
                }
            };
            fetchData();
        }

    }, [isLogin, setIsLogin, setUserData]);

    const handleLoggOut = () => {
        localStorage.removeItem('isSignup')
        localStorage.removeItem('isLogin')
        localStorage.removeItem('admin')
        localStorage.removeItem('jwt_token')
        setIsLogin(false)
        navigate('/home')
        window.location.reload()
    }
    return (
        <header>
            <Navbar expand="lg" className="nav_head py-4 ">
                <Container>
                    <Navbar.Brand href="#home" className="text-white fs-3"  onClick={() => navigate('/')}>
                        FrameRate
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='text-center text-lg-start navbar_nav mx-auto'>
                            <Link to={"/admin/users"} className='ms-lg-3'>Manage Users</Link>
                            <Link to={"/admin/listOfMovies"} className='ms-lg-3'>Manage Movies</Link>
                        </Nav>
                        <DarkMode/>
                        <Nav className='ms-auto text-center text-lg-start'>
                            <Link to={'/login'} onClick={handleLoggOut} className='ms-lg-3'>Logout</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default AdminHeader