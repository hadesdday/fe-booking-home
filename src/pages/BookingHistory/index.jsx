import $ from "jquery";
import React, { useEffect, useState } from 'react';
import { getBookingHistoryByEmail, getBookingHistoryByUsername } from '../../api/hotel.api';
import Background from "../../assets/bg-history.png";

function BookingHistory(props) {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [status, setStatus] = useState(false);

    const user = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        const fetchList = () => {
            if (user) {
                getBookingHistoryByUsername(user.username).then((res) => {
                    setBookingHistory(res.data);
                    setStatus(true);
                })
            }
        }
        return () => {
            fetchList();
        };
    }, []);

    async function handleOnClick() {
        const email = $('input[name="email"]').val();
        await getBookingHistoryByEmail(email).then((res) => {
            setBookingHistory(res.data);
            setStatus(true);
            window.scrollTo(0, 0);
        })
    }

    function handleOnQuit() {
        window.scrollTo(0, 0);
        setStatus(false);
        setBookingHistory([]);
    }

    function convertToFullDate(date) {
        return new Date(date).toUTCString();
    }

    return (
        <>
            {!status ?
                <div className="container d-flex justify-content-center border border-dark p-5 mt-5 w-40">
                    <div className="row justify-content-center">
                        <div className="row g-0 m-0 p-0">
                            <img src={Background} alt="" />
                        </div>
                        <div className="row g-0 m-0 p-0 text-center">
                            <h4>Search booking history</h4>
                        </div>
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="Enter your email" aria-label="Email" name='email' />
                        </div>
                        <button className='btn rounded-pill text-white btn__reserve mt-4 w-50' onClick={handleOnClick}>Continue</button>
                    </div>
                </div> :
                <div className="container d-flex justify-content-center p-5 mt-5 border border-dark">
                    <div className="row justify-content-center w-100 m-0 p-0 g-0">
                        <div className="row w-100">
                            <div className="col-6">
                                <h4>Recently booking list</h4>
                            </div>
                            <div className="col-6 text-end">
                                {!user &&
                                    <a className="text-primary c-pointer" onClick={handleOnQuit}>Quit</a>
                                }
                            </div>
                        </div>
                        <div className="row w-100">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Hotel name</th>
                                        <th scope="col">Checkin date</th>
                                        <th scope="col">Checkout date</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {bookingHistory.length > 0 ? bookingHistory.map((item) => (
                                        <tr key={item.id}>
                                            <th className="fw-normal">{item.id}</th>
                                            <th className="fw-normal">{item.hotel.name}</th>
                                            <th className="fw-normal">{convertToFullDate(item.dateCheckin)}</th>
                                            <th className="fw-normal">{convertToFullDate(item.dateCheckout)}</th>
                                            <th className="fw-normal">{item.hotel.rooms[0].price}</th>
                                            <th className="fw-semibold">{item.status}</th>
                                        </tr>
                                    )) : <tr><td colSpan="6" className="text-center">No data</td></tr>}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            }
        </>
    );
}

export default BookingHistory;