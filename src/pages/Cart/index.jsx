import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart } from '../../api/hotel.api';
import { AppContext } from "../../context/AppContext";
import { getDateRangeInPlainWithMonth, getNightNumber } from '../../utils/DateUtils';
import { Formatter } from '../../utils/MoneyFormatter';
import "./styles.scss";

function Cart(props) {
    const { selectedDayRange, home } = useContext(AppContext);

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const sessionId = sessionStorage.getItem("sessionId");
            await getCart(sessionId).then((res) => {
                const { data } = res;
                // console.log(data);
                let deserializedArray = [];
                Object.values(data).map((item) => deserializedArray.push(item))
                setCartItems(deserializedArray);
            });
            return;
        };
        return () => {
            fetchData();
        }
    }, [])

    console.log("cart items", cartItems);

    const [chosenItem, setChosenItem] = useState([]);

    function onChangeCartItems(e) {
        var checked = e.target.checked;
        var value = e.target.value;

        if (checked) {
            setChosenItem([
                ...chosenItem,
                cartItems[value]
            ]);
        } else {
            setChosenItem(
                chosenItem.filter((item) => item !== cartItems[value])
            );
        }
    }

    console.log("chosen ", chosenItem);

    var totalPrice = 0;
    if (chosenItem.length > 0) {
        chosenItem.map((item) => totalPrice += item.hotel.rooms[0].price);
    }

    var fee = totalPrice * 0.1;
    var total = totalPrice + fee;

    function setChosenToSession() {
        sessionStorage.setItem("chosenItem", JSON.stringify(chosenItem));
    }

    const Button = () => {
        if (chosenItem.length > 0) {
            return (
                <Link to={"/checkout"} role={"button"} className={`btn btn__next border-0 text-white btn__next-active bx__shadow`} onClick={setChosenToSession}>Next</Link>
            );
        } else {
            return (
                <button className={`btn btn__next border-0 text-white bg-disabled`} disabled>Next</button>
            );
        }
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
            re.push(<i className='bx bxs-star' key={i}></i>);
        }
        return re;
    }

    function getCapacity(rooms) {
        if (rooms.length === 0) return 0;
        const numberOfPeople = rooms.length > 0 && rooms.reduce((a, b) => ({ children: a.children + b.children, adult: a.adult + b.adult }));
        const capacity = numberOfPeople && numberOfPeople.children + numberOfPeople.adult;
        return capacity;
    }

    function onDeleteItem(e) {

    }

    return (
        <>
            <div className="bg-cart">
                <div className="container p-5 bg-cart">
                    <div className="row w-100 g-0">
                        <div className="col-md-9 col-sm-12 pr-3r">
                            <div className="row border rounded-1 bg-white">
                                <h4 className='p-3'>Your cart ({cartItems.length})</h4>
                            </div>
                            {cartItems.map((item, index) => (
                                <div className="row border border-black rounded-1 bg-white mt-3" key={index}>
                                    <div className="row">
                                        <div className="col-1 p-4">
                                            <img src={item.hotel.images[0].image} alt="" width={68} className="rounded-1" />
                                        </div>
                                        <div className="col-11">
                                            <div className="row m-2">
                                                <div className="col p-3 pb-1">
                                                    <Link to={"/home/details/1"} className="text-black">{item.hotel.name}</Link>
                                                    <div className='text-warning'>
                                                        {getRatingElements(item.hotel.reviews)}

                                                        <span className='text-muted m-2'>
                                                            <i className='bx bxs-location-plus m-1'></i>
                                                            {item.hotel.place.province}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col text-end p-3">
                                                    <i className='bx bx-trash fs-180 c-pointer'></i>
                                                </div>
                                            </div>
                                            <div className="row m-2 mt-0">
                                                <div className="col">
                                                    <span className='bg-primary text-white p-2 rounded-1 fw-semibold'>{getAvgRating(item.hotel.reviews)}</span>
                                                    <span className='text-primary fw-semibold m-2'>{getAvgRating(item.hotel.reviews) > 4 ? "Excellent" : "Good"}</span>
                                                    <span className='text-muted'>{item.hotel.reviews.length} review{item.hotel.reviews.length > 1 && "s"}</span>
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
                                                            <input className="form-check-input mt-0" type="checkbox" name="cart__item" value={index} id={`${index}`} onChange={onChangeCartItems} />
                                                        </div>
                                                        <div className="col-11 p-0">
                                                            <label htmlFor={`${index}`}>{getCapacity(item.hotel.rooms)} room</label>
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
                                                        <p className="m-0 fs-price">{Formatter.format(item.hotel.rooms[0].price + (item.hotel.rooms[0].price * 0.1))}</p>
                                                        <p className="text-muted fs-note">Includes taxes & fees</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <div className="row border bg-white rounded-1 p-2">
                                <div className="col">Total price</div>
                                <div className="col text-end text-danger">{Formatter.format(total)}</div>
                                <div className="row">
                                    <p className="text-muted">{chosenItem.length > 0 ? chosenItem.length + ` item${chosenItem.length > 1 ? "s" : ""}, including taxes & fees` : "No items selected yet"}</p>
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