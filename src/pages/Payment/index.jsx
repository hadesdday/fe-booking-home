import React, { useContext } from 'react';
import 'react-select-search/style.css';
import { AppContext } from '../../context/AppContext';
import { COUNTRY_LIST } from '../../utils/CountryList';
import { getDateRangeInPlainWithMonth, getNightNumber } from "../../utils/DateUtils";
import { Formatter } from "../../utils/MoneyFormatter";
import VisaIcon from "../../assets/icon/ic_visa.png";
import AmericanExpress from "../../assets/icon/ic_americanexpress.png";
import MasterIcon from "../../assets/icon/ic_master.png";
import "./styles.scss";
import { Link } from 'react-router-dom';

function Payment(props) {
    const { selectedDayRange, home, country, setCountry } = useContext(AppContext);
    const countryObject = COUNTRY_LIST.find(a => a.value === country);
    const night = getNightNumber(selectedDayRange);

    return (
        <>
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
                                <select class="form-select" aria-label="Choose payment method">
                                    <option value="vnpay" selected>VNPAY</option>
                                </select>
                            </div>
                            <div className="row justify-content-end m-2">
                                <Link to={"/checkout/payment"} className="text-center btn__main text-white rounded-2 p-3 px-2 mt-3 bx__shadow w-40">PAY NOW</Link>
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
                                <div className="row pt-2 pb-3">
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

export default Payment;