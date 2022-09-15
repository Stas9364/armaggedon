import React from 'react';
import style from './PageAbout.module.css';
import '../GeneralStyle.css';
import {useLocation} from 'react-router-dom';

export function About() {
    const {state} = useLocation();
    console.log(state)
  return (
    <div className="container">
      ABOUT PAGE
    </div>
  );
}
