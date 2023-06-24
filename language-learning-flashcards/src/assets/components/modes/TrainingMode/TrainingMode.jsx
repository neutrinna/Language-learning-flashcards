import React, {useState} from 'react';

import WordCard from './WordCard';
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
      <WordCard translateCheck = {translateCheck}/>
      <div className="Buttons">
        <DontKnowButton/>
        {!translateCheck&&<ButtonCheck onClick = { handleChange }/>}
        <KnowButton/>
      </div>
    </main>
  );
}