import React from 'react';
import style from './Asteroid.module.css';
import {nonDangerous, Dangerous} from '../../../assets';

type AsteroidPropsTypes = {
    id: string
    hazardous: boolean
    name_limited: string
    link: string
    diameter: number
    approachDate: string
    addAsteroidToCart: (id: string) => void
}

export const Asteroid: React.FC<AsteroidPropsTypes> = ({
                                                           id,
                                                           hazardous,
                                                           name_limited,
                                                           link,
                                                           diameter,
                                                           approachDate,
                                                           addAsteroidToCart
}) => {

    const buttonHandler = () => addAsteroidToCart(id);

    return (
        <div className={style.container}>
            <div className={style.asteroidContainer}>
                <div className={style.date}>
                    {approachDate}
                </div>
                <div className={style.descriptionContainer}>
                    <img src={hazardous ? Dangerous : nonDangerous} alt="asteroid"/>
                    <div className={style.description}>
                        <div>{name_limited}</div>
                        <div>{diameter.toFixed(2)} км</div>
                        <div>{hazardous ? 'Опасно' : 'Безопасно'}</div>
                    </div>
                </div>
                <div onClick={buttonHandler} className={style.button}>DESTROY</div>
            </div>
        </div>
    );
}
