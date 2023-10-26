package com.wekinGame.Model;

public class Donnees {
    String titre;
    String contenu;

    public Donnees(String titre, String contenu){
        this.titre = titre;
        this.contenu = contenu;
    }
    public String getTitre(){
        return this.titre;
    }
    public String getContenu(){
        return this.contenu;
    }
    public void setTitre(String titre){
        this.titre = titre;
    }
    public void setContenu(String contenu){
        this.contenu = contenu;
    }
}

