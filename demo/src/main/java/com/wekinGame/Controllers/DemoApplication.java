package com.wekinGame.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
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

@SpringBootApplication
@RestController
public class DemoApplication {
    MongoClient mongoClient = MongoClients.create("mongodb+srv://gamer:ratio@bdwekingame.decr9eq.mongodb.net/");
    MongoDatabase database = mongoClient.getDatabase("WekinGame");

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/")
    public String testId() {
        Document searchQuery = new Document();
        searchQuery.put("_id", 1);
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

    String idEntrees;

    @GetMapping("/entrees/{idEntrees}")

    public String getEntrees(@PathVariable("idEntrees") String idEntrees) {
        Document searchQuery = new Document();
        searchQuery.put("_id", Integer.parseInt(idEntrees));
        MongoCollection<Document> collectionEntrees = database.getCollection("entrees");
        FindIterable<Document> cursor = collectionEntrees.find(searchQuery);

        String res = "";
        try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
            while (cursorIterator.hasNext()) {
                res += cursorIterator.next();
            }
        }

        return String.format(res);
    }

    @GetMapping("/searchEntry/{data}")
    public String searchEntry(@PathVariable("data") String data) {
        Document searchQuery = new Document();
        searchQuery.put("nom", new Document("$regex", data).append("$options", "i"));
        MongoCollection<Document> collection = database.getCollection("entrees");
        FindIterable<Document> cursor = collection.find(searchQuery);

        String res = "";
        try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
            while (cursorIterator.hasNext()) {
                res += cursorIterator.next();
                res += "\n";
            }
        }
        return String.format(res);
    }

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

        Document searchQuery = new Document();
        searchQuery.put("nom", new Document("$regex", "^" + prefix).append("$options", "i"));

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