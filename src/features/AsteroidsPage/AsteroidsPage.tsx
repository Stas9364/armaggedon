import React, {useEffect} from 'react';
import style from './AsteroidsPage.module.css';
import '../GeneralStyle.css';
import {Asteroid} from './Asteroid/Asteroid';
import {getAsteroidsDataTC} from "../../redux/asteroidsReducer";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";

export function AsteroidsPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAsteroidsDataTC());
    }, []);

    const asteroidsList = useAppSelector(state => state.asteroids);
    console.log(asteroidsList)

    return (
        <div className="container">
            <div className={style.page}>
                <span className={style.title}>Ближайшие подлеты</span>
                <div className={style.line}/>
                <div className={style.filter}>
                    Отображать расстояние: в киллометрах | лунных орбитах
                    <div>
                        <input type="checkbox"/>
                        <span>Показать только опасные</span>
                    </div>
                </div>
                <div className={style.asteroidsContainer}>
                    {asteroidsList.map((a: any) => {
                        return <Asteroid
                            key={a.id}
                            id={a.id}
                            link={a.links}
                            hazardous={a.is_potentially_hazardous_asteroid}
                            name_limited={a.name_limited}
                            diameter={a.estimated_diameter.kilometers.estimated_diameter_max}
                        />
                    })}

                </div>
            </div>
        </div>
    );
}
