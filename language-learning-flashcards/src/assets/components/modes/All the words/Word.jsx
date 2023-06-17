import React from 'react';

import ButtonSave from './ButtonSave';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';

import './Word.scss'

export default function Word( props ) {
    let buttonsState = true;

    function changeBatonsState(){
        // что-то, меняющее buttonsState
    }

    return(
            buttonsState?
            <section className='Word'>
                <div className='Word__property'>{ props.word }</div>
                <div  className='Word__property'>{ props.transcription }</div>
                <div  className='Word__property'>{ props.translation }</div>
                <div className='Word__options'>
                    <ButtonEdit onClick = { changeBatonsState }></ButtonEdit>
                    <ButtonDelete></ButtonDelete>
                </div>
            </section>
            : <section className='Word Word__active'>
                <div className='Word__property'><input type="text" value={ props.word } /></div>
                <div className='Word__property'><input type="text" value={ props.transcription }/></div>
                <div className='Word__property'><input type="text" value={ props.translation }/></div>
                <div className='Word__options'>
                    <ButtonSave onClick = { changeBatonsState }></ButtonSave>
                    <ButtonDelete></ButtonDelete>
                </div>
            </section>
    )
}

