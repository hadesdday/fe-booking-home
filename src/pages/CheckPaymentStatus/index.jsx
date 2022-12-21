import React, { useEffect, useState } from 'react';
import { getPaymentStatus } from '../../api/paypal.api';
import { bookHotel } from '../../api/hotel.api';
import $ from 'jquery';

function CheckPaymentStatus(props) {
    const qs = window.location.search;
    const params = new URLSearchParams(qs);
    const paymentId = params.get('paymentId');
    const token = localStorage.getItem('access__token');
    const customer = JSON.parse(sessionStorage.getItem("customer"));
    const chosenItems = JSON.parse(sessionStorage.getItem("chosenItem"));

    useEffect(() => {
        const getStatus = () => {
            getPaymentStatus(token, paymentId).then((res) => {
                const { status } = res.data.payer;
                if (status === 'VERIFIED') {
                    chosenItems.map((item, index) => {
                        const data = {
                            customer: customer,
                            hotel: item.hotel,
                            room: item.hotel.rooms[0],
                            dateCheckin: new Date(item.from),
                            dateCheckout: new Date(item.to),
                            voucherId: 0,
                            status: 0
                        };

                        bookHotel(data).then((res) => {
                            if (index === chosenItems.length - 1 && res.status === 200) {
                                window.location.href = "/success";
                            }
                        })
                    })
                }
            });
        };
        return () => {
            getStatus();
        };
    }, []);

    return (
        <div>
            <div className={`overlay show d-flex justify-content-center`}>
                <div className="position-relative">
                    <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden" style={{ width: "5rem" }}>Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckPaymentStatus;