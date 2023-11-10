package com.wekinGame.Controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.result.UpdateResult;
import com.wekinGame.Model.Entry;

@RestController
public class EntryController {

    MongoClient mongoClient = MongoClients.create("mongodb+srv://gamer:ratio@bdwekingame.decr9eq.mongodb.net/");
    MongoDatabase database = mongoClient.getDatabase("WekinGame");
    Entry entry;

    @GetMapping("/entry/{idEntry}")
    public List<Document> getEntry(@PathVariable("idEntry") String idEntry) {
        Document searchQuery = new Document();
        searchQuery.put("_id", Integer.parseInt(idEntry));
        MongoCollection<Document> collectionEntrees = database.getCollection("entrees");
        FindIterable<Document> cursor = collectionEntrees.find(searchQuery);

        List<Document> results = new ArrayList<>();
        try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
            while (cursorIterator.hasNext()) {
                Document entry = cursorIterator.next();
                String nomWiki = getNomWiki(entry.getInteger("id_wiki"));
                entry.put("nom_wiki", nomWiki);
                results.add(entry);
            }
        }

        return results;
    }

    /*
     * @GetMapping("/entry/{idEntry}")
     * public EntryDTO getEntry(@PathVariable("idEntry") String idEntry) {
     * Entry entry = repository.findOne(Integer.parseInt(idEntry));
     * return mapper.toDTO(entry);
     * }
     */

    private String getNomWiki(int idWiki) {
        MongoCollection<Document> collectionWikis = database.getCollection("wikis");
        Document searchQuery = new Document();
        searchQuery.put("_id", idWiki);
        FindIterable<Document> cursor = collectionWikis.find(searchQuery);

        try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
            if (cursorIterator.hasNext()) {
                Document wiki = cursorIterator.next();
                return wiki.getString("nom");
            }
        }

        return null;
    }

    // private String getNomWiki(int idWiki) {
    // MongoCollection<Document> collectionWikis = database.getCollection("wikis");
    // Document searchQuery = new Document();
    // searchQuery.put("_id", idWiki);
    // FindIterable<Document> cursor = collectionWikis.find(searchQuery);

    // try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
    // if (cursorIterator.hasNext()) {
    // Document wiki = cursorIterator.next();
    // return wiki.getString("nom");
    // }
    // }

    // return null;
    // }

    @GetMapping("/searchEntry")
    public List<Document> searchEntry(@RequestParam(value = "name", defaultValue = "") String data) {
        List<Document> results = new ArrayList<Document>();
        if (data.length() == 0) {
            return results;
        } else {
            Document searchQuery = new Document();
            searchQuery.put("nom", new Document("$regex", data).append("$options", "i"));
            List<Bson> pipeline = Arrays.asList(
                    Aggregates.match(searchQuery), // Filtrer les documents dans la collection actuelle
                    Aggregates.lookup("wikis", "id_wiki", "_id", "wiki"), // Fusionner avec une autre collection
                    Aggregates.unwind("$wiki"), // "Déplier" le résultat de la fusion
                    Aggregates.project(Projections.fields(
                            Projections.include("_id", "nom", "categories", "wiki.nom", "wiki._id") // Sélectionner les
                                                                                                    // champs
                                                                                                    // nécessaires
                    )));

            MongoCollection<Document> collection = database.getCollection("entrees");
            AggregateIterable<Document> cursor = collection.aggregate(pipeline);

            try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
                while (cursorIterator.hasNext()) {
                    results.add(cursorIterator.next());
                }
            }
            return results;
        }
    }

    @GetMapping("/searchEntryByDesc")
    public List<Document> searchEntryByDesc(@RequestParam(value = "name", defaultValue = "") String data) {
        List<Document> results = new ArrayList<Document>();
        if (data.length() == 0) {
            return results;
        } else {
            Document criteria1 = new Document("donnees.titre", new Document("$regex", data).append("$options", "i"));
            Document criteria2 = new Document("donnees.contenu", new Document("$regex", data).append("$options", "i"));
            List<Document> searchParameters = new ArrayList<>();

            searchParameters.add(criteria1);
            searchParameters.add(criteria2);
            Document searchQuery = new Document("$or", searchParameters);

            List<Bson> pipeline = Arrays.asList(
                    Aggregates.match(searchQuery), // Filtrer les documents dans la collection actuelle
                    Aggregates.lookup("wikis", "id_wiki", "_id", "wiki"), // Fusionner avec une autre collection
                    Aggregates.unwind("$wiki"), // "Déplier" le résultat de la fusion
                    Aggregates.project(Projections.fields(
                            Projections.include("_id", "nom", "categories", "wiki.nom", "wiki._id") // Sélectionner les
                                                                                                    // champs
                                                                                                    // nécessaires
                    )));

            MongoCollection<Document> collection = database.getCollection("entrees");
            AggregateIterable<Document> cursor = collection.aggregate(pipeline);

            try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
                while (cursorIterator.hasNext()) {
                    results.add(cursorIterator.next());
                }
            }
            return results;
        }
    }

    @PostMapping("/create/entry")
    public ResponseEntity<String> createEntry(@RequestBody Entry entry) {
        try {
            if (entry.getCategories().size() == 0 && entry.getDonnees().size() == 0 && entry.getId_wiki() < 0
                    && entry.getNom() == null) {
                return new ResponseEntity<>("400 Bad Request", HttpStatus.BAD_REQUEST);
            }

            MongoCollection<Document> collection = database.getCollection("entrees");
            List<Document> donneesToTransfer = new ArrayList<Document>();
            for (int i = 0; i < entry.getDonnees().size(); i++) {
                donneesToTransfer.add(new Document()
                        .append("titre", entry.getDonnees().get(i).getTitre())
                        .append("contenu", entry.getDonnees().get(i).getContenu()));
            }
            Document dataToTransfer = new Document("_id", getIdMax() + 1)
                    .append("nom", entry.getNom())
                    .append("id_wiki", entry.getId_wiki())
                    .append("categories", entry.getCategories())
                    .append("donnees", donneesToTransfer);

            System.out.println(dataToTransfer);

            collection.insertOne(dataToTransfer);
            return new ResponseEntity<>("200 OK", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace(); // Affichez l'erreur dans la console pour le débogage.
            return new ResponseEntity<>("500 Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Integer getIdMax() {

        MongoCollection<Document> collectionEntrees = database.getCollection("entrees");

        List<Document> sortedEntries = collectionEntrees.find()
                .projection(new Document("_id", 1))
                .sort(Sorts.descending("_id"))
                .into(new ArrayList<>());
        return (Integer) sortedEntries.get(0).get("_id");

    }

    @GetMapping("/delete/entry/{_id}")
    public void deleteEntry(@PathVariable Integer _id) {
        MongoCollection<Document> collectionEntrees = database.getCollection("entrees");

        collectionEntrees.deleteOne(Filters.eq("_id", _id));

    }

    @PutMapping("/modify/entry/{_id}")
    public ResponseEntity<String> modifyEntry(@RequestBody Entry entry, @PathVariable Integer _id) {
        try {
            if (entry.getCategories().size() == 0 && entry.getDonnees().size() == 0 && entry.getId_wiki() < 0
                    && entry.getNom() == null) {
                return new ResponseEntity<>("400 Bad Request", HttpStatus.BAD_REQUEST);
            }

            MongoCollection<Document> collection = database.getCollection("entrees");
            List<Document> donneesToTransfer = new ArrayList<Document>();
            for (int i = 0; i < entry.getDonnees().size(); i++) {
                donneesToTransfer.add(new Document()
                        .append("titre", entry.getDonnees().get(i).getTitre())
                        .append("contenu", entry.getDonnees().get(i).getContenu()));
            }
            Document dataToTransfer = new Document("$set", new Document()
                    .append("nom", entry.getNom())
                    .append("id_wiki", entry.getId_wiki())
                    .append("categories", entry.getCategories())
                    .append("donnees", donneesToTransfer));

            UpdateResult result = collection.updateOne(Filters.eq("_id", _id), dataToTransfer);
            if (result.getModifiedCount() == 0) {
                return new ResponseEntity<>("404 Not Found", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>("200 OK", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace(); // Affichez l'erreur dans la console pour le débogage.
            return new ResponseEntity<>("500 Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
