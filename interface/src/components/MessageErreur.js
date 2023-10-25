import React from 'react';
import { Link } from "react-router-dom";

const MessageErreur = () => {
    return (
        <div>
            <h1>Mince cette page n'existe pas</h1>
            <h6>fin c'est sad la commu...</h6>
            <Link to={`/`}>
                <button style={{ cursor: 'pointer' }}>Retourer à l'accueil</button>
            </Link>
        </div>
    );
};

export default MessageErreur;