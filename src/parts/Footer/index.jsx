import React from 'react';
import "./styles.scss";

function Footer(props) {
    const year = new Date().getFullYear();

    return (
        <>
            <div className="container-fluid bg-light">
                <div className="row text-start p-5">
                    <div className="col-md-3 col-sm-12 p-5 footer__col">
                        <div className="row d-flex justify-content-center">
                            <p className='fw-bold help__title'>Help</p>
                            <a href="" className='text-black-50 help__item'>FAQs</a>
                            <a href="" className='text-black-50 help__item'>Privacy policy</a>
                            <a href="" className='text-black-50 help__item'>Terms of use</a>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 p-5 footer__col">
                        <div className="row d-flex justify-content-center">
                            <p className='fw-bold help__title'>Company</p>
                            <a href="" className='text-black-50 help__item'>About us</a>
                            <a href="" className='text-black-50 help__item'>Contact</a>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 p-5 footer__col">
                        <div className="row d-flex justify-content-center">
                            <p className='fw-bold help__title'>Destinations</p>
                            <a href="" className='text-black-50 help__item'>For you</a>
                            <a href="" className='text-black-50 help__item'>Trending</a>
                            <a href="" className='text-black-50 help__item'>Best selling</a>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 p-5 footer__col">
                        <div className="row">
                            <div className="row">
                                <p className='fw-bold help__title'>Follow Us</p>
                            </div>
                            <div className="col-3 col__icon">
                                <a href="">
                                    <i className='bx bxl-facebook meta__ico'></i>
                                </a>
                            </div>
                            <div className="col-3 col__icon">
                                <a href="">
                                    <i className='bx bxl-twitter meta__ico'></i>
                                </a>
                            </div>
                            <div className="col-3 col__icon">
                                <a href="">
                                    <i className='bx bxl-tiktok text-dark' ></i>
                                </a>
                            </div>
                            <div className="col-3 col__icon">
                                <a href="">
                                    <i className='bx bxl-youtube text-danger' ></i>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container-fluid bg-dark text-white">
                <div className="row text-center p-5">
                    <p>© 2021–{year} All Rights Reserved.<br />
                        GoTrip is part of Booking Holdings Inc., the world leader in online travel & related services.</p>
                    <div className="mt-3"></div>
                    <h2>Our partners</h2>
                    <div className="d-flex justify-content-center row">
                        <i className='partner__logo partner__logo__agoda'></i>
                        <i className='partner__logo partner__logo__priceline'></i>
                        <i className='partner__logo partner__logo__kayak'></i>
                        <i className='partner__logo partner__logo__rental'></i>
                        <i className='partner__logo partner__logo__booking'></i>
                        <i className='partner__logo partner__logo__ot'></i>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;