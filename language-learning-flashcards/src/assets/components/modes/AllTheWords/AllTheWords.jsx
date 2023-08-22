import React from 'react';
import { observer } from 'mobx-react-lite';

import data from '../../../data/colors.json';

import Word from './Word';

import './AllTheWords.scss';

const AllTheWords = observer( () => {
    return(
        <main className="AllTheWords">
            <div className="AllTheWords__title">
                <div>Слово</div>
                <div>Транскрипция</div>
                <div>Перевод</div>
            </div>{
                data.map(( word, index ) => {
                    return(
                        <Word
                            key = { index }
                            { ...word }/>
                    );
                })
            }
        </main>
    );
})

export default AllTheWords;