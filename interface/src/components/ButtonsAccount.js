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
                <button class="button-highlight text-medium" onClick={handleButtonClick}>Se connecter</button>
            ) : (
                <button class="text-medium" onClick={handleButtonClickProfile}>Profil</button>
            )}
        </div>
    )
}

export default ButtonsAccount;
