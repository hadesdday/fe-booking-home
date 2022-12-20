import React from 'react';
import { Link } from 'react-router-dom';

function RecommendHome(props) {
    const { id, images, name, price, location, reviews, rooms } = props;

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    let totalRating = 0;
    if (reviews.length > 0) {
        reviews.map((i) => totalRating += i.rate);
        totalRating = totalRating / reviews.length;
    }

    var ratingElements = [];
    for (let i = 1; i <= Number(totalRating); i++) {
        ratingElements.push(<i key={i} className='bx bxs-star cl-pink'></i>);
    }

    const priceArray = Object.values(rooms).map(({ price }) => price);
    const minPrice = Math.min(...priceArray);

    return (
        <>
            <Link to={`/home/details/${id}`} className="col-md-3 col-sm-12 p-1">
                <div className="row">
                    <img src={images.length > 0 ? images[0].image : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt="" className='w-95' style={{ maxHeight: 284 }} />
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
                        {minPrice !== Infinity ? formatter.format(minPrice) : "?"}
                    </p>
                </div>
            </Link>
        </>
    );
}

export default RecommendHome;