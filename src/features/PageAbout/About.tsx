import React from 'react';
import style from './PageAbout.module.css';
import '../GeneralStyle.css';
import {useLocation} from 'react-router-dom';
import {diameterPic, distancePic, meteorite} from '../../assets';
import {approachDataObject} from "../../utils/approachDataObject";

export function About() {
    const {state} = useLocation() as any;
    console.log(state)

    const safely = {boxShadow: '0 0 29px 5px rgba(5, 234, 42, 0.49)'};
    const dangerous = {boxShadow: '0 0 29px 5px rgba(246, 0, 0, 0.49)'};


    return (
        <div className="container">
            <div className={style.wrapper}>
                <div className={style.asteroid}>
                    <div>
                        <img className={style.img}
                             style={state.is_potentially_hazardous_asteroid ? dangerous : safely}
                             src={meteorite}
                             alt="dangerous"
                        />
                    </div>
                    <div className={style.name}>{state.name}</div>
                    <div>
                        <img className={style.unitsImg}
                             src={diameterPic} alt="diameter img"
                        />
                        {state.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} км
                    </div>
                    <div>
                        <img className={style.unitsImg}
                             src={distancePic} alt="distance img"
                        />
                        {Math.round(Number(approachDataObject(state.close_approach_data).miss_distance.kilometers))}
                    </div>
                </div>

                <div className={style.listData}>
                    {state && state?.close_approach_data.map((el: any) =>
                        <div key={el.close_approach_date} className={style.half}>
                            <div className={style.tab}>
                                <input id={el.close_approach_date} type="checkbox" name="tabs"/>
                                <label htmlFor={el.close_approach_date}>DATE
                                    APPROACH {el.close_approach_date_full}</label>
                                <div className={style.tabContent}>
                                    <p>SPEED: {Math.round(Number(el.relative_velocity.kilometers_per_hour))} км/ч</p>
                                    <p>DISTANCE: {Math.round(Number(el.miss_distance.kilometers))} км</p>
                                    <p>ORBITING BODY: {el.orbiting_body}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
}
