import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/AppRouter';
import style from './Navbar.module.css';
import {asteroidsDataAPI} from '../../api/api';
import {useAppSelector} from '../../utils/hooks';
import {cartAsteroidsSelector} from '../../features';

export function Navbar() {
    const [dailyPhoto, setDailyPhoto] = useState('');

    const quantityAsteroidsInCart = useAppSelector(cartAsteroidsSelector);

    useEffect(() => {
        asteroidsDataAPI.getPicture()
            .then((resp) => {
                setDailyPhoto(resp.data.url);
            });
    }, []);

    return (
        <div className={style.navbarContainer} style={{backgroundImage: `url(${dailyPhoto})`}}>

            <div className={style.titleContainer}>
                <div className={style.text}>ARMAGEDDON</div>
                <div className={style.linkContainer}>
                    <span><NavLink to={PATH.main} className={style.link}> Астероиды</NavLink></span>
                    <span>
                        <NavLink to={PATH.order} className={style.link}>
                            Заказ
                            <span style={{color: 'red', marginLeft: '2px'}}>
                                {quantityAsteroidsInCart.length > 0 ? quantityAsteroidsInCart.length : ''}
                            </span>
                        </NavLink>
                    </span>
                </div>
            </div>

            <div className={style.text}>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</div>

        </div>
    );
}
