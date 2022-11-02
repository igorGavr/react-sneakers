import React, {useState} from 'react';

import styles from './Card.module.scss';

const Card = ({ name, imageUrl, price, onPlus, onFavorite }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const onClickPlus = () => {
        onPlus({ name, imageUrl, price });
        setIsChecked(!isChecked);
    }
    const onClickFavorite = () => {
        setIsFavorite(!isFavorite);
        onFavorite({ name, imageUrl, price });
    }
    return (
        <div className={styles.card}>
            <div onClick={onClickFavorite} className={styles.favorite}>
                <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="heart-unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="sneakers"/>
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img onClick={onClickPlus}
                     src={isChecked ? "/img/checked.svg" : "/img/plus.svg"}
                     alt="plus"
                />
            </div>
        </div>
    );
};

export {Card};
