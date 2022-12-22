import DatePicker, { utils } from '@hassanmojab/react-modern-calendar-datepicker';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FreeMode, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { addToCart, getHotelDetails, getReservedDate, reportHotel } from '../../api/hotel.api';
import Pic1 from "../../assets/location/pic1.jpg";
import { AppContext } from '../../context/AppContext';
import { toastError, toastSuccess } from '../../services/ToastService';
import { deserializeDayToString, getDateRangeInPlainWithMonth, getNightNumber } from '../../utils/DateUtils';
import { Formatter } from '../../utils/MoneyFormatter';
import "./styles.scss";

function HomeDetails(props) {
    const { id } = useParams();
    const [shorten, setShorten] = useState(false);
    const [shortenAmenities, setShortenAmenities] = useState(false);
    const [shortenReviews, setShortenReviews] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showReport, setShowReport] = useState(false);

    const { selectedDayRange, home, setSelectedDayRange, showOverlay, setShowOverlay, onChangePeople, setAdultsValue, setChildValue } = useContext(AppContext);

    const [isError, setIsError] = useState(false);
    const [hotel, setHotel] = useState({
        images: []
        , info: ""
        , name: ""
        , owner: {}
        , place: {}
        , policy: ""
        , reviews: [],
        rooms: []
    });
    const [reservedDate, setReservedDate] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = (async () => {
            await getHotelDetails(id).then((res) => {
                const { data } = res;
                console.log(data);
                setHotel(data);
            }).catch((err) => {
                setIsError(true);
            });
            await getReservedDate(id).then((res) => {
                setReservedDate(res.data);
            });
            return;
        });
        return () => {
            fetchData();
        };
    }, []);

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

    const disabledDays = [];
    reservedDate && reservedDate.map((item) => {
        const { dateCheckin, dateCheckout } = item;

        const checkin = getDateInObject(dateCheckin);
        const checkout = getDateInObject(dateCheckout);
        const days = getNightNumber({ from: checkin, to: checkout });

        disabledDays.push(checkin);
        disabledDays.push(checkout);

        for (let i = 1; i <= days; i++) {
            const nextDate = new Date(checkin.year, checkin.month - 1, checkin.day + i);
            const nextDateInObject = { year: nextDate.getFullYear(), month: nextDate.getMonth(), day: nextDate.getDate() };
            disabledDays.push(nextDateInObject);
        }
    });

    const { images, info, name, owner, place, policy, reviews, rooms } = hotel;
    const numberOfPeople = rooms.length > 0 && rooms.reduce((a, b) => ({ children: a.children + b.children, adult: a.adult + b.adult }));
    const capacity = numberOfPeople && numberOfPeople.children + numberOfPeople.adult;

    let avgRating = 0;
    if (reviews.length > 0) {
        reviews.map((i) => avgRating += i.rate);
        avgRating = avgRating / reviews.length;
    }

    const renderCustomOnInput = ({ ref }) => (
        <div className="row" >
            <div className="input-group">
                <label htmlFor="input__date" className='m-2 mt-3'>
                    <i className='bx bx-calendar fs-180'></i>
                </label>
                <input
                    readOnly
                    ref={ref}
                    type="text"
                    className='form-control input__date c-default'
                    placeholder='Choose your day'
                    value={getDateRangeInPlainWithMonth(selectedDayRange)}
                    id="input__date"
                />
            </div>
        </div>
    )

    function scrollToId(id) {
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth'
        });
    }

    function showAllReview(id, content) {
        document.getElementById(id).innerHTML = content;
        document.getElementById("show__" + id).style.display = "none";
    }

    function disableScrollbar() {
        document.body.style.overflow = "hidden";
    }

    function enableScrollbar() {
        document.body.style.overflow = "auto";
    }

    var pricePernight = rooms[0]?.price;
    var price = pricePernight * getNightNumber(selectedDayRange);
    var fee = (price * 10) / 100;
    var priceBeforeTaxes = price + fee;

    var shortDescription = info.substring(0, info.lastIndexOf(" ", 100));

    var amenities = [];
    if (rooms.length > 0) {
        amenities = [...hotel.rooms[0].roomFacilities];
    }
    var policies = [policy];

    const [showNav, setShowNav] = useState(false);
    window.addEventListener("scroll", (event) => {
        let scroll = window.scrollY;
        if (scroll > 600) {
            if (!showNav)
                setShowNav(true);
        } else {
            setShowNav(false);
        }
    });

    const [reportReason, setReportReason] = useState("");
    function onChangeReason(e) {
        console.log(e.target.value);
        setReportReason(e.target.value);
    }

    function onSubmitReason() {
        const data = {
            content: reportReason,
            username: "anonymous",
            status: 3
        };

        reportHotel(data).then((res) => {
            if (res.status === 200) {
                setShowReport(false);
                enableScrollbar();
                toastSuccess("Reported successfully");
            }
        }).catch((err) => {
            toastError("Reported failed");
        })

    }

    function onAddToCart() {
        const data = {
            hotelId: Number(id),
            sessionId: sessionStorage.getItem("sessionId") !== null ? sessionStorage.getItem("sessionId") : "",
            fromDate: deserializeDayToString(selectedDayRange.from),
            toDate: deserializeDayToString(selectedDayRange.to),
            adult: home.adults,
            children: home.child
        };
        addToCart(data)
            .then((res) => {
                if (res.status === 200) {
                    toastSuccess("Added to cart successfully");
                    sessionStorage.setItem("sessionId", res.data);
                }
            })
            .catch(function (err) {
                toastError(err.response.data);
            })
    }
    function onReserveDirectly() {
        const array = [];
        array.push({
            hotel: hotel,
            adult: home.adults,
            children: home.child,
            from: deserializeDayToString(selectedDayRange.from),
            to: deserializeDayToString(selectedDayRange.to),
        });
        sessionStorage.setItem("chosenItem", JSON.stringify(array));
    }

    return (
        <>
            {isError === true && <Navigate to="/" exact />}
            <nav className={`navbar navbar-expand-lg position-sticky top-0 bg-white  border-bottom border-dark ${(!showNav || showContact || showReport) ? "" : "z-200"} ${(!showNav) ? "d-none" : ""}`}>
                <div className="container">
                    <ul className="navbar-nav p-3 mt-0">
                        <div className="row fw-semibold">
                            <li className="nav-item col-3">
                                <a className="nav-link" onClick={() => scrollToId("photos")}>Photos</a>
                            </li>
                            <li className="nav-item col-3">
                                <a className="nav-link" onClick={() => scrollToId("amenities")}>Amenities</a>
                            </li>
                            <li className="nav-item col-3">
                                <a className="nav-link" onClick={() => scrollToId("reviews")}>Reviews</a>
                            </li>
                            <li className="nav-item col-3">
                                <a className="nav-link" onClick={() => scrollToId("policies")}>Policies</a>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
            <div className={`container mt-5`}>
                <div className="row">
                    <div className="row">
                        <h2 className='fw-semibold'>{name}</h2>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 col-md-1"><i className='bx bxs-star'></i> <span className="fw-semibold">{avgRating}</span></div>
                        <div className="col-sm-8 col-md-4">
                            <a className='text-decoration-underline text-black fw-semibold pr-20' onClick={() => scrollToId("reviews")}>{reviews.length} reviews</a>
                            <a className='text-decoration-underline text-black fw-semibold'>{place.province}</a>
                        </div>
                    </div>
                    <div className="row mt-3" id='photos'>
                        <div className="mobile__show slide__show__mobile" >
                            <Swiper
                                navigation={true}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                    type: "fraction"
                                }}
                                slidesPerView={1}
                                freeMode={true}
                                modules={[Navigation, Pagination, FreeMode]} className="mobile__show">
                                {
                                    images.map((item, index) =>
                                        <SwiperSlide key={index}>
                                            <div className="row d-flex justify-content-center">
                                                <img src={item.image} alt="" className='w-75 overlay__img' onClick={() => { setShowOverlay(true); disableScrollbar(); }} />
                                            </div>
                                        </SwiperSlide>)
                                }
                            </Swiper>
                        </div>
                        <div className="col-md-6">
                            <img src={images.length > 0 ? images[0]?.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt="" className='w-100 rounded-start hide__mobile c-pointer mh-415' onClick={() => { setShowOverlay(true); disableScrollbar(); }} />
                        </div>
                        <div className="col-md-6">
                            <div className="row pb-3">
                                <div className="col-md-6">
                                    <img src={images.length > 0 ? images[1]?.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt="" className='w-100 hide__mobile c-pointer mh-200' onClick={() => { setShowOverlay(true); disableScrollbar(); }} />
                                </div>
                                <div className="col-md-6">
                                    <img src={images.length > 0 ? images[2]?.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt="" className='w-100 rounded-end hide__mobile c-pointer mh-200' onClick={() => { setShowOverlay(true); disableScrollbar(); }} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={images.length > 0 ? images[3]?.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt="" className='w-100 hide__mobile c-pointer mh-200' onClick={() => { setShowOverlay(true); disableScrollbar(); }} />
                                </div>
                                <div className="col-md-6">
                                    <img src={images.length > 0 ? images[4]?.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt="" className='w-100 rounded-end hide__mobile c-pointer mh-200' onClick={() => { setShowOverlay(true); disableScrollbar(); }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-8 col-sm-12">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="row">
                                        <h5 className="fw-semibold">
                                            Homestay hosted by {owner.name}
                                        </h5>
                                        <p>{capacity} guests</p>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <img src={Pic1} alt="" className="rounded-circle avatar" />
                                </div>
                            </div>

                            {/* divider component */}
                            <div className="border-bottom w-95 p-2"></div>
                            <div className="row mt-4">
                                <div className="row">
                                    <div className="col-1"><i className='bx bx-like fs-180'></i></div>
                                    <div className="col-11">
                                        <p className="fw-semibold m-0">Great location</p>
                                        <p>90% of recent guests gave the location a 5-star rating.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1"><i className='bx bx-like fs-180'></i></div>
                                    <div className="col-11">
                                        <p className="fw-semibold m-0">Preventative equipment</p>
                                        <p>Free hand sanitizer and face masks</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1"><i className='bx bx-door-open fs-180'></i></div>
                                    <div className="col-11">
                                        <p className="fw-semibold m-0">Self check-in</p>
                                        <p>Check yourself in with the keypad.</p>
                                    </div>
                                </div>
                            </div>
                            {/* end divider component */}
                            {/* divider component */}
                            <div className="border-bottom w-95 p-2"></div>
                            <div className="row mt-4 p-3">
                                {shorten ? info : shortDescription + "..."}
                                <p className={`text-decoration-underline text-black fw-semibold p-0 mt-3 c-pointer ${shorten && "d-none"}`} onClick={() => setShorten(true)}>Show more</p>
                            </div>

                            {/* end divider component */}
                            {/* divider component */}
                            <div className="border-bottom w-95 p-2"></div>
                            <div className="row mt-4 p-3" id='amenities'>
                                <h3 className='fw-semibold mb-4'>What this place offers</h3>
                                {amenities.length > 0 ? amenities.slice(0, 10).map((item, index) => (
                                    <div className="col-6" key={index}>
                                        <div className="row">
                                            <div className="col-1"><i className='bx bx-like fs-180'></i></div>
                                            <div className="col-11">
                                                <p className="fw-semibold p-1">{item.facility.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : <p>Oops not found anything here</p>}
                                {
                                    (amenities && shortenAmenities) && amenities.slice(10, amenities.length).map((item, index) => (
                                        <div className="col-6" key={index}>
                                            <div className="row">
                                                <div className="col-1"><i className='bx bx-like fs-180'></i></div>
                                                <div className="col-11">
                                                    <p className="fw-semibold p-1">{item.facility.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                {amenities.length > 10 &&
                                    <div className="col mt-3">
                                        <button className={`btn border border-dark fw-semibold p-3 btn__shorten ${shortenAmenities && "d-none"}`} onClick={() => setShortenAmenities(true)}>Show all {amenities.length} amenities</button>
                                    </div>
                                }
                            </div>
                            {/* end divider component */}
                            {/* divider component */}
                            <div className="border-bottom w-95 p-2"></div>
                            <div className="row mt-4 p-3" id='policies'>
                                <h3 className='fw-semibold mb-4'>Property policies</h3>
                                {policies.map((item, index) => (
                                    <p key={index}> {item}</p>
                                ))}
                            </div>
                            {/* end divider component */}
                        </div>
                        {/* box reserve */}
                        <div className="col-md-4 col-sm-12 bx__shadow-1 rounded-2 mh-600">
                            <div className="row p-3 pt-4">
                                <div className="col-6">
                                    <h5 className='fw-semibold'>{Formatter.format(pricePernight)} <span className='fw-normal fs-6'>night</span></h5>
                                </div>
                                <div className="col-6 text-end">
                                    <p>
                                        <i className='bx bxs-star'></i> <span className='mr-15'>{avgRating}</span>
                                        <a href="#review" className='text-decoration-underline text-muted'> {reviews.length > 0 ? reviews.length : 0} reviews</a>
                                    </p>
                                </div>
                            </div>
                            <div className="row p-3 pt-0">
                                <div className="col-12 border border-dark rounded-top g-0">
                                    <div className="row">
                                        <DatePicker
                                            value={selectedDayRange}
                                            onChange={setSelectedDayRange}
                                            inputPlaceholder="Select a day range"
                                            minimumDate={utils().getToday()}
                                            shouldHighlightWeekends
                                            renderInput={renderCustomOnInput}
                                            disabledDays={disabledDays}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 border border-dark rounded-bottom g-0">
                                    <div className="row">
                                        <div className="col-1">
                                            <i className='bx bx-user fs-180 m-2 mt-3'></i>
                                        </div>
                                        <div className="col-11 mt-2">
                                            <div className="dropdown w-100">
                                                <div className="row m-1">
                                                    {home.adults} adult{home.adults > 1 && "s"} {home.child > 0 && `,${home.child} children${home.child > 1 ? "s" : ""}`} <br />
                                                    {home.room} room{home.room > 1 && "s"}
                                                </div>
                                                <div className="dropdown-content">
                                                    <div className="row">
                                                        <div className="col-4 mt-2">
                                                            <p className='fw-bold'>Adults</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <button className='btn' onClick={() => setAdultsValue(home.adults - 1)}>-</button>
                                                        </div>
                                                        <div className="col-4">
                                                            <input type="number" value={home.adults} className="form-control input__people" onChange={onChangePeople} name="adults" min={"1"} max={"36"} />
                                                        </div>
                                                        <div className="col-2">
                                                            <button className='btn' onClick={() => setAdultsValue(home.adults + 1)}>+</button>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-4 mt-2">
                                                            <p className='fw-bold'>Children</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <button className='btn' onClick={() => setChildValue(home.child - 1)}>-</button>
                                                        </div>
                                                        <div className="col-4">
                                                            <input type="number" value={home.child} className="form-control input__people" onChange={onChangePeople} name="child" min={"0"} max={"9"} />
                                                        </div>
                                                        <div className="col-2">
                                                            <button className='btn' onClick={() => setChildValue(home.child + 1)}>+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3">
                                <Link to="/checkout" className="btn btn__reserve text-white fw-semibold p-3" onClick={onReserveDirectly}>Reserve</Link>
                                <button className="btn btn__add__cart fw-semibold p-3 mt-4" onClick={onAddToCart}>Add to cart</button>
                            </div>
                            <div className="row p-3">
                                <div className="col">
                                    <p className='text-decoration-underline'>{getNightNumber(selectedDayRange)} night x {Formatter.format(pricePernight)}</p>
                                    <p className='text-decoration-underline'>Fee</p>
                                </div>
                                <div className="col text-end">
                                    <p>{Formatter.format(price)}</p>
                                    <p>{Formatter.format(fee)}</p>
                                </div>
                            </div>
                            <div className="row m-3 mt-0 border-top border-dark"></div>
                            <div className="row p-3 pb-2">
                                <div className="col">
                                    <p className="fw-semibold">Total before taxes</p>
                                </div>
                                <div className="col text-end">
                                    <p className='fw-semibold'>{Formatter.format(priceBeforeTaxes)}</p>
                                </div>
                            </div>
                            <div className="row p-3 pt-5">
                                <div className="col-1">
                                    <i className='bx bxs-flag-alt text-muted'></i>
                                </div>
                                <div className="col-11">
                                    <p className='fw-semibold text-decoration-underline text-muted c-pointer' onClick={() => { setShowReport(true); disableScrollbar(); }}>Report this listing</p>
                                </div>
                            </div>
                        </div>
                        {/* divider component */}
                        <div className="border-bottom w-95 p-2"></div>
                        <div className="row mt-4 p-3" id='reviews'>
                            <h3 className='fw-semibold mb-4'><i className='bx bxs-star'></i> {avgRating}, {reviews.length} Reviews</h3>

                            <div className="row gx-5">
                                {!shortenReviews ? reviews.slice(0, 6).map((item, index) => (
                                    <div className="col-6" key={index}>
                                        <div className="row">
                                            <div className="col-1">
                                                <img src={"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" className='mini__avatar rounded-circle' />
                                            </div>
                                            <div className="col-11">
                                                <p className="fw-semibold m-0">{item.username}</p>
                                                <p className='text-muted'>Anonymous User</p>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <p className='m-0' id={index}>
                                                {item.content.length > 100 ? item.content.slice(0, 100) + "...." : item.content}
                                            </p>
                                            {item.content.length > 100 &&
                                                <p className={`text-decoration-underline text-black fw-semibold mt-2 c-pointer`} onClick={() => showAllReview(index, item.content)} id={`show__${index}`}>Show more</p>
                                            }
                                        </div>
                                    </div>
                                ))
                                    : reviews.map((item, index) => (
                                        <div className="col-6" key={index}>
                                            <div className="row">
                                                <div className="col-1">
                                                    <img src={"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" className='mini__avatar rounded-circle' />
                                                </div>
                                                <div className="col-11">
                                                    <p className="fw-semibold m-0">{item.username}</p>
                                                    <p className='text-muted'>2022</p>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <p className='m-0' id={index}>
                                                    {item.content.length > 100 ? item.content.slice(0, 100) + "...." : item.content}
                                                </p>
                                                {item.content.length > 100 &&
                                                    <p className={`text-decoration-underline text-black fw-semibold mt-2 c-pointer`} onClick={() => showAllReview(index, item.content)} id={`show__${index}`}>Show more</p>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                                {reviews.length > 6 &&
                                    <div className="col mt-3">
                                        <button className={`btn border border-dark fw-semibold p-3 btn__shorten ${shortenReviews && "d-none"}`} onClick={() => setShortenReviews(true)}>Show all {reviews.length} reviews</button>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* end divider component */}
                        <div className="border-bottom w-95 p-2"></div>
                        <div className="row mt-4">
                            <div className="row">
                                <div className="col-1">
                                    <img src={"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" className="rounded-circle avatar" />
                                </div>
                                <div className="col-11">
                                    <p className="fw-semibold">Hosted By {owner.name}</p>
                                    <p>Joined in November 2022</p>
                                </div>
                            </div>
                            <div className="row">
                                <p className='pb-2'>
                                    <i className='bx bxs-star'></i> {reviews.length} Reviews
                                </p>
                                <p>Response rate : 100%</p>
                                <p>Response time : within hour</p>
                                <div className="col">
                                    <button className={`btn border border-dark fw-semibold p-3 btn__shorten`} onClick={() => { setShowContact(true); disableScrollbar(); }}>Contact Host</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* slideshow overlay */}
            <div className={`contact__overlay ${showContact === true ? "show" : "hide"}`}>
                <div className="text-white">
                    <div className="p-3 c-pointer" onClick={() => { setShowContact(false); enableScrollbar(); }}>
                        <i className='bx bx-x fs-x3'></i>
                    </div>
                    <div className="position-relative ">
                        <div className="position-absolute top-50 start-50 translate-middle bg-light text-dark w-50 rounded-1 text-start mt-5">
                            <div className="row p-4">
                                <h4 className="fw-semibold">Host Information</h4>
                                {/* <a href='mailto:gotrip@gmail.com' className='text-black fs-5'><i className='bx bx-envelope'></i> gotrip@gmail.com</a> */}
                                <a href={`tel:${owner.phone}`} className='text-black fs-5'><i className='bx bx-phone'></i> {owner.phone}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* slideshow overlay */}
            <div className={`contact__overlay ${showReport === true ? "show" : "hide"}`}>
                <div className="text-white">
                    <div className="p-3 c-pointer" onClick={() => { setShowReport(false); enableScrollbar(); }}>
                        <i className='bx bx-x fs-x3'></i>
                    </div>
                    <div className="position-relative">
                        <div className="position-absolute top-50 left-25 bg-light text-dark w-50 rounded-1 text-start mt-5">
                            <div className="row p-4">
                                <h4 className="fw-semibold">Why are you reporting this listing?</h4>
                                <p>This won’t be shared with the Host.</p>
                                <div className="p-3 border-bottom w-95">
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-check-label w-100" htmlFor="incorrect">
                                                It’s inaccurate or incorrect
                                            </label>
                                        </div>
                                        <div className="col">
                                            <div className="text-end">
                                                <input className="form-check-input" onChange={onChangeReason} value="incorrect" type="radio" name="reason" id="incorrect" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 border-bottom w-95">
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-check-label w-100" htmlFor="real-place">
                                                It’s not a real place to stay
                                            </label>
                                        </div>
                                        <div className="col">
                                            <div className="text-end">
                                                <input className="form-check-input" onChange={onChangeReason} value="fake-place" type="radio" name="reason" id="real-place" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 border-bottom w-95">
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-check-label w-100" htmlFor="scam">
                                                It’s a scam
                                            </label>
                                        </div>
                                        <div className="col">
                                            <div className="text-end">
                                                <input className="form-check-input" onChange={onChangeReason} value="scam" type="radio" name="reason" id="scam" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 border-bottom w-95">
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-check-label w-100" htmlFor="offensive">
                                                It’s offensive
                                            </label>
                                        </div>
                                        <div className="col">
                                            <div className="text-end">
                                                <input className="form-check-input" onChange={onChangeReason} value="offensive" type="radio" name="reason" id="offensive" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`p-3 w-95 ${reportReason === "something" ? "" : "border-bottom"}`} >
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-check-label w-100" htmlFor="something">
                                                It’s something else
                                            </label>
                                        </div>
                                        <div className="col">
                                            <div className="text-end">
                                                <input className="form-check-input" onChange={onChangeReason} value="something" type="radio" name="reason" id="something" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`p-3 w-95 ${reportReason === "something" ? "" : ""}`}>
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Leave your reason here" id="another__reason" name='another__reason' onChange={onChangeReason}></textarea>
                                        <label htmlFor="another__reason">Comments</label>
                                    </div>
                                </div>
                                <div className="p-3 w-95">
                                    <div className="text-end">
                                        <button className='btn btn-dark' onClick={onSubmitReason}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* slideshow overlay */}
            <div className={`overlay ${showOverlay === true ? "show" : "hide"}`}>
                <div className="text-white">
                    <div className="p-3 c-pointer" onClick={() => { setShowOverlay(false); enableScrollbar(); }}>
                        <i className='bx bx-x fs-x3'></i>
                    </div>
                    <Swiper
                        navigation={true}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                            type: "fraction"
                        }}
                        slidesPerView={1}
                        freeMode={true}
                        modules={[Navigation, Pagination, FreeMode]} className="w-75">
                        {
                            images.map((item, index) =>
                                <SwiperSlide key={index}>
                                    <div className="row d-flex justify-content-center">
                                        <img src={item.image} alt="" className='w-100 overlay__img' />
                                    </div>
                                </SwiperSlide>)
                        }
                    </Swiper>
                </div>
            </div>
            {images.length > 0 &&
                <div className="text-end">
                    <div className="btn">
                        <button className='btn__show__all fw-semibold z-2' type="button" onClick={() => { setShowOverlay(true); disableScrollbar(); }}><i className='bx bxs-grid'></i> Show all photos</button>
                    </div>
                </div>
            }
        </>
    );
}

export default HomeDetails;