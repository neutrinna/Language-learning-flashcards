import React from 'react';
import SetOfWords from './SetOfWords';

import './SettingMode.scss'

export default function SettingMode(){
    return(
        <main className='SettingMode'>
            <h1>Карточки английских слов c переводом</h1>
            <p>Перед вами наборы карточек английских слов, с разбивкой по темам, которые помогут вам изучать английский язык и запоминать новые английские слова. Развивайте свой словарный запас, тренируя по несколько десятков слов в день, динамично улучшая свой английский! </p>
            <div className='SettingMode__container'>
                <SetOfWords></SetOfWords>
                <SetOfWords></SetOfWords>
                <SetOfWords></SetOfWords>
                <SetOfWords></SetOfWords>
                <SetOfWords></SetOfWords>
                <SetOfWords></SetOfWords>
                <SetOfWords></SetOfWords>
                <SetOfWords></SetOfWords>
            </div>
        </main>
    )
}