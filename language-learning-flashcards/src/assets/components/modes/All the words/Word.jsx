import React from 'react';

import ButtonSave from './ButtonSave';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';

import './Word.scss'

export default function Word(props) {
    return(
        <section className='Word'>
            <div>{props.word}</div>
            <div>{props.transcription}</div>
            <div>{props.translation}</div>
            <div className='Word__options'>
                <ButtonSave></ButtonSave>
                <ButtonEdit></ButtonEdit>
                <ButtonDelete></ButtonDelete>
            </div>
        </section>
    )
}