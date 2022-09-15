import React from 'react';
import style from './AsteroidsCart.module.css';
import '../GeneralStyle.css';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {Button, Line} from '../../components';
import {Asteroid} from '../AsteroidsPage/Asteroid/Asteroid';
import {approachDataObject} from '../../utils/approachDataObject';
import {deleteAsteroid} from '../../redux/cartAsteroidReducer';
import {cancelDestruction} from '../../redux/asteroidsReducer';
import {cartAsteroidsSelector} from './selectors';

export function AsteroidsCart() {
    const dispatch = useAppDispatch();

    const asteroids = useAppSelector(cartAsteroidsSelector);

    const cancelOrderHandler = (id: string) => {
        dispatch(deleteAsteroid(id));
        dispatch(cancelDestruction(asteroids.filter((a: any) => a.id === id)));
    };

    return (
        <div className="container">
            <div className={style.page}>
                <div className={style.asteroidsContainer}>
                    {asteroids.map((a: any) => {
                        return (
                            <Asteroid
                                key={a.id}
                                id={a.id}
                                hazardous={a.is_potentially_hazardous_asteroid}
                                name_limited={a.name_limited}
                                diameter={a.estimated_diameter.kilometers.estimated_diameter_max}
                                approachDate={approachDataObject(a.close_approach_data).close_approach_date}
                                distance={approachDataObject(a.close_approach_data).miss_distance.kilometers}
                            >
                                <Button name={'отменить'} onClick={() => cancelOrderHandler(a.id)}
                                        style={style.removeButton}/>
                            </Asteroid>
                        )
                    })}
                </div>
                <Line/>
                <div className={style.orderBlock}>
                    <div className={style.totalCount}>TOTAL ASTEROIDS: {asteroids.length}</div>
                    <Button
                        onClick={() => {
                        }}
                        name={'Оформить заказ'}
                        style={style.orderButton}
                    />
                </div>
            </div>
        </div>
    );
}
