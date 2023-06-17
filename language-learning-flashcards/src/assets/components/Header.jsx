import React from 'react';

import './Header.scss';
import logo from '../images/logo.svg';

export default function Header(){
  return(
    <nav className="Header-wrapper">
      <ul className="Header">
        <li className="Header__logo">
          <img src={logo} alt = "иконка наушников"/>
          <div className="Header__logo-text-wrapper">
            <div>ONLINE LEARNING</div>
            <h2><span>ENGLISH</span> FLASHCARDS</h2>
          </div>
        </li>
        <li className="Header__menu cards">Наборы слов</li>
        <li className="Header__menu words">Все слова</li>
      </ul>
    </nav>
  );
}