import React from 'react';

import './Error.scss';
import warning from '../images/warning-error.svg';

export default function Error( props ){
    return(
        <div className = "Error">
            <img src = { warning } className = "Error__img"
                alt = "Предупреждение об ошибке. Восклицательный знак на треугольной табличке" />
            <div className = "Error__notification">
                <h2>Произошла ошибка</h2>
                <h1>{ props.name }</h1>
                <h3>{ props.message }</h3>
            </div>
        </div>
    );
}