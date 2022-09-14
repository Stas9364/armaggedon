import React from 'react';
import style from './AsteroidsCart.module.css';
import '../GeneralStyle.css';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {Button, Line} from '../../components';
import {Asteroid} from '../AsteroidsPage/Asteroid/Asteroid';
import {approachDataObject} from '../../utils/approachDataObject';
import {deleteAsteroid} from '../../redux/cartAsteroidReducer';

export function AsteroidsCart() {
    const dispatch = useAppDispatch();

    const asteroids = useAppSelector(state => state.cart);

    const cancelOrderHandler = (id: string) => dispatch(deleteAsteroid(id));

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
                                link={a.links}
                                diameter={a.estimated_diameter.kilometers.estimated_diameter_max}
                                approachDate={approachDataObject(a.close_approach_data).close_approach_date_full}
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
