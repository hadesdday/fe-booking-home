import React from 'react';
import { Link } from 'react-router-dom';
import "./styles.scss";

function RecommendPlaces(props) {
    const { imgSrc, name, location, rating, discount, price, id } = props;

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    var ratingElements = [];
    for (let i = 1; i <= Number(rating); i++) {
        ratingElements.push(<i key={i} className='bx bxs-star cl-yellow'></i>);
    }

    var afterDiscountPrice = price - ((price * discount) / 100);

    return (
        <Link to={`home/details/${id}`} className="col-md-2 col-sm-12 m-1 p-1">
            <div className="card">
                <img src={imgSrc} className="card-img-top" alt="404" />
                <div className="card-body">
                    <h5 className="card-title fw-bold fs-6 text-black">{name}</h5>
                    <p className="card-text text-black">{location}</p>
                    <p className='card-text'>{ratingElements}</p>
                    <div className="text-end d-flex justify-content-end">
                        <div className="bg-danger rounded-1 text-white discount__tag text-center">{discount}% DISCOUNT</div>
                    </div>
                    <div className="text-end d-flex justify-content-end">
                        <div className="text-decoration-line-through text-black">{formatter.format(price)}</div>
                    </div>
                    <div className="text-end d-flex justify-content-end">
                        <div className="text-danger fw-semibold fs-5">{formatter.format(afterDiscountPrice)}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default RecommendPlaces;