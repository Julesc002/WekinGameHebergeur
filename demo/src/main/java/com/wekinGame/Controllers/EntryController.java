package com.wekinGame.Controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import com.mongodb.client.model.Projections;

@RestController
public class EntryController {

    MongoClient mongoClient = MongoClients.create("mongodb+srv://gamer:ratio@bdwekingame.decr9eq.mongodb.net/");
    MongoDatabase database = mongoClient.getDatabase("WekinGame");
    
    @GetMapping("/entry/{idEntry}")
    public List<Document> getEntry(@PathVariable("idEntry") String idEntry) {
        Document searchQuery = new Document();
        searchQuery.put("_id", Integer.parseInt(idEntry));
        MongoCollection<Document> collectionEntrees = database.getCollection("entrees");
        FindIterable<Document> cursor = collectionEntrees.find(searchQuery);

        List<Document> results = new ArrayList<>();
        try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
            while (cursorIterator.hasNext()) {
                results.add(cursorIterator.next());
            }
        }

        return results;
    }

    @GetMapping("/searchEntry")
    public List<Document> searchEntry(@RequestParam(value ="name", defaultValue = "") String data) {
        List<Document> results = new ArrayList<Document>();
        if (data.length() == 0) {
            return results;
        } else {
            Document searchQuery = new Document();
            searchQuery.put("nom", new Document("$regex", data).append("$options", "i"));
            List<Bson> pipeline = Arrays.asList(
                Aggregates.match(searchQuery),  // Filtrer les documents dans la collection actuelle
                Aggregates.lookup("wikis", "id_wiki", "_id", "wiki"),  // Fusionner avec une autre collection
                Aggregates.unwind("$wiki"),  // "Déplier" le résultat de la fusion
                Aggregates.project(Projections.fields(
                    Projections.include("_id", "nom", "categories", "wiki.nom")  // Sélectionner les champs nécessaires
                ))
            );

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
}
