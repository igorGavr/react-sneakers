import React from 'react';

const Drawer = ({ onCloseCart, items=[] }) => {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-40">Корзина
                    <img onClick={onCloseCart} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove"/></h2>
                <div className="items">
                    {items.map((obj) => (
                        <div className="cartItem d-flex align-center mb-20">
                            <img
                                className="mr-20"
                                width={70} height={70}
                                src={obj.imageUrl} alt="sneakers"/>
                            <div className="mr-20">
                                <p className="mb-5">{obj.name}</p>
                                <b>{obj.price} руб.</b>
                            </div>
                            <img className="removeBtn" src="/img/btn-remove.svg" alt="remove"/>
                        </div>
                    ))}
                </div>
                <div className="cartTotalBlock">
                    <ul >
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>21 343 руб.</b>
                        </li>
                        <li>
                            <span>Налог 5%:</span>
                            <div></div>
                            <b>1212 руб.</b>
                        </li>
                    </ul>
                    <button className="greenButton">Оформить заказ <img src="/img/arrow.svg"/></button>
                </div>

            </div>
        </div>
    );
};

export {Drawer};
