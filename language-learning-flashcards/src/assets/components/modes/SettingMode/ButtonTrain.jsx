import React from 'react';
import { Link } from 'react-router-dom';

import buttonTrain from '../../../images/buttonTrain.svg';
import './ButtonTrain.scss';

export default function ButtonTrain(){
  return(
    <Link to = "/game">
      <img src = { buttonTrain } alt = "Кнопка тренировать карточки" className = "ButtonTrain"/>
    </Link>
  );
}