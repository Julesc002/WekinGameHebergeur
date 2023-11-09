import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, APP_URL } from '../config';

function AdminWiki() {
    const { wikiId} = useParams();
    const [admin, setadmin] = useState([]);
    const [pseudo, setPseudo] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleRetourClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        getEntree();
    }, [wikiId]);

    const getEntree = () => {
        axios.get(`${API_URL}/wiki/${wikiId}/admin`).then((res) => {
            setadmin(res.data);
            console.log(res.data);
        });
    };

    const addToAdmin = () => {
        if (pseudo.trim().length === 0) {
            setErrorMessage("Veuillez insérer un pseudo");
        } else {
            setErrorMessage("");
            axios.patch(API_URL + `/wiki/${wikiId}/admin/new`).then((response) => {
                if (response.status === 200) {
                    window.location.href = `${APP_URL}/wiki/${wikiId}`;
                } else if (response.data.code === "409") {
                    alert("Erreur lors de la modification de l'entrée");
                }
            });
        }
    };
    const handleSupprAdmin = (index,id) => {
        console.log(id);
    };

    const majPseudo = (e) => {
        setPseudo(e.target.value);
    };

    return (
        <div className="flex-down">
            {admin[0] && admin[0] && (
                <>
                    <h2>Gestion des administrateurs :</h2>
                    <label>
                        Ajouter un adinistrateur :
                        <input type="text" placeholder='pseudo' onChange={(e) => majPseudo(e)}/>
                    </label>
                    <button onClick={addToAdmin(pseudo)}> Ajouter l'utilisateur aux administateurs</button>
                    <p>{errorMessage}</p>
                    <label>
                        Administateurs Actuels :
                        {admin[0].adminsdata && admin[0].adminsdata.map(function (donnee, index) {
                            return (
                                <div key={index} class="small-box-content flex-down">
                                        <div class="flex-spaced">
                                            <p>{donnee.pseudo}</p>
                                            {donnee._id == localStorage.getItem('user')(
                                                <button class="float-right" onClick={() => handleSupprAdmin(index,donnee._id)}>x</button>
                                            )}
                                        </div>
                                </div>
                            );
                        })}
                    </label>
                    <br/>
                    <button onClick={handleRetourClick}>Retour</button>
                </>
            )}
        </div>
    );
    
}

export default AdminWiki;