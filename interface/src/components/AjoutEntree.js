import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, APP_URL } from '../config';

function AjoutEntree() {
    const { id } = useParams();
    const [entree, setEntree] = useState();
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoriesForEntree, setCategoriesForEntree] = useState([]);
    const [donnees, setDonnees] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleRetourClick = () => {
        navigate(-1);
    };

    const majNameEntree = (e) => {
        setName(e.target.value);
    };

    useEffect(() => {
        const majEntree = {
          nom: name,
          id_wiki: id,
          categories: categoriesForEntree,
          donnees: donnees.map((donnee) => ({
            titre: donnee[0],
            contenu: donnee[1]
          }))
        };
        setEntree(majEntree);
      }, [name, id, categoriesForEntree, donnees]);
      

      const addEntree = () => {
        const checkContentDonnees = donnees.some(function (donnee) {
            return donnee[0].trim().length === 0 || donnee[1].trim().length === 0;
        });
    
        if (name.trim().length === 0) {
            setErrorMessage("Veuillez donner un titre à votre entrée");
        } else if (categoriesForEntree.length === 0) {
            setErrorMessage("Veuillez sélectionner une catégorie");
        } else if (donnees.length === 0) {
            setErrorMessage("Veuillez ajouter une donnée à votre entrée");
        } else if (checkContentDonnees) {
            setErrorMessage("Veuillez compléter les champs de votre/vos donnee(s)");
        } else {
            setErrorMessage("");
            axios.post(API_URL + '/create/entry', entree).then((response) => {
                if (response.status === 200) {
                    alert('Entree ajoutée avec succès');
                    setTimeout(() => {
                        window.location.href = `${APP_URL}/wiki/${id}`;
                    }, 1);
                } else if (response.data.code === "409") {
                    alert("Erreur lors de la création de l'entrée");
                }
            });
        }
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
          setCategoriesForEntree((prevCategories) => [...prevCategories, name]);
        } else {
          setCategoriesForEntree((prevCategories) => prevCategories.filter((item) => item !== name));
        }
    };

    const handleAjoutDonnee = () => {
        const nouvelleDonnee = ["", ""];
        const donneesCopie = [...donnees];
        donneesCopie.push(nouvelleDonnee);
        setDonnees(donneesCopie);
    };

    const handleSupprDonnee = (index) => {
        const donneesCopie = [...donnees];
        donneesCopie.splice(index, 1);
        setDonnees(donneesCopie);
    };

    const handleMajDonneeTitle = (e, index) => {
        const donneesCopie = [...donnees];
        donneesCopie[index][0] = e.target.value;
        setDonnees(donneesCopie);
    };

    const handleMajDonneeContent = (e, index) => {
        const donneesCopie = [...donnees];
        donneesCopie[index][1] = e.target.value;
        setDonnees(donneesCopie);
    };

    useEffect(() => {
        getCategories(id);
    });

    const getCategories = (id) => {
        axios.get(`${API_URL}/wiki/` + id).then((res) => {
            setCategories(res.data.categories);
        });
    };

    return (
        <div>
            <input type="text" placeholder="Nom de l'entrée" onChange={(e) => majNameEntree(e)} />
            {categories && categories.map(function (categorie) {
                return (
                    <div>
                        <input type="checkbox" name={categorie} onChange={handleCheckboxChange}/>
                        <label for={categorie}>{categorie}</label>
                    </div>
                );
            })}
            {donnees && donnees.map(function (donnee, index) {
                return (
                    <div key={index}>
                        <input type="text" placeholder="Titre" value={donnees[index][0]} onChange={(e) => handleMajDonneeTitle(e, index)} />
                        <textarea value={donnees[index][1]} onChange={(e) => handleMajDonneeContent(e, index)} ></textarea>
                        <button style={{ cursor: 'pointer' }} onClick={() => handleSupprDonnee(index)}>-</button>
                    </div>
                );
            })}
            <button style={{ cursor: 'pointer' }} onClick={handleAjoutDonnee}>+</button>
            <button style={{ cursor: 'pointer' }} onClick={addEntree}>Ajouter l'entrée</button>
            <button style={{ cursor: 'pointer' }} onClick={handleRetourClick}>Retour</button>
            <p>{errorMessage}</p>
        </div>
    );
}

export default AjoutEntree;