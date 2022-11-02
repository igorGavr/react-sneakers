import React from 'react';
import {Card} from "../components/Card/Card";

const Favorites = ({ items, onAddToFavorite }) => {
    return (
        <>
            <div className="content p-40">
                <div className="d-flex justify-between align-center mb-40">
                    <h1>Мои закладки</h1>
                </div>
                <div className="d-flex flex-wrap">
                    {items
                        .map((obj, i) =>
                            <Card
                                {...obj} key={i}
                                favorited={true}
                                onFavorite={onAddToFavorite}
                            />)}
                </div>
            </div>
        </>
    );
};

export {Favorites};
