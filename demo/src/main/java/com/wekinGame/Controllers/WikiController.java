package com.wekinGame.Controllers;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.mongodb.client.model.Sorts;

@RestController
public class WikiController {

    MongoClient mongoClient = MongoClients.create("mongodb+srv://gamer:ratio@bdwekingame.decr9eq.mongodb.net/");
    MongoDatabase database = mongoClient.getDatabase("WekinGame");
    MongoCollection<Document> collection = database.getCollection("wikis");

    @GetMapping("/wiki/{id}")
    public Document getWikiWithId(@PathVariable("id") String id) {
        Document searchQuery = new Document();
        searchQuery.put("_id", Integer.parseInt(id));

        Document result = collection.find(searchQuery).first();

        return result;
    }

    @GetMapping("/search/wiki")
    public List<Document> getWikisByPrefix(@RequestParam(value = "game") String game) {
        List<Document> results = searchWikisByPrefix(game);
        if (results.size() > 10) {
            results = results.subList(0, 10);
        }
        return results;
    }

    private List<Document> searchWikisByPrefix(String prefix) {
        List<Document> results = new ArrayList<>();
        if (prefix.length() == 0) {
            return results;
        } else {

            Document searchQuery = new Document();
            searchQuery.put("nom", new Document("$regex", prefix).append("$options", "i"));

            FindIterable<Document> cursor = collection.find(searchQuery);

            try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
                while (cursorIterator.hasNext()) {
                    results.add(cursorIterator.next());
                }
            }

            return results;
        }
    }

    @GetMapping("/wiki/{id}/content")
    public Document getContentForOneWiki(@PathVariable("id") String id) {
        Document wiki = getWikiWithId(id);

        Document searchQuery = new Document();
        searchQuery.put("id_wiki", Integer.parseInt(id));

        MongoCollection<Document> collectionEntrees = database.getCollection("entrees");
        FindIterable<Document> cursor = collectionEntrees.find(searchQuery);

        List<Document> entries = new ArrayList<>();
        try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
            while (cursorIterator.hasNext()) {
                entries.add(cursorIterator.next());
            }
        }

        // Créer une structure pour organiser les entrées par catégorie
        Map<String, List<Document>> categorizedEntries = new HashMap<>();

        for (Document entry : entries) {
            List<String> entryCategories = (List<String>) entry.get("categories");
            for (String category : entryCategories) {
                if (!categorizedEntries.containsKey(category)) {
                    categorizedEntries.put(category, new ArrayList<>());
                }
                categorizedEntries.get(category).add(entry);
            }
        }

        // Créer la liste d'objets pour la clé "categories"
        List<Document> categoryList = new ArrayList<>();
        for (Map.Entry<String, List<Document>> entry : categorizedEntries.entrySet()) {
            Document categoryObject = new Document();
            String categoryName = entry.getKey();
            categoryObject.put("nom", categoryName);
            categoryObject.put("entrees", entry.getValue());
            categoryList.add(categoryObject);
        }

        // Créer le résultat final
        Document result = new Document();
        result.put("_id", wiki.getInteger("_id"));
        result.put("nom", wiki.getString("nom"));
        result.put("date_creation", wiki.getString("date_creation"));
        result.put("description", wiki.getString("description"));
        result.put("admins", wiki.get("admins"));
        result.put("categories", categoryList);

        return result;
    }

    @GetMapping("/wikis")
    public List<Document> getAllWikis() {
        List<Document> results = new ArrayList<>();

        List<Bson> pipeline = Arrays.asList(
                Aggregates.project(Projections.fields(
                        Projections.include("_id", "nom"))),
                Aggregates.sort(Sorts.ascending("nom")));
        AggregateIterable<Document> cursor = collection.aggregate(pipeline);

        try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
            while (cursorIterator.hasNext()) {
                results.add(cursorIterator.next());
            }
        }

        return results;
    }

}
