import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";
import { dateRangeToString, getDateRangeInPlainWithMonth, getNightNumber } from '../../utils/DateUtils';
import { Formatter } from '../../utils/MoneyFormatter';
import $ from "jquery";
import "./styles.scss";

function Cart(props) {
    const { selectedDayRange, home } = useContext(AppContext);

    const [cartItems, setCartItems] = useState([]);
    // sample data
    var pricePernight = 1234567;
    var price = pricePernight * getNightNumber(selectedDayRange);
    var fee = 999999;
    var priceItem1 = price + fee;


    function onChangeCartItems(e) {
        var checked = e.target.checked;
        var value = e.target.value;
        if (checked) {
            setCartItems([
                ...cartItems,
                value
            ]);
        } else {
            setCartItems(
                cartItems.filter((item) => item !== value)
            );
        }
    }

    var totalPrice = 0;
    if (cartItems.length > 0) {
        totalPrice = cartItems.reduce((a, b) => Number(a) + Number(b));
        console.log(totalPrice);
    } else {
        totalPrice = 0;
        console.log(totalPrice);
    }

    const Button = () => {
        if (cartItems.length > 0) {
            return (
                <Link to={"/checkout"} role={"button"} className={`btn btn__next border-0 text-white btn__next-active bx__shadow`}>Next</Link>
            );
        } else {
            return (
                <button className={`btn btn__next border-0 text-white bg-disabled`} disabled>Next</button>
            );
        }
    }

    return (
        <>
            {/* container d-flex mt-5 gx-5 w-75 */}
            <div className="bg-cart">
                <div className="container p-5 bg-cart">
                    <div className="row w-100 g-0">
                        <div className="col-md-9 col-sm-12 pr-3r">
                            <div className="row border rounded-1 bg-white">
                                <h4 className='p-3'>Your cart (2)</h4>
                            </div>
                            <div className="row border border-black rounded-1 bg-white mt-3">
                                <div className="row">
                                    <div className="col-1 p-4">
                                        <img src="https://picsum.photos/150/150" alt="" width={68} className="rounded-1" />
                                    </div>
                                    <div className="col-11">
                                        <div className="row m-2">
                                            <div className="col p-3 pb-1">
                                                <Link to={"/home/details/1"} className="text-black">Somerset Ho Chi Minh City</Link>
                                                <div className='text-warning'>
                                                    <i className='bx bxs-star'></i>
                                                    <i className='bx bxs-star'></i>
                                                    <i className='bx bxs-star'></i>
                                                    <i className='bx bxs-star'></i>
                                                    <i className='bx bxs-star'></i>
                                                    <span className='text-muted m-2'>
                                                        <i className='bx bxs-location-plus m-1'></i>
                                                        Ho Chi Minh City
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col text-end p-3">
                                                <i className='bx bx-trash fs-180 c-pointer'></i>
                                            </div>
                                        </div>
                                        <div className="row m-2 mt-0">
                                            <div className="col">
                                                <span className='bg-primary text-white p-2 rounded-1 fw-semibold'>10</span>
                                                <span className='text-primary fw-semibold m-2'>Excellent</span>
                                                <span className='text-muted'>32 reviews</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row border-top g-0 mt-4">
                                    <div className="p-3 pb-0">
                                        <div className="row">
                                            <div className="col">
                                                <div className="row text-primary">
                                                    <div className="col-1 mt-1">
                                                        <input className="form-check-input mt-0" type="checkbox" name="cart__item" value={1} id="1" onChange={onChangeCartItems} />
                                                    </div>
                                                    <div className="col-11 p-0">
                                                        <label htmlFor="1">1 room</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <p className="text-muted">
                                                        {getDateRangeInPlainWithMonth(selectedDayRange)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col text-end">
                                                <div className="row">
                                                    <p className="m-0 fs-price">{Formatter.format(priceItem1)}</p>
                                                    <p className="text-muted fs-note">Includes taxes & fees</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border border-black rounded-1 bg-white mt-3">
                                <div className="row">
                                    <div className="col-1 p-4">
                                        <img src="https://picsum.photos/151/150" alt="" width={68} className="rounded-1" />
                                    </div>
                                    <div className="col-11">
                                        <div className="row m-2">
                                            <div className="col p-3 pb-1">
                                                <Link to={"/home/details/1"} className="text-black">Somerset Ho Chi Minh City1</Link>
                                                <div className='text-warning'>
                                                    <i className='bx bxs-star'></i>
                                                    <i className='bx bxs-star'></i>
                                                    <i className='bx bxs-star'></i>
                                                    <i className='bx bxs-star'></i>
                                                    <i className='bx bxs-star'></i>
                                                    <span className='text-muted m-2'>
                                                        <i className='bx bxs-location-plus m-1'></i>
                                                        Ho Chi Minh City
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col text-end p-3">
                                                <i className='bx bx-trash fs-180 c-pointer'></i>
                                            </div>
                                        </div>
                                        <div className="row m-2 mt-0">
                                            <div className="col">
                                                <span className='bg-primary text-white p-2 rounded-1 fw-semibold'>9.5</span>
                                                <span className='text-primary fw-semibold m-2'>Excellent</span>
                                                <span className='text-muted'>32 reviews</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row border-top g-0 mt-4">
                                    <div className="p-3 pb-0">
                                        <div className="row">
                                            <div className="col">
                                                <div className="row text-primary">
                                                    <div className="col-1 mt-1">
                                                        <input className="form-check-input mt-0" type="checkbox" name="cart__item" value={2} id="2" onChange={onChangeCartItems} />
                                                    </div>
                                                    <div className="col-11 p-0">
                                                        <label htmlFor="2">2 room</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <p className="text-muted">
                                                        {getDateRangeInPlainWithMonth(selectedDayRange)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col text-end">
                                                <div className="row">
                                                    <p className="m-0 fs-price">{Formatter.format(priceItem1)}</p>
                                                    <p className="text-muted fs-note">Includes taxes & fees</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <div className="row border bg-white rounded-1 p-2">
                                <div className="col">Total price</div>
                                <div className="col text-end text-danger">{Formatter.format(totalPrice)}</div>
                                <div className="row">
                                    <p className="text-muted">{cartItems.length > 0 ? cartItems.length + ` item${cartItems.length > 1 ? "s" : ""}, including taxes & fees` : "No items selected yet"}</p>
                                </div>
                                <div className="row gx-1">
                                    <Button />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;