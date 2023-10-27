import React from 'react';
import { APP_URL } from '../config';
import '../styles/components/_header.css';

function ButtonsAccount() {

    const handleButtonClick = () => {
        window.location.href =`${APP_URL}/account/connect`;
    }

    const handleButtonClickProfile = () => {
        window.location.href =`${APP_URL}/account/info`;
    }

    const isAccountEmpty = !localStorage.getItem('account');

    return (
        <div>
            {isAccountEmpty ? (
                <button style={{ cursor: 'pointer' }} onClick={handleButtonClick}>Se connecter</button>
            ) : (
                <button style={{ cursor: 'pointer' }} onClick={handleButtonClickProfile}>Profil</button>
            )}
        </div>
    )
}

export default ButtonsAccount;
