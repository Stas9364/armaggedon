import React from 'react';
import style from './Loader.module.css';

export const Loader = () => {
    return (
        <div>
            <div className={style.wrapper}>
                <span className={style.loader}></span>
            </div>
        </div>
    );
};

