import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import 'react-select-search/style.css';
import { bookHotel } from '../../api/hotel.api';
import $ from 'jquery';
import "./styles.scss";

function Success(props) {
    const customer = sessionStorage.getItem("customer");
    const chosenItems = sessionStorage.getItem("chosenItem");
    const clearSession = () => {
        sessionStorage.clear();
        localStorage.clear();
    }

    useEffect(() => {
        clearSession();
    }, [])

    return (
        <>
            {(customer === null || chosenItems === null) && <Navigate to="/" exact />}
            <div className="position-relative m-4">
                <div className="progress" style={{ height: "1px" }}>
                    <div className="progress-bar" role="progressbar" aria-label="Progress" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <button type="button" className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem" }}>1</button>
                <button type="button" className="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem" }}>2</button>
                <button type="button" className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem" }}><i className='bx bx-check fw-bold'></i></button>
                <div className="row">
                    <div className="col-4 text-start">
                        <p className='mt-3'>Customer information</p>
                    </div>
                    <div className="col-4 text-center">
                        <p className='mt-3'>Payment</p>
                    </div>
                    <div className="col-4 text-end">
                        <p className='mt-3'>Success</p>
                    </div>
                </div>
            </div>
            {/* start container */}
            <div className="container-fluid bg-gray">
                <div className="container bg-gray p-5">
                    <div className="row w-100 gy-2 bx__shadow bg-white text-center p-5 justify-content-center">
                        <i className='bx bxs-check-circle fw-bold cl-green fs-500'></i>
                        <h4>Reserved successfully !</h4>
                        <h5>Please check your email for more information !</h5>
                        <Link to={"/"} className="btn btn__reserve text-white w-25 rounded-pill">Explore more</Link>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Success;