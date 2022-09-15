import React, {ReactNode} from 'react';
import style from './Asteroid.module.css';
import {Dangerous, nonDangerous} from '../../../assets';
import {diameterPic} from '../../../assets';
import {distancePic} from "../../../assets";

type AsteroidPropsTypes = {
    id: string
    hazardous: boolean
    name_limited: string
    diameter: number
    approachDate: any
    children?: ReactNode
    distance: string
    asteroidPageHandler?: (asteroid: any, id: string) => void
    asteroid?: any
}

export const Asteroid: React.FC<AsteroidPropsTypes> = ({
                                                           id,
                                                           hazardous,
                                                           name_limited,
                                                           diameter,
                                                           approachDate,
                                                           children,
                                                           distance,
                                                           asteroidPageHandler,
                                                           asteroid
                                                       }) => {
    const asteroidHandler = () => {
        if (asteroidPageHandler) {
            asteroidPageHandler(asteroid, id)
        }
    };

    return (
        <div className={style.container}>
            <div className={style.asteroidContainer}>
                <div className={style.name} onClick={asteroidHandler}>
                    {name_limited}
                </div>
                <div className={style.descriptionContainer}>
                    <img src={hazardous ? Dangerous : nonDangerous} alt="asteroid"/>
                    <div className={style.description}>
                        <div>{approachDate}</div>
                        <div>
                            <img className={style.unitsImg}
                                 src={diameterPic} alt="diameter img"
                            /> {diameter.toFixed(2)} км
                        </div>
                        <div>{hazardous ? 'Опасно' : 'Безопасно'}</div>
                        <div>
                            <img className={style.unitsImg}
                                 src={distancePic} alt="distance img"
                            /> {Math.round(Number(distance))}
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
