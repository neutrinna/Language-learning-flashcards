import Header from './assets/components/Header';
import SettingMode from './assets/components/modes/SettingMode/SettingMode';
import AllTheWords from './assets/components/modes/All the words/AllTheWords';
import TrainingMode from './assets/components/modes/Training/TrainingMode';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header></Header>

      <SettingMode></SettingMode>

      <AllTheWords></AllTheWords>

      <TrainingMode></TrainingMode>
    </div>
  );
}

export default App;
