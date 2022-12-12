import React from 'react';
import { useState } from 'react';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import { COUNTRY_LIST } from '../../utils/CountryList';
import "./styles.scss";

function Checkout(props) {
    const [country, setCountry] = useState("");
    const countryObject = COUNTRY_LIST.find(a => a.value === country);

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
            <div className="container mt-5">
                <div className="row w-100 gy-2">
                    <div className="col-md-7 bx__shadow m-1 rounded-1">
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
                                <div className="input-group">
                                    <SelectSearch options={COUNTRY_LIST} value={country} onChange={setCountry} name="country" placeholder="Choose your country" search />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 g-2">
                            <div className="col">
                                <label htmlFor="first__name">First name</label>
                                <div className="input-group">
                                    <input type="text" className="form-control p-2" id='first__name' placeholder='First name' name='first__name' />
                                </div>
                            </div>
                            <div className="col">
                                <label htmlFor="first__name">Last name</label>
                                <div className="input-group">
                                    <input type="text" className="form-control p-2" id='first__name' placeholder='First name' name='first__name' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 bx__shadow m-1 rounded-1">
                        b
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;