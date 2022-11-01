import React from 'react';

const Card = () => {
    return (
        <div className="card">
            <div className="favorite">
                <img src="/img/heart-unliked.svg" alt="heart-unliked"/>
            </div>
            <img width={133} height={112} src="/img/sneakers/image5.jpg" alt="sneakers"/>
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>12 999 руб.</b>
                </div>
                <img src="/img/plus2.svg" alt="plus"/>
            </div>
        </div>
    );
};

export {Card};
