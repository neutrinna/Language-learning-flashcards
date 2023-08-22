import React from 'react';

import Delete from '../../../images/delete.svg';
import '../../../styles/Button.scss';
import './ButtonDelete.scss';

export default function ButtonDelete( props ){

    const handleClick =  () => {
        props.setIsDeleted( true );
        props.deleteWord( props.id );
    };

    return(
        <img className = "ButtonDelete Button" src = { Delete } alt = "кнопка удалить" onClick = { handleClick }/>
    );
}                                                                                                               