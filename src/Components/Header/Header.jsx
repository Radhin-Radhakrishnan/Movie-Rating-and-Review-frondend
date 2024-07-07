import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoginState,userDataState } from '../../Atoms/loginAtom';
import './Header.css';
import DarkMode from '../DarkMode/DarkMode';
import axios from '../../axios/axios';
import { activeLinkState } from '../../Atoms/activeLinkAtom';
import { FaUser } from 'react-icons/fa'; 

const Header = () => {
    const [isLogin, setIsLogin] = useRecoilState(isLoginState);
    const [userData, setUserData] = useRecoilState(userDataState);
    const [activeLink, setActiveLink] = useRecoilState(activeLinkState);

    const navigate = useNavigate();

    useEffect(() => {
        const storedIsLogin = localStorage.getItem('isLogin');
        if (storedIsLogin !== null) {
            setIsLogin(JSON.parse(storedIsLogin));
        }
        if (isLogin) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('/api/v1/user/info', {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                        }
                    });

                    localStorage.setItem("user", JSON.stringify(response.data));
                    setUserData(response.data);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };
            fetchData();
        }
    }, [isLogin, setIsLogin, setUserData]);

    const handleNavItemClick = (navItem) => {
        setActiveLink(navItem);
    };

    const handleLoggOut = () => {
        localStorage.removeItem('isSignup');
        localStorage.removeItem('isLogin');
        localStorage.removeItem('user');
        localStorage.removeItem('jwt_token');
        setIsLogin(false);
        navigate('/home');
        window.location.reload();
    };

    return (
        <header>
            <Navbar expand="lg" className="nav_head py-4">
                <Container>
                    <Navbar.Brand href="#home" className='head-nav fs-3 text-white'  onClick={() => navigate('/')}>
                    𝐅𝐫𝐚𝐦𝐞 𝐑𝐚𝐭𝐞 
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='text-center text-lg-start navbar_nav pt-2'>
                            <Link
                                to='/home'
                                className={`ms-lg-3 mt-3 mt-lg-0  ${activeLink === 'home' ? 'active' : ''}`}
                                onClick={() => handleNavItemClick('home')}
                            >
                                Home
                            </Link>
                            <Link
                                to='/movies'
                                className={`ms-lg-3 mt-2 mt-lg-0 ${activeLink === 'movie' ? 'active' : ''}`}
                                onClick={() => handleNavItemClick('movie')}
                            >
                                Movies
                            </Link>
                            <Link
                                            to='/user/favorites'
                                            className={`${activeLink === 'favorites' ? 'active' : ''}`}
                                            onClick={() => handleNavItemClick('favorites')}
                                        >
                                            Favorites
                            </Link>
                            <Link
                                            to='/user/reviews'
                                            className={`${activeLink === 'reviews' ? 'active' : ''}`}
                                            onClick={() => handleNavItemClick('reviews')}
                                        >
                                            Reviews
                                        </Link>
                            {!isLogin && (
                                <Link
                                    to='/login'
                                    className={`ms-lg-3 mt-2 mt-lg-0 ${activeLink === 'login' ? 'active' : ''}`}
                                    onClick={() => handleNavItemClick('login')}
                                >
                                    Login
                                </Link>
                            )}
                        </Nav>

                        {isLogin ? (
                            <Nav className='ms-auto text-center text-lg-start justify-content-center align-items-center'>
                                <DarkMode />
                                <NavDropdown
                                    title={
                                        <> 
                                            <span className='user_icon me-1'>
                                                <FaUser />
                                            </span>
                                            {userData && userData.firstName}
                                        </>
                                    }
                                    id="basic-nav-dropdown"
                                    className='me-lg-4 mt-2 mt-lg-0 navbar_dropdown'
                                >
                                    <Nav className='px-3 mb-2'>
                                        <Link
                                            to='/user/update-password'
                                            className={`${activeLink === 'updatePassword' ? 'active' : ''}`}
                                            onClick={() => handleNavItemClick('updatePassword')}
                                        >
                                            Update Password
                                        </Link>
                                    </Nav>
                                    <Nav className='px-3 mb-2'>
                                        <Link
                                            to='/home'
                                            className={`${activeLink === 'logOut' ? 'active' : ''}`}
                                            onClick={() => {
                                                handleNavItemClick('logOut');
                                                handleLoggOut();
                                            }}
                                        >
                                            Log Out
                                        </Link>
                                    </Nav>
                                </NavDropdown>
                            </Nav>
                        ) : (
                            <Nav className='ms-auto text-center text-lg-start justify-content-center align-items-center'>
                                <DarkMode />
                                <NavDropdown
                                    title="Other"
                                    id="basic-nav-dropdown"
                                    className='me-lg-4 navbar_dropdown'
                                >
                                    
                                    <Nav className='px-3 mb-2'>
                                        <Link
                                            to='/user/update-password'
                                            className={`text-dark${activeLink === 'updatePassword' ? 'active' : ''}`}
                                            onClick={() => handleNavItemClick('updatePassword')}
                                        >
                                            Update Password
                                        </Link>
                                    </Nav>
                                </NavDropdown>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
