import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from '../config';
import AjoutCategorie from "./AjoutCategorie";

function WikiContent() {
    const { id } = useParams();
    const [wiki, setWiki] = useState(null);
    const navigate = useNavigate();

    const handleRetourClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        searchDataWiki(id);
    }, [id]);

    const searchDataWiki = (id) => {
        axios.get(`${API_URL}/wiki/${id}/content`).then((res) => {
            setWiki(res.data);
        }).catch((error) => {
            console.error(error);
        });
    };

    const isUserAdmin = () => {
        if (localStorage.getItem('account') !== null && wiki) {
            const isAdmin = wiki.admins.some((adminId) => adminId === parseInt(localStorage.getItem('account')));
            return isAdmin;
        }
        return false;
    };

    function deleteEntry(entryId) {
        axios.get(`${API_URL}/delete/entry/${entryId}`).then((res) => {
            if (res.status === 200) {
                alert('Entrée supprimée avec succès');
                setTimeout(() => {
                    window.location.reload();
                }, 1);
            } else if (res.data.code === "409") {
                alert("Erreur lors de la suppression de l'entrée");
            }
        }).catch((error) => {
            console.error(error);
            alert("Erreur lors de la suppression de l'entrée");
        });
    };

    return (
        <div>
            <h2>Wiki {wiki?.nom || ""}</h2>
            <p>{wiki?.description || ""}</p>
            {isUserAdmin() && (
                <div>
                    <h3>Ajouter une catégorie :</h3>
                    <AjoutCategorie />
                    <Link to={`/wiki/${wiki?._id || ""}/ajoutEntree`}>
                        <button style={{ cursor: 'pointer' }}>Ajouter une entrée</button>
                    </Link>
                </div>
            )}
            {wiki && wiki.categories.length === 0 ? (
                <p className="append">Aucune entrée dans le wiki.</p>
            ) : (
                wiki && wiki.categories.map((categorie) => (
                    <div key={categorie._id}>
                        <Link to={`/categorie/${wiki?._id || ""}/${categorie.nom}`}>
                            <h3 style={{ cursor: 'pointer' }}>{categorie.nom} :</h3>
                        </Link>
                        {categorie.entrees.map((entree) => (
                            <div key={entree._id}>
                                <Link to={`/entree/${entree._id}`}>
                                    <p className="append">{entree.nom}</p>
                                </Link>
                                {isUserAdmin() && (
                                    <button onClick={() => deleteEntry(entree._id)}>Supprimer</button>
                                )}
                            </div>
                        ))}
                    </div>
                ))
            )}
            <button style={{ cursor: 'pointer' }} onClick={handleRetourClick}>Retour</button>
        </div>
    );
}

export default WikiContent;
