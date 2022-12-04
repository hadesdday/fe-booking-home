import React from 'react';
import { useParams } from 'react-router';
import "./styles.scss";
import Image from "../../assets/home1.png";
import { useState } from 'react';


import Pic1 from "../../assets/location/pic1.jpg";
import Pic2 from "../../assets/location/pic2.jpg";
import Pic3 from "../../assets/location/pic3.jpg";
import Pic4 from "../../assets/location/pic4.jpg";
import Pic5 from "../../assets/location/pic5.jpeg";
import Pic6 from "../../assets/location/pic6.jpg";
import Pic7 from "../../assets/location/pic7.jpg";
import Pic8 from "../../assets/location/pic8.jpg";
import Pic9 from "../../assets/location/pic9.png";
import { FreeMode, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";


function HomeDetails(props) {
    const { id } = useParams();

    const [showOverlay, setShowOverlay] = useState(false);

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
                            <a href="#review" className='text-decoration-underline text-black fw-semibold'>Phu Quoc</a>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <img src={Image} alt="" className='w-100 rounded-start hide__mobile' />
                        </div>
                        <div className="col-md-6">
                            <div className="row pb-3">
                                <div className="col-md-6">
                                    <img src={Image} alt="" className='w-100 hide__mobile' />
                                </div>
                                <div className="col-md-6">
                                    <img src={Image} alt="" className='w-100 rounded-end hide__mobile' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={Image} alt="" className='w-100 hide__mobile' />
                                </div>
                                <div className="col-md-6">
                                    <img src={Image} alt="" className='w-100 rounded-end hide__mobile' />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className={`overlay ${showOverlay === true ? "show" : ""}`}>
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
                    <button className='btn__show__all fw-semibold z-1' type="button" onClick={() => setShowOverlay(true)}><i className='bx bxs-grid'></i> Show all photos</button>
                </div>
            </div>
        </>
    );
}

export default HomeDetails;