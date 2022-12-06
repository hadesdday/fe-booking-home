import DatePicker, { utils } from '@hassanmojab/react-modern-calendar-datepicker';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { FreeMode, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "../../assets/home1.png";
import Pic1 from "../../assets/location/pic1.jpg";
import Pic2 from "../../assets/location/pic2.jpg";
import Pic3 from "../../assets/location/pic3.jpg";
import Pic4 from "../../assets/location/pic4.jpg";
import Pic5 from "../../assets/location/pic5.jpeg";
import Pic6 from "../../assets/location/pic6.jpg";
import Pic7 from "../../assets/location/pic7.jpg";
import Pic8 from "../../assets/location/pic8.jpg";
import Pic9 from "../../assets/location/pic9.png";
import { AppContext } from '../../context/AppContext';
import { Formatter } from '../../utils/MoneyFormatter';
import "./styles.scss";

function HomeDetails(props) {
    const { id } = useParams();

    const [shorten, setShorten] = useState(false);
    const [shortenAmenities, setShortenAmenities] = useState(false);

    const { selectedDayRange, home, setSelectedDayRange, setHome, showOverlay, setShowOverlay } = useContext(AppContext);

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
                    value={getDateRangeInString(selectedDayRange)}
                    id="input__date"
                />
            </div>
        </div>
    )

    function getNightNumber(input) {
        if (input.from && input.to) {
            const { from, to } = input;
            const fromString = from.month + "/" + from.day + "/" + from.year;
            const toString = to.month + "/" + to.day + "/" + to.year;
            const date1 = new Date(fromString);
            const date2 = new Date(toString);
            const diffTime = Math.abs(date2 - date1);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays < 1) diffDays = 1;
            return diffDays;
        } else {
            return 1;
        }
    }

    function getDateRangeInString(input) {
        if (input.from && input.to) {
            const { from, to } = input;
            const fromString = from.year + "/" + from.month + "/" + from.day;
            const toString = to.year + "/" + to.month + "/" + to.day;
            return fromString + " - " + toString;
        } else {
            return "";
        }
    }

    function onChangePeople(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        if (value < 0) {
            if (name === "child") {
                value = 0;
            } else {
                value = 1;
            }
        }

        setHome((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function setRoomValue(value) {
        if (value < 1) {
            value = 1;
        }
        setHome((prev) => {
            return {
                ...prev,
                "room": value
            }
        })
    }

    function setAdultsValue(value) {
        if (value < 1) {
            value = 1;
        }
        setHome((prev) => {
            return {
                ...prev,
                "adults": value
            }
        })
    }

    function setChildValue(value) {
        if (value < 0) {
            value = 0;
        }
        setHome((prev) => {
            return {
                ...prev,
                "child": value
            }
        })
    }

    //this is sample data if db have data fetch from database
    var pricePernight = 1234567;
    var price = pricePernight * getNightNumber(selectedDayRange);
    var fee = 999999;
    var priceBeforeTaxes = price + fee;

    var description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem a at possimus minima quis? Obcaecati consequatur accusantium natus reprehenderit cum repellendus vero! Id, repellat accusantium! Doloremque, sunt placeat! Architecto, eveniet!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem a at possimus minima quis? Obcaecati consequatur accusantium natus reprehenderit cum repellendus vero! Id, repellat accusantium! Doloremque, sunt placeat! Architecto, eveniet";

    var shortDescription = description.substring(0, description.lastIndexOf(" ", 100));

    var amenities = ["Kitchen", "Wifi", "Dedicated workspace", "Free street parking", "Washer", "Air conditioning", "Refrigerator", "Long term stays allowed",
        "Coffee maker", "Heating", "Private entrance", "Long term stays allowed", "Hangers", "Smoke alarm"];

    var locationArr = [];

    locationArr.push(Pic1);
    locationArr.push(Pic2);
    locationArr.push(Pic3);
    locationArr.push(Pic4);
    locationArr.push(Pic5);
    locationArr.push(Pic6);
    locationArr.push(Pic7);
    locationArr.push(Pic8);
    locationArr.push(Pic9);

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="row">
                        <h2 className='fw-semibold'>Biệt thự sang trọng Sunset 3BR  có lối vào BÃI BIỂN</h2>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 col-md-1"><i className='bx bxs-star'></i> <span className="fw-semibold">4,88</span></div>
                        <div className="col-sm-8 col-md-4">
                            <a href="#review" className='text-decoration-underline text-black fw-semibold pr-20'>78 reviews</a>
                            <a href="#location" className='text-decoration-underline text-black fw-semibold'>Phu Quoc</a>
                        </div>
                    </div>
                    <div className="row mt-3">
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
                                    locationArr.map((item, index) =>
                                        <SwiperSlide key={index}>
                                            <div className="row d-flex justify-content-center">
                                                <img src={item} alt="" className='w-75 overlay__img' onClick={() => setShowOverlay(true)} />
                                            </div>
                                        </SwiperSlide>)
                                }
                            </Swiper>
                        </div>
                        <div className="col-md-6">
                            <img src={Image} alt="" className='w-100 rounded-start hide__mobile c-pointer' onClick={() => setShowOverlay(true)} />
                        </div>
                        <div className="col-md-6">
                            <div className="row pb-3">
                                <div className="col-md-6">
                                    <img src={Image} alt="" className='w-100 hide__mobile c-pointer' onClick={() => setShowOverlay(true)} />
                                </div>
                                <div className="col-md-6">
                                    <img src={Image} alt="" className='w-100 rounded-end hide__mobile c-pointer' onClick={() => setShowOverlay(true)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={Image} alt="" className='w-100 hide__mobile c-pointer' onClick={() => setShowOverlay(true)} />
                                </div>
                                <div className="col-md-6">
                                    <img src={Image} alt="" className='w-100 rounded-end hide__mobile c-pointer' onClick={() => setShowOverlay(true)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="row">
                                        <h5 className="fw-semibold">
                                            Homestay hosted by Hieu Nguyen
                                        </h5>
                                        <p>6 guests, 1 bedroom, 3 beds, 1 bath</p>
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
                                        <p className="fw-semibold m-0">Great for remote work</p>
                                        <p>Fast wifi at 94 Mbps, plus a dedicated workspace in a private room.</p>
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
                                {shorten ? description : shortDescription + "..."}
                                <p className={`text-decoration-underline text-black fw-semibold p-0 mt-3 c-pointer ${shorten && "d-none"}`} onClick={() => setShorten(true)}>Show more</p>
                            </div>
                            <div className="border-bottom w-95 p-2"></div>
                            <div className="row mt-4 p-3">
                                {amenities.slice(0, 10).map((item, index) => (
                                    <div className="col-md-6 col-sm-12" key={index}>
                                        <div className="row">
                                            <div className="col-1"><i className='bx bx-like fs-180'></i></div>
                                            <div className="col-11">
                                                <p className="fw-semibold p-1">{item}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {
                                    shortenAmenities && amenities.slice(10, amenities.length).map((item, index) => (
                                        <div className="col-md-6 col-sm-12" key={index}>
                                            <div className="row">
                                                <div className="col-1"><i className='bx bx-like fs-180'></i></div>
                                                <div className="col-11">
                                                    <p className="fw-semibold p-1">{item}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                {amenities.length > 10 &&
                                    <div className="col mt-3">
                                        <button className={`btn border border-dark fw-semibold p-3 ${shortenAmenities && "d-none"}`} onClick={() => setShortenAmenities(true)}>Show all {amenities.length} amenities</button>
                                    </div>
                                }
                            </div>
                            {/* end divider component */}
                        </div>
                        <div className="col-md-4 col-sm-12 bx__shadow-1 rounded-2">
                            <div className="row p-3 pt-4">
                                <div className="col-6">
                                    <h5 className='fw-semibold'>{Formatter.format(pricePernight)} <span className='fw-normal fs-6'>night</span></h5>
                                </div>
                                <div className="col-6 text-end">
                                    <p>
                                        <i className='bx bxs-star'></i> <span className='mr-15'>5.0</span>
                                        <a href="#review" className='text-decoration-underline text-muted'> 14 reviews</a>
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
                                                            <p className='fw-bold'>Rooms</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <button className='btn' name='adults' onClick={() => setRoomValue(home.room - 1)}>-</button>
                                                        </div>
                                                        <div className="col-4">
                                                            <input type="number" value={home.room} className="form-control input__people" onChange={onChangePeople} name="room" min={"1"} max={"9"} />
                                                        </div>
                                                        <div className="col-2">
                                                            <button className='btn' name='adults' onClick={() => setRoomValue(home.room + 1)}>+</button>
                                                        </div>
                                                    </div>
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
                                <button className="btn btn__reserve text-white fw-semibold p-3">Reserve</button>
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
                        </div>
                    </div>
                </div>
            </div>



            {/* slideshow overlay */}
            <div className={`overlay ${showOverlay === true ? "show" : "hide"}`}>
                <div className="text-white">
                    <div className="p-3 c-pointer" onClick={() => setShowOverlay(false)}>
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
                            locationArr.map((item, index) =>
                                <SwiperSlide key={index}>
                                    <div className="row d-flex justify-content-center">
                                        <img src={item} alt="" className='w-100 overlay__img' />
                                    </div>
                                </SwiperSlide>)
                        }
                    </Swiper>
                </div>
            </div>
            <div className="text-end">
                <div className="btn">
                    <button className='btn__show__all fw-semibold z-2' type="button" onClick={() => setShowOverlay(true)}><i className='bx bxs-grid'></i> Show all photos</button>
                </div>
            </div>
        </>
    );
}

export default HomeDetails;