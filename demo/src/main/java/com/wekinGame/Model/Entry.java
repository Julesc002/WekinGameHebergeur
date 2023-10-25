package com.wekinGame.Model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.ResponseBody;

@Document(collection = "entrees")
public class Entry {

    @Id
    private int _id;

    private String nom;
    private int id_wiki;
    private List<String> categories;
    private ArrayList<Donnees> donnees;

    // Getters and setters...

    /*public Entry(String nom, int id_wiki, String[] categories, Donnees[] donnees) {
        this.nom = nom;
        this.id_wiki = id_wiki;
        this.categories = categories;
        this.donnees = donnees;
    }*/

    public int getId(){
        return _id;
    }
    public void setId(int _id){
        this._id=_id;
    }
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getId_wiki() {
        return id_wiki;
    }

    public void setId_wiki(int id_wiki) {
        this.id_wiki = id_wiki;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    @ResponseBody
    public ArrayList<Donnees> getDonnees() {
        return donnees;
    }

    public void setDonnees(ArrayList<Donnees> donnees) {
        this.donnees = donnees;
    }
}