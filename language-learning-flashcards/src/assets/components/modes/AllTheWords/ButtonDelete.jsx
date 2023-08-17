import React from 'react';

import Delete from '../../../images/delete.svg';
import '../../../styles/Button.scss';
import './ButtonDelete.scss';

export default function ButtonDelete( props ){

    const deleteWord = () => {
        props.setIsDeleted( true );

        fetch( `api/words/${props.id}/delete`, {
            method: 'POST',
            body: JSON.stringify( '' ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then( response => response.json() )
            .then( response => {
                console.log( response );
            })
            .catch( error => console.log( `Ошибка отправки слова на сервер: ${error}` ));
    };

    return(
        <img className = "ButtonDelete Button" src = { Delete } alt = "кнопка удалить" onClick = { deleteWord }/>
    );
}                                                                                                               