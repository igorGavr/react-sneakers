import React from 'react';
import {Card} from "../components/Card/Card";

const Home = ({ items, searchValue, onAddToCart,
                  onAddToFavorite, cartItems, onChangeSearchInput,
                  setSearchValue, isLoading }) => {
    const renderItems = () => {
        const filteredItems = items
            .filter((item) => item.name.toLowerCase().includes(searchValue));
      return (isLoading ? [...Array(8)] : filteredItems)
          .map((item, i) =>
              <Card
                  {...item} key={i} loading={isLoading}
                  onPlus={(obj) => onAddToCart(obj)}
                  onFavorite={(obj) => onAddToFavorite(obj)}
                  added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
              />)
    }
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
                    {renderItems()}
                </div>
            </div>
        </>
    );
};

export {Home};
