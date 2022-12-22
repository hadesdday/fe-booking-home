import React, { useContext } from 'react';
import 'react-select-search/style.css';
import { AppContext } from '../../context/AppContext';
import { COUNTRY_LIST } from '../../utils/CountryList';
import { getDateRangeInPlainWithMonth, getNightNumber } from "../../utils/DateUtils";
import { Formatter } from "../../utils/MoneyFormatter";
import VisaIcon from "../../assets/icon/ic_visa.png";
import AmericanExpress from "../../assets/icon/ic_americanexpress.png";
import MasterIcon from "../../assets/icon/ic_master.png";
import $ from "jquery";
import "./styles.scss";
import { toastError, toastSuccess } from '../../services/ToastService';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { bookHotel } from '../../api/hotel.api';
import { cp, createPayment, dm, proccessToPayment } from '../../api/paypal.api';

function Payment(props) {
    const { selectedDayRange, home, country, setCountry } = useContext(AppContext);

    const countryObject = COUNTRY_LIST.find(a => a.value === country);
    const night = getNightNumber(selectedDayRange);
    const chosenItems = JSON.parse(sessionStorage.getItem("chosenItem"));
    const navigate = useNavigate();

    function getDateInObject(date) {
        const re = {
            year: 0,
            month: 0,
            day: 0
        }
        const d = new Date(date);
        re.year = d.getFullYear();
        re.month = d.getMonth() + 1;
        re.day = d.getDate();
        return re;
    }

    function getAvgRating(ratings) {
        if (ratings.length === 0) {
            return 0;
        }
        let sum = 0;
        ratings.map((i) => sum += i.rate);
        return sum / ratings.length;
    }

    function getRatingElements(ratings) {
        let re = [];
        const avg = getAvgRating(ratings);
        for (let i = 1; i <= avg; i++) {
            re.push(<i className='bx bxs-star text-warning' key={i}></i>);
        }
        return re;
    }

    function getDateRangeFromObject(fr, t) {
        const from = getDateInObject(fr);
        const to = getDateInObject(t);
        return { from, to };
    }

    function getCapacity(rooms) {
        if (rooms.length === 0) return 0;
        const numberOfPeople = rooms.length > 0 && rooms.reduce((a, b) => ({ children: a.children + b.children, adult: a.adult + b.adult }));
        const capacity = numberOfPeople && numberOfPeople.children + numberOfPeople.adult;
        return capacity;
    }

    var totalPrice = 0;
    if (chosenItems.length > 0) {
        chosenItems.map((item) => totalPrice += item.hotel.rooms[0].price);
    }

    var fee = totalPrice * 0.1;
    var total = totalPrice + fee;

    function onPayBooking() {
        const customer = JSON.parse(sessionStorage.getItem("customer"));
        const sessionId = sessionStorage.getItem("sessionId");
        createPayment().then((res) => {
            const { access_token } = res.data;
            localStorage.setItem("access__token", access_token);
            var token = localStorage.getItem("access__token");
            proccessToPayment(token, chosenItems, total).then((res) => {
                const { links, id } = res.data;
                localStorage.setItem("paymentId", id);
                window.location.href = links[1].href;
            })
        })
    }

    return (
        <>
            <input type="hidden" name="payment__status" value={0} />
            <div className="position-relative m-4">
                <div className="progress" style={{ height: "1px" }}>
                    <div className="progress-bar" role="progressbar" aria-label="Progress" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <button type="button" className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem" }}>1</button>
                <button type="button" className="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem" }}>2</button>
                <button type="button" className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: "2rem", height: "2rem" }}><i className='bx bx-check fw-bold'></i></button>
                <div className="row">
                    <div className="col-4 text-start">
                        <p className='mt-3'>Customer information</p>
                    </div>
                    <div className="col-4 text-center">
                        <p className='mt-3'>Payment</p>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-gray">
                <div className="container pt-5 bg-gray">
                    <div className="row w-100 gy-2">
                        <div className="col-md-7 bx__shadow m-1 rounded-1 mh-300 bg-white mt-2">
                            <div className="row bg-main rounded-top">
                                <div className="col-6">
                                    <p className="text-white pt-3">CREDIT/DEBIT CARD</p>
                                </div>
                                <div className="col-6 text-end">
                                    <img src={VisaIcon} alt="" width={50} className="m-2" />
                                    <img src={AmericanExpress} alt="" width={50} className="m-2" />
                                    <img src={MasterIcon} alt="" width={50} className="m-2" />
                                </div>
                            </div>
                            <div className="row m-1 mt-3">
                                <p className='p-0 mb-1'>Select payment method <span className='text-danger'>*</span></p>
                                <select className="form-select" aria-label="Choose payment method">
                                    <option value="Paypal" defaultChecked>Paypal</option>
                                </select>
                            </div>
                            <div className="row justify-content-end m-2">
                                <button className="text-center btn__main text-white rounded-2 p-3 px-2 mt-3 bx__shadow w-40" onClick={onPayBooking}>PAY NOW</button>
                            </div>
                        </div>
                        <div className="col-md-4 m-2">
                            <div className="row border rounded-2 bg-white">
                                <div className="bg-light-green rounded-top p-3 border-bottom">
                                    <h4 className='fw-semibold'>Booking Summary</h4>
                                </div>
                                {chosenItems && chosenItems.map((item, index) => (
                                    <div className="border-bottom" key={index}>
                                        <div className="row pt-3">
                                            <p className='fw-semibold'><i className='bx bxs-building-house'></i>HOTEL <span className="fs-70 text-muted">({item.hotel.place.province})</span></p>
                                        </div>
                                        <div className="row g-0 m-2">
                                            <div className="col-3">
                                                <img src={item.hotel.images[0].image} alt="" width={80} className="rounded-1" />
                                            </div>
                                            <div className="col-9">
                                                <h5 className='fw-semibold'>{item.hotel.name}</h5>
                                                <div>
                                                    {getRatingElements(item.hotel.reviews)}
                                                </div>
                                                <div className="row">
                                                    <div className="col-2 bg-main text-center rounded-2 p-1 m-2 mx-wh-30 fw-semibold text-white">{getAvgRating(item.hotel.reviews)}</div>
                                                    <div className="col-10 p-0 mt-1">
                                                        <p className='m-0 fw-semibold fs-smaller'>Exceptional</p>
                                                        <p className='fs-smaller'>From {item.hotel.reviews.length} review{item.hotel.reviews.length && "s"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='fs-7'><i className='bx bx-calendar'></i> {getDateRangeInPlainWithMonth(getDateRangeFromObject(item.from, item.to))} | {getNightNumber(getDateRangeFromObject(item.from, item.to))} night{getNightNumber(getDateRangeFromObject(item.from, item.to)) > 1 && "s"}</p>
                                        <p className='fs-7'><i className='bx bx-user'></i> {home.room} room{home.room > 1 && "s"}, {item.adult} adult{item.adult > 1 && "s"}{item.children > 0 && ", " + item.children + " child"}{item.children > 1 && "s"}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="row bg-white mt-3 rounded-2">
                                <h4 className='my-3 fw-semibold'>Price details</h4>
                                {chosenItems && chosenItems.map((item, index) => (
                                    <div className="row m-0" key={index}>
                                        <div className="col-6 text-start m-0 p-0">
                                            <p className='fs-7 m-0'>{item.hotel.name}</p>
                                            <p className='fs-smaller m-0'>{home.room} X room{home.room > 1 && "s"},{getNightNumber(getDateRangeFromObject(item.from, item.to))} X night{getNightNumber(getDateRangeFromObject(item.from, item.to)) > 1 && "s"}</p>
                                            <p className='fs-smaller'>Taxes & fees</p>
                                        </div>
                                        <div className="col-6 text-end">
                                            <p>
                                                {Formatter.format(item.hotel.rooms[0].price)}
                                            </p>
                                            <p>
                                                + {Formatter.format(item.hotel.rooms[0].price * 0.1)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <div className="row border-bottom w-95 m-2 mt-0"></div>
                                <div className="row">
                                    <div className="col-6">
                                        <p className='fs-smaller m-0'>Total</p>
                                        <p className='fs-smaller'>with taxes & fees</p>
                                    </div>
                                    <div className="col-6 text-end m-0 p-0">
                                        <p className="fs-smaller">{Formatter.format(total)}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom w-95 m-2 mt-0"></div>
                                <div className="row pt-2 pb-3">
                                    <div className="col-6">
                                        <p className='fs-smaller m-0'>Total you pay</p>
                                    </div>
                                    <div className="col-6 text-end m-0 p-0">
                                        <p className="fs-smaller">{Formatter.format(total)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Payment;