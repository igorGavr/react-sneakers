import React, {useState} from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss';

const Card = ({ id, name, imageUrl, price,
                  onPlus, onFavorite, favorited=false,
                  added=false, loading=false }) => {
    const [isChecked, setIsChecked] = useState(added);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        onPlus({ id, name, imageUrl, price });
        setIsChecked(!isChecked);
    }
    const onClickFavorite = () => {
        setIsFavorite(!isFavorite);
        onFavorite({ id, name, imageUrl, price });
    }
    return (
        <div className={styles.card}>
            {loading ?
                <ContentLoader
                    speed={2}
                    width={220}
                    height={260}
                    viewBox="0 0 220 260"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="167" height="161" />
                    <rect x="0" y="177" rx="5" ry="5" width="167" height="17" />
                    <rect x="0" y="211" rx="10" ry="10" width="72" height="34" />
                    <rect x="208" y="268" rx="0" ry="0" width="2" height="1" />
                    <rect x="191" y="367" rx="0" ry="0" width="9" height="0" />
                    <rect x="108" y="211" rx="0" ry="0" width="59" height="24" />
                </ContentLoader> :
                <>
                    <div onClick={onClickFavorite} className={styles.favorite}>
                        <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="heart-unliked"/>
                    </div>
                    <img width="100%" height="145" src={imageUrl} alt="sneakers"/>
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
                </>
            }
        </div>
    );
};

export {Card};
