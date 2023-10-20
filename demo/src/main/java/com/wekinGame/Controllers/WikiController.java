package com.wekinGame.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

@RestController
public class WikiController {

    MongoClient mongoClient = MongoClients.create("mongodb+srv://gamer:ratio@bdwekingame.decr9eq.mongodb.net/");
    MongoDatabase database = mongoClient.getDatabase("WekinGame");

    @GetMapping("/wiki/{nom}")
    public String getWiki(@PathVariable("nom") String nom) {
        Document searchQuery = new Document();
        searchQuery.put("nom", nom);
        MongoCollection<Document> collection = database.getCollection("wikis");
        FindIterable<Document> cursor = collection.find(searchQuery);

        String res = "";
        try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
            while (cursorIterator.hasNext()) {
                res += cursorIterator.next();
            }
        }

        return String.format(res);
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
            searchQuery.put("nom", new Document("$regex",prefix).append("$options", "i"));

            MongoCollection<Document> collection = database.getCollection("wikis");
            FindIterable<Document> cursor = collection.find(searchQuery);

            try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
                while (cursorIterator.hasNext()) {
                    results.add(cursorIterator.next());
                }
            }

            return results;
        }
    }
}
