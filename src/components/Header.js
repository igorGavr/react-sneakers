import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AppContext} from "../App";

const Header = () => {

    const { setCartOpened } = useContext(AppContext);

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="logo"/>
                    <div className="headerInfo">
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-3">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex ">
                <li onClick={() => setCartOpened(true)} className="mr-30 cu-p">
                    <img width={22} height={22} src="/img/cart.svg" alt="cart"/>
                    {/*<b>1205 руб.</b>*/}
                </li>
                <li className="mr-30 cu-p">
                    <Link to="/favorites">
                        <img width={22} height={22} src="/img/favorite.svg" alt="user"/>
                    </Link>
                </li>
                <li>
                    <img width={22} height={22} src="/img/user.svg" alt="user"/>
                </li>
            </ul>
        </header>
    );
};

export {Header};
