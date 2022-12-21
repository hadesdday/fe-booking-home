/* eslint-disable jsx-a11y/anchor-is-valid */
import DatePicker, { utils } from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import React, { useEffect, useState } from 'react';
import { FreeMode, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Background from "../../assets/background.jpg";
import RecommendHome from '../../components/RecommendHome';

import Banner1 from "../../assets/promotion/banner1.png";
import Banner10 from "../../assets/promotion/banner10.png";
import Banner11 from "../../assets/promotion/banner11.png";
import Banner12 from "../../assets/promotion/banner12.png";
import Banner2 from "../../assets/promotion/banner2.png";
import Banner3 from "../../assets/promotion/banner3.png";
import Banner4 from "../../assets/promotion/banner4.png";
import Banner5 from "../../assets/promotion/banner5.png";
import Banner6 from "../../assets/promotion/banner6.png";
import Banner7 from "../../assets/promotion/banner7.png";
import Banner8 from "../../assets/promotion/banner8.png";
import Banner9 from "../../assets/promotion/banner9.png";

import Pic1 from "../../assets/location/pic1.jpg";
import Pic2 from "../../assets/location/pic2.jpg";
import Pic3 from "../../assets/location/pic3.jpg";
import Pic4 from "../../assets/location/pic4.jpg";
import Pic5 from "../../assets/location/pic5.jpeg";
import Pic6 from "../../assets/location/pic6.jpg";
import Pic7 from "../../assets/location/pic7.jpg";
import Pic8 from "../../assets/location/pic8.jpg";
import Pic9 from "../../assets/location/pic9.png";

import Home2 from "../../assets/home2.jpg";

import { useContext } from 'react';
import { getHotelGoodByLocation, getHotelListDiscount } from '../../api/hotel.api';
import RecommendPlaces from '../../components/RecommendPlaces';
import { AppContext } from '../../context/AppContext';
import "./styles.scss";

function Home(props) {
    const [option, setOption] = useState(0);

    const { featuredLocation, selectedDayRange, selectedDay,
        home, setFeaturedLocation, setSelectedDayRange, setSelectedDay, onChangePeople,
        setRoomValue,
        setAdultsValue,
        setChildValue } = useContext(AppContext);

    const [recommendHomeList, setRecommendHomeList] = useState([]);
    const [discountHotelList, setDiscountHotelList] = useState([]);

    console.log(discountHotelList);

    useEffect(() => {
        const refetch = (async () => {
            await getHotelGoodByLocation("Dong Nai".toLowerCase()).then((res) => {
                const { data } = res;
                setRecommendHomeList(data.slice(0, 8));
            });
            await getHotelListDiscount().then((res) => {
                const { data } = res;
                setDiscountHotelList(data.slice(0, 5));
            });
            return;
        });
        //cleanup function
        return () => {
            refetch();
        };
    }, []);

    function onFetchGoodByLocation(location) {
        setFeaturedLocation(location);
        setRecommendHomeList([]);
        getHotelGoodByLocation(location.toLowerCase()).then((res) => {
            const { data } = res;
            setRecommendHomeList(data.slice(0, 8));
        });
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

    const renderCustomOnInput = ({ ref }) => (
        <div className="row">
            <div className="input-group">
                <label htmlFor="input__date" className='mt-3'>
                    <i className='bx bx-calendar fs-180'></i>
                </label>
                <input
                    readOnly
                    ref={ref}
                    type="text"
                    className='form-control input__date'
                    placeholder='Choose your day'
                    value={getDateRangeInString(selectedDayRange)}
                    id="input__date"
                />
            </div>
        </div>
    )

    const renderCustomDayInput = ({ ref }) => (
        <div className="row">
            <div className="input-group">
                <label htmlFor="input__day" className='mt-3'>
                    <i className='bx bx-calendar fs-180'></i>
                </label>
                <input
                    readOnly
                    ref={ref}
                    type="text"
                    className='form-control input__date'
                    placeholder='Choose your day'
                    value={selectedDay.year + "/" + selectedDay.month + "/" + selectedDay.day}
                    id="input__day"
                />
            </div>
        </div>
    )

    const FeaturedLocationListItem = ({ location }) => (
        <li className={`p-3 border-bottom recommend__location ${featuredLocation === location && "active"}`} onClick={() => onFetchGoodByLocation(location)}>{location}</li>
    );

    var bannerArr = [];
    var locationArr = [];
    bannerArr.push(Banner1);
    bannerArr.push(Banner2);
    bannerArr.push(Banner3);
    bannerArr.push(Banner4);
    bannerArr.push(Banner5);
    bannerArr.push(Banner6);
    bannerArr.push(Banner7);
    bannerArr.push(Banner8);
    bannerArr.push(Banner9);
    bannerArr.push(Banner10);
    bannerArr.push(Banner11);
    bannerArr.push(Banner12);

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
            <div className="d-flex justify-content-center text-center mh-600" >
                <div className="row g-0">
                    <img src={Background} alt="404" className='h-60' />
                    <div className="position-absolute start-50 translate-middle text-white cta__title z-2">
                        <h4 className='fw-semibold'>HOTELS,HOSTELS & MORE</h4>
                        <h5 className='fw-500'>Get the best prices on 2,000,000+ properties, worldwide</h5>

                        <div className="container d-flex justify-content-start bg-white w-75 rounded-4 p-4 search__box">
                            <div className="row w-100">
                                <div className="col text-start">
                                    <button className={`btn__day__options p-3 rounded-1 ${option === 0 ? "active" : ""}`} onClick={() => setOption(0)}>Overnight Stays</button>
                                    <button className={`btn__day__options p-3 rounded-1 ${option === 1 ? "active" : ""}`} onClick={() => setOption(1)}>Day Use Stays</button>
                                </div>
                                <div className="row">
                                    <div className="input-group p-3 mt-3">
                                        <input type="text" className='form-control input__search' placeholder='Enter a destination' />
                                    </div>
                                </div>
                                <div className={`row text-dark justify-content-center`}>
                                    <div className="col-5 bg-white rounded-1 border option__date text-start">
                                        <div className="row">
                                            {
                                                option === 0 ?
                                                    <DatePicker
                                                        value={selectedDayRange}
                                                        onChange={setSelectedDayRange}
                                                        inputPlaceholder="Select a day range"
                                                        minimumDate={utils().getToday()}
                                                        shouldHighlightWeekends
                                                        renderInput={renderCustomOnInput}
                                                    /> :
                                                    <DatePicker
                                                        value={selectedDay}
                                                        onChange={setSelectedDay}
                                                        inputPlaceholder="Select a day range"
                                                        minimumDate={utils().getToday()}
                                                        shouldHighlightWeekends
                                                        renderInput={renderCustomDayInput}
                                                    />
                                            }
                                        </div>
                                    </div>
                                    <div className="col-5 bg-white rounded-1 border option__people text-start">
                                        <div className="row w-100">
                                            <div className="col-1">
                                                <i className='bx bx-user fs-180 mt-3'></i>
                                            </div>
                                            <div className="col-10 mt-2">
                                                <div className="dropdown w-100">
                                                    <div className="row">
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
                                <div className="row mt-4 justify-content-center">
                                    <a href="" role="button" className='btn__search active rounded-1 w-50 p-2'>SEARCH</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-0 text-center mt-5">
                <h3 className='fw-semibold'>Accommodation Promotions</h3>
                <Swiper
                    navigation={true}
                    pagination={{
                        clickable: true
                    }}
                    slidesPerView={2}
                    spaceBetween={30}
                    freeMode={true}
                    modules={[Navigation, Pagination, FreeMode]} className="w-75">
                    {
                        bannerArr.map((item, index) =>
                            <SwiperSlide key={index}>
                                <a href="#">
                                    <div className="row h-100">
                                        <img src={item} alt="" className='rounded-5' />
                                    </div>
                                </a>
                            </SwiperSlide>)
                    }
                </Swiper>
            </div>
            <div className="row g-0 text-center mt-5 h-30">
                <h3 className="fw-semibold">Top destinations</h3>
                <Swiper
                    navigation={true}
                    spaceBetween={30}
                    pagination={{
                        clickable: true
                    }}
                    slidesPerView={5}
                    freeMode={true}
                    modules={[Navigation, Pagination, FreeMode]} className="w-75">
                    {
                        locationArr.map((item, index) =>
                            <SwiperSlide key={index}>
                                <a href="#">
                                    <div className="row d-flex justify-content-center mb-2">
                                        <img src={item} alt="" className='rounded-circle location__avatar' />
                                    </div>
                                    <h5 className='text-black fw-semibold'>Ho Chi Minh City</h5>
                                    <p className="text-muted">99,999 accommodations</p>
                                </a>
                            </SwiperSlide>)
                    }
                </Swiper>
            </div>

            <div className="row g-0 text-center mt-5">
                <h3 className="fw-semibold">Featured homes recommended for you</h3>

                <ul className='d-flex align-items-center justify-content-center recommend__tab'>
                    <FeaturedLocationListItem location={"Dong Nai"} />
                    <FeaturedLocationListItem location={"Ha Noi"} />
                    <FeaturedLocationListItem location={"Da Nang"} />
                    <FeaturedLocationListItem location={"Da Lat"} />
                    <FeaturedLocationListItem location={"Vung Tau"} />
                </ul>
            </div>
            <div className="featured__location__list container d-flex justify-content-center">
                <div className="row w-95">
                    {recommendHomeList.length > 0 ? recommendHomeList.map((item) => (
                        <RecommendHome key={item.id} images={item.images} name={item.name} reviews={item.reviews} location={item.place.province} price={item.price} id={item.id} rooms={item.rooms} />
                    ))
                        : <h4 className='text-center'>Not found anything here</h4>
                    }

                    {/* <div className="row justify-content-center mt-3">
                        <a href="" role={"button"} className="btn btn__more active w-25 p-2">See more ({featuredLocation}) properties</a>
                    </div> */}
                </div>
            </div>

            <div className="row g-0 text-center mt-5">
                <h3 className="fw-semibold">Recommended places to stay for your next trip!</h3>
            </div>

            <div className="container">
                <div className="row justify-content-center pb-5">
                    {discountHotelList.length > 0 && discountHotelList.map((item) => (
                        <RecommendPlaces imgSrc={item.images[0].image} name={item.name} location={item.place.province} rating={5} discount={item.rooms[0].discount} price={item.rooms[0].price} key={item.id} id={item.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;