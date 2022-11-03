import React, {useContext} from 'react';
import {Card} from "../components/Card/Card";
import {AppContext} from "../App";

const Favorites = ({ onAddToFavorite }) => {
    const { favorites } = useContext(AppContext);
    return (
        <>
            <div className="content p-40">
                <div className="d-flex justify-between align-center mb-40">
                    <h1>Мои закладки</h1>
                </div>
                <div className="d-flex flex-wrap">
                    {favorites
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
