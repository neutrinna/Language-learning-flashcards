import React from 'react';

import Cancel from '../../../images/cancel.svg';
import '../../../styles/Button.scss';
import './ButtonCancel.scss';

export default function ButtonCancel({ onClickCancel }){
<<<<<<< HEAD
    function cancelPressed( event ){
        onClickCancel( event.target );
    }

    return(
        <img className = "Button ButtonCancel" src = { Cancel} alt = "кнопка изменить" onClick = { cancelPressed }/>
    );
=======
  function calcelPressed( event ){
    onClickCancel( event.target );
  }
  
  return(
    <img className = "Button ButtonCancel" src = { Cancel} alt = "кнопка изменить" onClick = { calcelPressed }/>
  );
>>>>>>> f607d2767da98fcbaea8c6c9013cc7f490c91104
}

