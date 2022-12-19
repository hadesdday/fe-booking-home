import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import { AppContext } from '../../context/AppContext';
import { COUNTRY_LIST } from '../../utils/CountryList';
import { getDateRangeInPlainWithMonth, getNightNumber } from "../../utils/DateUtils";
import { Formatter } from '../../utils/MoneyFormatter';
import $ from 'jquery';
import "./styles.scss";

function Checkout(props) {
    const { selectedDayRange, home, country, setCountry } = useContext(AppContext);

    const countryObject = COUNTRY_LIST.find(a => a.value === country);
    const night = getNightNumber(selectedDayRange);
    console.log(selectedDayRange);
    const chosenItems = JSON.parse(sessionStorage.getItem("chosenItem"));
    console.log(chosenItems);

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

    function onClickPayment() {
        const data = {
            username: $("input[name='username']").val(),
            email: $("#email").val(),
            name: $("#first__name").val() + " " + $("#last__name").val(),
            country: countryObject.name,
            phone: $("#phone__num").val(),
        };
        sessionStorage.setItem("customer", JSON.stringify(data));
    }

    return (
        <>
            <div className="position-relative m-4">
                <div className="progress" style={{ height: "1px" }}>
                    <div className="progress-bar" role="progressbar" aria-label="Progress" style={{ width: "0" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <button type="button" className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem" }}>1</button>
                <button type="button" className="position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: "2rem", height: "2rem" }}>2</button>
                <button type="button" className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: "2rem", height: "2rem" }}><i className='bx bx-check fw-bold'></i></button>
                <p className='mt-3'>Customer information</p>
            </div>
            {/* start container */}
            <div className="container-fluid bg-gray">
                <div className="container pt-5 bg-gray">
                    <div className="row w-100 gy-2">
                        <div className="col-md-7 bx__shadow m-1 rounded-1 mh-400 bg-white mt-2">
                            <div className="row mt-3">
                                <h6 className='fw-semibold'>Contact details</h6>
                                <p className="mt-3">
                                    This is your information will be sent
                                </p>
                            </div>
                            <div className="row mt-3 g-2">
                                <input type="hidden" name="username" value="" />
                                <div className="col">
                                    <label htmlFor="first__name">First name</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control p-2" id='first__name' placeholder='First name' name='first__name' />
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="last__name">Last name</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control p-2" id='last__name' placeholder='Last name' name='last__name' />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3 g-2">
                                <div className="col">
                                    <label htmlFor="email">Email</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control p-2" id='email' placeholder='Email' name='email' />
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="country">Country/region of residence</label>
                                    <SelectSearch options={COUNTRY_LIST} value={country} onChange={setCountry} name="country" placeholder="Choose your country" search />
                                </div>
                            </div>
                            <div className="row mt-3 g-2">
                                <label htmlFor="phone__num">Mobile number</label>
                                <div className="input-group mb-4">
                                    <input type="tel" className="form-control p-2" id='phone__num' placeholder='Mobile Number' name='phone__num' maxLength={10} />
                                </div>
                            </div>
                            <div className="row justify-content-end hide-mobile">
                                <Link to="/checkout/payment" className="text-center btn__main text-white rounded-2 p-3 px-2 mt-3 bx__shadow w-40" onClick={onClickPayment}>Continue to payment</Link>
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

export default Checkout;