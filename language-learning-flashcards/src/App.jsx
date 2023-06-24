import React from 'react';

import Header from './assets/components/Header';
import SettingMode from './assets/components/modes/SettingMode/SettingMode';
import AllTheWords from './assets/components/modes/AllTheWords/AllTheWords';
import TrainingMode from './assets/components/modes/TrainingMode/TrainingMode';

import './App.css';

function App() {

  return (
    <div className = "App">
      <Header/>

      <SettingMode />

      <AllTheWords />

      <TrainingMode /> 
    </div>
  );
}

export default App;
