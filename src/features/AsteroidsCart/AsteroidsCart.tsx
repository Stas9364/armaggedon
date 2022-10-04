import React, {useState} from 'react';
import style from './AsteroidsCart.module.css';
import '../GeneralStyle.css';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {Button, Line, PATH, DialogModal} from '../../components';
import {Asteroid} from '../AsteroidsPage/Asteroid/Asteroid';
import {approachDataObject} from '../../utils/approachDataObject';
import {deleteAsteroid} from '../../redux/cartAsteroidReducer';
import {cancelDestruction} from '../../redux/asteroidsReducer';
import {cartAsteroidsSelector} from './selectors';
import {useNavigate} from 'react-router-dom';

export function AsteroidsCart() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isOpened, setIsOpened] = useState(false);

    const asteroids = useAppSelector(cartAsteroidsSelector);
    const quantityAsteroidsForDestruction = useAppSelector(cartAsteroidsSelector);

    const cancelOrderHandler = (id: string) => {
        dispatch(deleteAsteroid(id));
        dispatch(cancelDestruction(asteroids.filter((a: any) => a.id === id)));
    };

    const placeOrder = () => setIsOpened(true);

    const asteroidPageHandler = (asteroid: any, id: string) => {
        navigate(
            `${PATH.about}/${id}`,
            {state: asteroid}
        );
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
                                asteroidPageHandler={asteroidPageHandler}
                                asteroid={a}
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
                        onClick={placeOrder}
                        name={'Оформить заказ'}
                        style={style.orderButton}
                    />
                </div>
            </div>

            <DialogModal
                isOpened={isOpened}
                onClose={() => setIsOpened(false)}
            >
                <div>
                    <div className={style.title}>Заказ бригады им.Брюса Уиллиса принят.</div>
                    <div className={style.message}>Бригада для уничтожения астероидов в количестве:
                        <span className={style.quantityAsteroids} style={{fontWeight: 'bold', fontSize: '18px'}}> {quantityAsteroidsForDestruction.length}</span> шт.
                        будет доставлена на астероид в нужный момент и выполнит свою нелегкую работу.
                    </div>
                </div>
            </DialogModal>

        </div>
    );
}