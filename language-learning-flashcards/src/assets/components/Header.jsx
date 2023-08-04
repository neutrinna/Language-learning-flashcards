import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import logo from '../images/logo.svg';

export default function Header(){
    return(
        <nav className = "Header-wrapper">
            <ul className = "Header">
                <li>
                    <Link to = "/" className = "Header__logo Link">
                        <img src = {logo} alt = "Иконка наушников"/>
                        <div className = "Header__logo-text-wrapper">
                            <div>ONLINE LEARNING</div>
                            <h2><span>ENGLISH</span> FLASHCARDS</h2>
                        </div>
                    </Link>
                </li>
                <li className = "Header__menu words">
                    <Link to = "/words" className = "Header__link Link">Все слова</Link> 
                </li>
                <li className = "Header__menu cards">
                    <Link to = "/game" className = "Header__link Link">Тренировка</Link>
                </li>
            </ul>
        </nav>
    );
}