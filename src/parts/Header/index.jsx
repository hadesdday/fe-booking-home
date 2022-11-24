import React from 'react';
import "./styles.scss";

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container-fluid">
                    <a className="navbar-brand" href="">gotrip</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapse__navbar" aria-controls="collapse__navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapse__navbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link fw-bold" href="">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-bold" href="">Explore</a>
                            </li>
                            <li className="nav-item fw-bold">
                                <a className="nav-link" href="">
                                    Coupon & Deals
                                </a>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            <a href="" role="button" className="btn__register__rental">List your place</a>
                            <a href='' role="button" className="btn__cart">
                                <i className='bx bx-cart ico__cart'></i></a>
                            <a href='' role="button" className="btn__signin">Sign in</a>
                            <a href="" role="button" className="btn__create__account">Create account</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;