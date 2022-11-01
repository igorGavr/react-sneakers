import React from 'react';

import styles from './Card.module.scss';

const Card = (props) => {
    const getName = () => {
        alert(props.name)
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="/img/heart-unliked.svg" alt="heart-unliked"/>
            </div>
            <img width={133} height={112} src={props.imageUrl} alt="sneakers"/>
            <h5>{props.name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{props.price} руб.</b>
                </div>
                <img onClick={() => getName()} src="/img/plus2.svg" alt="plus"/>
            </div>
        </div>
    );
};

export {Card};
