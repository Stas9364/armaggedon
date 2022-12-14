import React, {useEffect, useState} from 'react';
import style from './AsteroidsPage.module.css';
import '../GeneralStyle.css';
import {Asteroid} from './Asteroid/Asteroid';
import {destroyAsteroid, isDangerousAsteroids, isFetching} from '../../redux/asteroidsReducer';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {approachDataObject} from '../../utils/approachDataObject';
import {
    asteroidsListSelector,
    filteredAsteroidsListSelector,
    isDangerousSelector,
    isFetchingSelector
} from './selectors';
import {Button, Loader, Uploader, PATH, Line} from '../../components';
import {addAsteroid} from '../../redux/cartAsteroidReducer';
import {useNavigate} from 'react-router-dom';

export function AsteroidsPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [lengthUnit, setLengthUnit] = useState<'kilometers' | 'lunar'>('kilometers');

    const isDangerous = useAppSelector(isDangerousSelector);
    const fetching = useAppSelector(isFetchingSelector);
    const asteroidsList = useAppSelector(isDangerous ? filteredAsteroidsListSelector : asteroidsListSelector);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - ((e.target.documentElement.scrollTop) + window.innerHeight) < 100) {
            dispatch(isFetching('uploading')); //uploading
        }
    };

    const isDangerousHandler = () => {
        dispatch(isDangerousAsteroids(!isDangerous));
    };

    const addAsteroidToCart = (id: string) => {
        dispatch(addAsteroid(asteroidsList.filter((a: any) => a.id === id)));
        dispatch(destroyAsteroid(id));
    };

    const kilometerUnitHandler = () => setLengthUnit('kilometers');
    const lunarUnitHandler = () => setLengthUnit('lunar');

    const asteroidPageHandler = (asteroid: any, id: string) => {
        navigate(
            `${PATH.about}/${id}`,
            {state: asteroid}
        );
    };

    return (
        <div className="container">
            <div className={style.page}>
                <span className={style.title}>?????????????????? ??????????????</span>
                <Line/>
                <div className={style.filter}>
                    <span>
                         ???????????????????? ????????????????????:
                        <span
                            onClick={kilometerUnitHandler}
                            className={style.lengthUnit}
                            style={lengthUnit === 'kilometers' ? {fontWeight: 'bold'} : {}}
                        > ?? ?????????????????????? </span> |
                        <span
                            onClick={lunarUnitHandler}
                            className={style.lengthUnit}
                            style={lengthUnit === 'lunar' ? {fontWeight: 'bold'} : {}}
                        > ???????????? ??????????????</span>
                    </span>
                    <div>
                        <span onClick={isDangerousHandler}>
                            <input onChange={isDangerousHandler} checked={isDangerous} type="checkbox"/>
                            ???????????????? ???????????? ??????????????
                        </span>
                    </div>
                </div>

                {fetching === 'loading'
                    ? <Loader/>
                    : <div className={style.asteroidsContainer}>
                        {asteroidsList.map((a: any) => {
                            return <Asteroid
                                key={a.id}
                                id={a.id}
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
                }
                {fetching === 'uploading' && <Uploader/>}
            </div>
        </div>
    );
}

