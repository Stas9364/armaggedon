import React, {useEffect, useState} from 'react';
import style from './AsteroidsPage.module.css';
import '../GeneralStyle.css';
import {Asteroid} from './Asteroid/Asteroid';
import {isDangerousAsteroids, isFetching} from '../../redux/asteroidsReducer';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {approachDataObject} from '../../utils/approachDataObject';
import {asteroidsListSelector, filteredAsteroidsListSelector, isDangerousSelector} from './selectors';
import {Button} from '../../components';
import {addAsteroid} from '../../redux/cartAsteroidReducer';
import {Line} from '../../components';
import {useNavigate} from "react-router-dom";
import {PATH} from "../../components/routes/AppRouter";

export function AsteroidsPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [lengthUnit, setLengthUnit] = useState<'kilometers' | 'lunar'>('kilometers');

    const isDangerous = useAppSelector(isDangerousSelector);
    const asteroidsList = useAppSelector(isDangerous ? filteredAsteroidsListSelector : asteroidsListSelector);
    console.log(asteroidsList)
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - ((e.target.documentElement.scrollTop) + window.innerHeight) < 100) {
            dispatch(isFetching(true));
        }
    };

    const isDangerousHandler = () => {
        dispatch(isDangerousAsteroids(!isDangerous));
    };

    const addAsteroidToCart = (id: string) => {
        dispatch(addAsteroid(asteroidsList.filter((a: any) => a.id === id)));
    };

    const kilometerUnitHandler = () => setLengthUnit('kilometers');
    const lunarUnitHandler = () => setLengthUnit('lunar');

    const asteroidPageHandler = (asteroid: any, id: string) => {
        navigate(
            `${PATH.about}/${id}`,
            {state: asteroid}
            );
    }

    return (
        <div className="container">
            <div className={style.page}>
                <span className={style.title}>Ближайшие подлеты</span>
                <Line/>
                <div className={style.filter}>
                    <span>
                         Отображать расстояние:
                        <span
                            onClick={kilometerUnitHandler}
                            className={style.lengthUnit}
                            style={lengthUnit === 'kilometers' ? {fontWeight: 'bold'} : {}}
                        > в киллометрах </span> |
                        <span
                            onClick={lunarUnitHandler}
                            className={style.lengthUnit}
                            style={lengthUnit === 'lunar' ? {fontWeight: 'bold'} : {}}
                        > лунных орбитах</span>
                    </span>
                    <div>
                        <input onChange={isDangerousHandler} checked={isDangerous} type="checkbox"/>
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
                            name_limited={a.name}
                            diameter={a.estimated_diameter.kilometers.estimated_diameter_max}
                            approachDate={approachDataObject(a.close_approach_data).close_approach_date_full}
                            distance={
                                lengthUnit === 'kilometers'
                                    ? approachDataObject(a.close_approach_data).miss_distance.kilometers
                                    : approachDataObject(a.close_approach_data).miss_distance.lunar
                            }
                            asteroid={a}
                            asteroidPageHandler={asteroidPageHandler}
                        >
                            <Button
                                name={'DESTROY'}
                                onClick={() => addAsteroidToCart(a.id)}
                                style={style.button}
                            />
                        </Asteroid>
                    })}
                </div>
            </div>
        </div>
    );
}

