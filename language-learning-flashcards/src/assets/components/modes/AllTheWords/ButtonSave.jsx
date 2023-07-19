import React from 'react';

import Save from '../../../images/save.svg';
import '../../../styles/Button.scss';
import './ButtonSave.scss';

export default function ButtonSave({ onClickSave }){
    function setState( event ){
        onClickSave( event.target );
    }

    return(
        <img className = "Button ButtonSave" src = {Save} alt = "кнопка сохранить" onClick = { setState }/>
    );
}