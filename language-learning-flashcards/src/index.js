import React from 'react';
import ReactDOM from 'react-dom/client';

import WordsStore from './assets/stores/WordsStore';
import './index.css';
import App from './App';

const wordsStore = new WordsStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App wordsStore = { wordsStore }/>
    </React.StrictMode>
);


