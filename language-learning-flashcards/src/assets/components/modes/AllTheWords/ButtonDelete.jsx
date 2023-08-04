import React from 'react';

import Delete from '../../../images/delete.svg';
import '../../../styles/Button.scss';
import './ButtonDelete.scss';

export default function ButtonDelete(){
    return(
        <img className = "ButtonDelete Button" src = { Delete } alt = "кнопка удалить"/>
    );
}                                                                                                               