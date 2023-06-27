import React, {useState} from 'react';

import data from '../../../data/colors.json';

import WordCard from './WordCard';

import './Slider.scss';

let offset = 0;

export default function Slider( props ){
    const [offsetLeft, setOffset] = useState(0);

    const offsetBack = () => {
        offset -= 67;
    if (offset < 0) {
        offset = 67 * 8;
    };
    setOffset(-offset);
    };

    const offsetNext = () => {
        offset += 67;
        if (offset > 67 * 8) {
            offset = 0;
        };
        setOffset(-offset);
    }

  return(
    <div className="Slider">
        <button className = "buttons-slider"  onClick = { offsetBack }>Назад</button>
        <div className="Slider-wripper">
            <div className = "Slider-line">
                <div className = "Slider-frame" style = { { left: offsetLeft + 'vh' } }>
                    {data.map(( word, index ) => {
                    return(
                        <WordCard key = { index } { ...word }/> );})
                    }
                </div>
            </div>
        </div>
        <button className = "buttons-slider" onClick={ offsetNext }>Вперед</button>
    </div>
  );
}

WordCard.defaultProps = {data};