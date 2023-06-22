import React from 'react';

import Edit from '../../../images/edit.svg';
import '../../../styles/Button.scss';
import './ButtonEdit.scss';

export default function ButtonEdit({ onClick }){
  function setState(e){
    onClick(e.target);
  }
  return(
    <img className="Button ButtonEdit" src={Edit} alt="кнопка изменить" onClick={setState}/>
  );
}

