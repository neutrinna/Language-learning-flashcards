import React, { useState, useEffect } from 'react';

import Save from '../../../images/save.svg';
import '../../../styles/Button.scss';
import './ButtonSave.scss';

export default function ButtonSave( props ) {
    const absentInput = props.absentInput;

    const [ totalAbsentInputState, setTotalAbsentInputState ] = useState( false );

    useEffect(() => {
        setTotalAbsentInputState( absentInput.word||absentInput.translation||absentInput.transcription );
    }, [ absentInput ]);

    function setState( e ){
        props.onClickSave( e.target );
    }

    return(
        <button className = { totalAbsentInputState ?  'Button ButtonSave disabled' : 'Button ButtonSave' } 
            disabled = { totalAbsentInputState ? true : false } onClick = { setState }>
            <img  src = { Save } alt = "кнопка сохранить" />
        </button>
    );
};
