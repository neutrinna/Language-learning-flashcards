import React from 'react';

import '../../../styles/ButtonsTraining.scss';
import './ButtonCheck.scss';

export default function ButtonChek({ onClick }){
  const handleChange = (event) => {
    onClick( event.target );};

  return(
    <button className = "ButtonsTrainining ButtonCheck" onClick = { handleChange }>Проверить
    </button>
  );
}