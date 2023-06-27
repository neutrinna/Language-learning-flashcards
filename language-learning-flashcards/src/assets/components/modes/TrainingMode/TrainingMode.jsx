import React, {useState} from 'react';

import Slider from './Slider';
import KnowButton from './KnowButton';
import ButtonCheck from './ButtonCheck';
import DontKnowButton from './DontKnowButton';
import './TrainingMode.scss';

export default function TrainingMode(){
  const  [translateCheck, setTranslateCheck ] = useState( '' );

  const handleChange = () =>{
    setTranslateCheck( translateCheck? '' : 'display'  );
  };

  return(
    <main className="TrainingMode">
      <Slider/>
      <div className="Buttons">
        <DontKnowButton/>
        {!translateCheck&&<ButtonCheck onClick = { handleChange }/>}
        <KnowButton/>
      </div>
    </main>
  );
}