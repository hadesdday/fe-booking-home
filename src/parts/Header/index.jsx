import React from 'react';
import { Outlet, Link } from "react-router-dom";
import "./styles.scss";

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white z-3">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">gotrip</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapse__navbar" aria-controls="collapse__navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapse__navbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold" to="/">Explore</Link>
                            </li>
                            <li className="nav-item fw-semibold">
                                <Link className="nav-link" to="/">
                                    Coupon & Deals
                                </Link>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            <Link to="/" role="button" className="btn__register__rental">List your place</Link>
                            <Link to='/' role="button" className="btn__cart">
                                <i className='bx bx-cart ico__cart'></i></Link>

                            <Link to="/Login" role="button" className="btn__signin">Sign in</Link>

                            <Link to="/Register" role="button" className="btn__create__account">Create Account</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Header;