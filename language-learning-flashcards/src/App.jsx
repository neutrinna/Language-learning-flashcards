import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import Header from './assets/components/Header';
import AllTheWords from './assets/components/modes/AllTheWords/AllTheWords';
import SettingMode from './assets/components/modes/SettingMode/SettingMode';
import TrainingMode from './assets/components/modes/TrainingMode/TrainingMode';
import NotFoundPage from './assets/components/NotFoundPage';


import './App.css';

function App() {
    return (
        <div className = "App">
            <Router>
                <Header/>
                <Routes>
                    <Route path = "/" element = { <SettingMode/>}/>
                    <Route path = "/words" element = { <AllTheWords/> }/>
                    <Route path = "/game" element = { <TrainingMode/> }/>
                    <Route path = "*" element = { <NotFoundPage/> }/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
