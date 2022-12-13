import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import { AppContext } from '../../context/AppContext';
import { COUNTRY_LIST } from '../../utils/CountryList';
import { getDateRangeInPlainWithMonth, getNightNumber } from "../../utils/DateUtils";
import { Formatter } from '../../utils/MoneyFormatter';
import "./styles.scss";

function Checkout(props) {
    const [country, setCountry] = useState("");
    const countryObject = COUNTRY_LIST.find(a => a.value === country);

    const { selectedDayRange, home } = useContext(AppContext);

    const night = getNightNumber(selectedDayRange);

    return (
        <>
            {/* <div class="position-relative m-4">
                <div class="progress" style={{ height: "1px" }}>
                    <div class="progress-bar" role="progressbar" aria-label="Progress" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem" }}>1</button>
                <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem" }}>2</button>
                <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: "2rem", height: "2rem" }}>3</button>
            </div> */}
            <div className="container-fluid bg-gray">
                <div className="container pt-5 bg-gray">
                    <div className="row w-100 gy-2">
                        <div className="col-md-7 bx__shadow m-1 rounded-1 mh-400 bg-white">
                            <div className="row mt-3">
                                <h6 className='fw-semibold'>Contact details</h6>
                                <p className="mt-3">
                                    This is your information will be sent
                                </p>
                            </div>
                            <div className="row mt-3 g-2">
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
                                    <input type="tel" className="form-control p-2" id='phone__num' placeholder='Mobile Number' name='phone__num' />
                                </div>
                            </div>
                            <div className="row justify-content-end hide-mobile">
                                <Link to={"/payment"} className="text-center btn__main text-white rounded-2 p-3 px-2 mt-3 bx__shadow w-40">Continue to payment</Link>
                            </div>
                        </div>
                        <div className="col-md-4 m-2">
                            <div className="row border rounded-2 bg-white">
                                <div className="bg-light-green rounded-top p-3 border-bottom">
                                    <h4 className='fw-semibold'>Booking Summary</h4>
                                </div>
                                <div className="border-bottom">
                                    <div className="row pt-3">
                                        <p className='fw-semibold'><i className='bx bxs-building-house'></i>HOTEL <span className="fs-70 text-muted">(HO CHI MINH CITY)</span></p>
                                    </div>
                                    <div className="row g-0 m-2">
                                        <div className="col-3">
                                            <img src="https://picsum.photos/150/150" alt="" width={80} className="rounded-1" />
                                        </div>
                                        <div className="col-9">
                                            <h5 className='fw-semibold'>NTA Serviced Apartments</h5>
                                            <div>
                                                <i className='bx bxs-star text-warning'></i>
                                                <i className='bx bxs-star text-warning'></i>
                                                <i className='bx bxs-star text-warning'></i>
                                                <i className='bx bxs-star text-warning'></i>
                                                <i className='bx bxs-star text-warning'></i>
                                            </div>
                                            <div className="row">
                                                <div className="col-2 bg-main text-center rounded-2 p-1 m-2 mx-wh-30 fw-semibold text-white">10</div>
                                                <div className="col-10 p-0 mt-1">
                                                    <p className='m-0 fw-semibold fs-smaller'>Exceptional</p>
                                                    <p className='fs-smaller'>From 300 reviews</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className='fs-7'><i className='bx bx-calendar'></i> {getDateRangeInPlainWithMonth(selectedDayRange)} | {night} night{night > 1 && "s"}</p>
                                    <p className='fs-7'><i className='bx bx-user'></i> {home.room} room{home.room > 1 && "s"}, {home.adults} adult{home.adults > 1 && "s"}{home.child > 0 && ", " + home.child + " child"}{home.child > 1 && "s"}</p>
                                </div>
                                <div className="border-bottom">
                                    <div className="row pt-3">
                                        <p className='fw-semibold'><i className='bx bxs-building-house'></i>HOTEL <span className="fs-70 text-muted">(HO CHI MINH CITY)</span></p>
                                    </div>
                                    <div className="row g-0 m-2">
                                        <div className="col-3">
                                            <img src="https://picsum.photos/150/150" alt="" width={80} className="rounded-1" />
                                        </div>
                                        <div className="col-9">
                                            <h5 className='fw-semibold'>NTA Serviced Apartments</h5>
                                            <div>
                                                <i className='bx bxs-star text-warning'></i>
                                                <i className='bx bxs-star text-warning'></i>
                                                <i className='bx bxs-star text-warning'></i>
                                                <i className='bx bxs-star text-warning'></i>
                                                <i className='bx bxs-star text-warning'></i>
                                            </div>
                                            <div className="row">
                                                <div className="col-2 bg-main text-center rounded-2 p-1 m-2 mx-wh-30 fw-semibold text-white">10</div>
                                                <div className="col-10 p-0 mt-1">
                                                    <p className='m-0 fw-semibold fs-smaller'>Exceptional</p>
                                                    <p className='fs-smaller'>From 300 reviews</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className='fs-7'><i className='bx bx-calendar'></i> {getDateRangeInPlainWithMonth(selectedDayRange)} | {night} night{night > 1 && "s"}</p>
                                    <p className='fs-7'><i className='bx bx-user'></i> {home.room} room{home.room > 1 && "s"}, {home.adults} adult{home.adults > 1 && "s"}{home.child > 0 && ", " + home.child + " child"}{home.child > 1 && "s"}</p>
                                </div>
                            </div>
                            <div className="row bg-white mt-3 rounded-2">
                                <h4 className='my-3 fw-semibold'>Price details</h4>

                                <div className="row m-0">
                                    <div className="col-6 text-start m-0 p-0">
                                        <p className='fs-7 m-0'>NTA Serviced Apartments</p>
                                        <p className='fs-smaller m-0'>{home.room} X room{home.room > 1 && "s"},{night} X night{night > 1 && "s"}</p>
                                        <p className='fs-smaller'>Taxes & fees</p>
                                    </div>
                                    <div className="col-6 text-end">
                                        <p>
                                            {Formatter.format(1234567)}
                                        </p>
                                        <p>
                                            + {Formatter.format(1234567)}
                                        </p>
                                    </div>
                                </div>
                                <div className="row m-0">
                                    <div className="col-6 text-start m-0 p-0 ">
                                        <p className='fs-7 m-0'>NTA Serviced Apartments</p>
                                        <p className='fs-smaller m-0'>{home.room} X room{home.room > 1 && "s"},{night} X night{night > 1 && "s"}</p>
                                        <p className='fs-smaller'>Taxes & fees</p>
                                    </div>
                                    <div className="col-6 text-end">
                                        <p>
                                            {Formatter.format(1234567)}
                                        </p>
                                        <p>
                                            + {Formatter.format(1234567)}
                                        </p>
                                    </div>
                                </div>
                                <div className="row border-bottom w-95 m-2 mt-0"></div>
                                <div className="row">
                                    <div className="col-6">
                                        <p className='fs-smaller m-0'>Total</p>
                                        <p className='fs-smaller'>with taxes & fees</p>
                                    </div>
                                    <div className="col-6 text-end m-0 p-0">
                                        <p className="fs-smaller">{Formatter.format(12345678)}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom w-95 m-2 mt-0"></div>
                                <div className="row">
                                    <div className="col-6">
                                        <p className='fs-smaller m-0'>Total you pay</p>
                                    </div>
                                    <div className="col-6 text-end m-0 p-0">
                                        <p className="fs-smaller">{Formatter.format(12345678 + 1234567)}</p>
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