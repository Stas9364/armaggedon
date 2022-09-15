import React from 'react';
import style from './Loader.module.css';

export const Loader = () => {
    return (
        <div style={{margin: '50px'}}>
            <span className={style.loader}></span>
        </div>
    );
};

