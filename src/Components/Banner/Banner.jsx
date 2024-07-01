import React from 'react';
import { LuEye } from "react-icons/lu";
import{ Container,Row,Col,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useSingleMovieFetch from '../../hooks/useSingleMovieFetch';
import { imageUrl } from '../../urls/urls';
import { useRecoilState } from 'recoil';
import { activeLinkState } from '../../Atoms/activeLinkAtom';
import './Banner.css';

const Banner = ({ url }) => {
    const [activeLink, setActiveLink] = useRecoilState(activeLinkState);
    const movie = useSingleMovieFetch({ url });

    return (
        <section
            className="banner_section d-flex  flex-column pt-4"
            style= {{ backgroundImage: `url(${movie && imageUrl + movie.backdrop_path})` }}
        >
            <Container>
                <Row className="justify-content-start">
                    <Col xs={12} md={10} lg={8} className="banner_content pt-2 pt-lg-5 mt-2 mt-lg-5 text-center text-lg-start">
                        <h1 className="movie_title mt-4">{movie && movie.title}</h1>
                        <p className="movie_description mt-3">
                            {movie && movie.overview}
                        </p>
                        <div className="button_group mt-4 mb-3 pt-2 pb-5">
                            <Link to={`/movies/${movie && movie.id}`}>
                                <Button
                                    className="view_button mt-1 rounded-pill"
                                    onClick={() => setActiveLink('movie')}>
                                    <LuEye /> View
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Banner;
