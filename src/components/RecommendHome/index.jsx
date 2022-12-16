import React from 'react';
import { Link } from 'react-router-dom';

function RecommendHome(props) {
    const { id, imgSrc, name, price, location, rating } = props;

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    var ratingElements = [];
    for (let i = 1; i <= Number(rating); i++) {
        ratingElements.push(<i key={i} className='bx bxs-star cl-pink'></i>);
    }

    return (
        <>
            <Link to={`/home/details/${id}`} className="col-md-3 col-sm-12 p-1">
                <div className="row">
                    <img src={imgSrc} alt="" className='w-95' />
                </div>
                <div className="row">
                    <h6 className='fw-semibold text-black'>{name}</h6>
                </div>
                <div className="row">
                    <div className="col">
                        {ratingElements}
                        <i className='bx bxs-location-plus text-primary p-1'></i>
                        {location}
                    </div>
                </div>
                <div className="row">
                    <p className='text-danger fw-bold cl-red'>
                        {formatter.format(price)}
                    </p>
                </div>
            </Link>
        </>
    );
}

export default RecommendHome;