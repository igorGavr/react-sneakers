import React, {useContext} from 'react';
import {AppContext} from "../App";

const Drawer = ({ onRemove }) => {

    const { setCartOpened, cartItems=[] } = useContext(AppContext);

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-40">Корзина
                    <img onClick={() => setCartOpened(false)} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove"/></h2>
                {
                    cartItems.length > 0 ?
                        <div>
                            <div className="items">
                                {cartItems.map((obj, i) => (
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <img
                                            className="mr-20"
                                            width={70} height={70}
                                            src={obj.imageUrl} alt="sneakers"/>
                                        <div className="mr-20">
                                            <p className="mb-5">{obj.name}</p>
                                            <b>{obj.price} руб. id-{obj.id}</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)}
                                             className="removeBtn" src="/img/btn-remove.svg" alt="remove"/>
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
                         :
                        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                            <img className="mb-20" width={120} height={120}
                                 src="/img/empty-cart.jpg" alt="empty-cart"/>
                            <h2>Корзина пустая</h2>
                            <p className="opacity-6" >Купи хоть что-то)</p>
                            <button onClick={() => setCartOpened(false)} className="greenButton">
                                <img src="/img/arrow.svg" alt="arrow"/>
                                Вернуться назад
                            </button>
                        </div>
                }
            </div>
        </div>
    );
};

export {Drawer};
