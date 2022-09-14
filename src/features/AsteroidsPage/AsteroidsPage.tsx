import React, {useEffect} from 'react';
import style from './AsteroidsPage.module.css';
import '../GeneralStyle.css';
import {Asteroid} from './Asteroid/Asteroid';
import {isDangerousAsteroids, isFetching} from '../../redux/asteroidsReducer';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {approachDate} from '../../utils/approachDate';
import {asteroidsListSelector, filteredAsteroidsListSelector, isDangerousSelector} from './selectors';

export function AsteroidsPage() {
    const dispatch = useAppDispatch();

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
        if (e.target.documentElement.scrollHeight - ((e.target.documentElement.scrollTop ) + window.innerHeight) < 100) {
            dispatch(isFetching(true));
        }
    };

    const isDangerousHandler = () => {
        dispatch(isDangerousAsteroids(!isDangerous));
    };

    const addAsteroidToCart = (id: string) => {
        console.log(id)
    }

    return (
        <div className="container">
            <div className={style.page}>
                <span className={style.title}>Ближайшие подлеты</span>
                <div className={style.line}/>
                <div className={style.filter}>
                    Отображать расстояние: в киллометрах | лунных орбитах
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
                            approachDate={approachDate(a.close_approach_data)}
                            addAsteroidToCart={addAsteroidToCart}
                        />
                    })}
                </div>
            </div>
        </div>
    );
}

