import React from 'react';
import {Card} from "../components/Card/Card";

const Home = ({ items, searchValue, onAddToCart,
                  onAddToFavorite, onChangeSearchInput,
                  setSearchValue }) => {
    return (
        <>
            <div className="content p-40">
                <div className="d-flex justify-between align-center mb-40">
                    {searchValue ? <h1>{`Поиск по: ${searchValue}`}</h1> : <h1>Все кроссовки</h1>}
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="search"/>
                        {searchValue && <img onClick={() => setSearchValue('')}
                                             className="clear" src="/img/btn-remove.svg" alt="clear"/>}
                        <input onChange={onChangeSearchInput}  value={searchValue} placeholder="Поиск..."/>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {items
                        .filter((item) => item.name.toLowerCase().includes(searchValue))
                        .map((obj, i) =>
                            <Card
                                {...obj} key={i}
                                onPlus={(obj) => onAddToCart(obj)}
                                onFavorite={(obj) => onAddToFavorite(obj)}
                            />)}
                </div>
            </div>
        </>
    );
};

export {Home};
