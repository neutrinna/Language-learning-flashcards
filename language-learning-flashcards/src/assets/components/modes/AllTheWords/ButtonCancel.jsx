import React from 'react';

import Cancel from '../../../images/cancel.svg';
import '../../../styles/Button.scss';
import './ButtonCancel.scss';

export default function ButtonCancel({ onClickCancel }){

    function cancelPressed( event ){
        onClickCancel( event.target );
    }

    return(
        <img className = "Button ButtonCancel" src = { Cancel} alt = "кнопка изменить" onClick = { cancelPressed }/>
    );

}

