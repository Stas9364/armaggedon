import React, {ReactNode} from 'react';
import style from './Asteroid.module.css';
import {Dangerous, nonDangerous} from '../../../assets';
import {diameterPic} from '../../../assets';
import {distancePic} from "../../../assets";

type AsteroidPropsTypes = {
    id: string
    hazardous: boolean
    name_limited: string
    link: string
    diameter: number
    approachDate: any
    children?: ReactNode
    distance: string
}

export const Asteroid: React.FC<AsteroidPropsTypes> = ({
                                                           id,
                                                           hazardous,
                                                           name_limited,
                                                           link,
                                                           diameter,
                                                           approachDate,
                                                           children,
                                                           distance,
                                                       }) => {

    return (
        <div className={style.container}>
            <div className={style.asteroidContainer}>
                <div className={style.date}>
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
                                 src={distancePic}  alt="distance img"
                            /> {Math.round(Number(distance))}
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
