import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/AppRouter';
import style from './Navbar.module.css';
import {asteroidsDataAPI} from '../../api/api';

export function Navbar() {
    const [dailyPhoto, setDailyPhoto] = useState('');

    useEffect(() => {
        asteroidsDataAPI.getPicture()
            .then((resp) => {
                setDailyPhoto(resp.data.url);
            });
    }, []);

    return (
        <div className={style.navbarContainer} style={{backgroundImage: `url(${dailyPhoto})`}}>

            <div className={style.titleContainer}>
                <div>ARMAGEDDON</div>
                <div>
                    <span><NavLink to={PATH.main}>Астероиды</NavLink></span>
                    <span><NavLink to={PATH.order}>Заказ</NavLink></span>
                </div>
            </div>

            <div>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</div>

            {/* <NavLink to={PATH.about}>About</NavLink> */}
        </div>
    );
}
