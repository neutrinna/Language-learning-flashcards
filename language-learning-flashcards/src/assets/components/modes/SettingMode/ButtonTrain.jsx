import React from 'react';

import buttonTrain from '../../../images/buttonTrain.svg';
import './ButtonTrain.scss';

export default function ButtonTrain(){
  return(
    <img src={buttonTrain} alt="Кнопка тренировать карточки" className="ButtonTrain"/>
  );
}