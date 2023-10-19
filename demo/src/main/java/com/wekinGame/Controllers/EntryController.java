package com.wekinGame.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

public class EntryController {

    MongoClient mongoClient = MongoClients.create("mongodb+srv://gamer:ratio@bdwekingame.decr9eq.mongodb.net/");
    MongoDatabase database = mongoClient.getDatabase("WekinGame");
    
    @GetMapping("/entry/{idEntry}")
    public String getEntry(@PathVariable("idEntry") String idEntry) {
        Document searchQuery = new Document();
        searchQuery.put("_id", Integer.parseInt(idEntry));
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

    @GetMapping("/searchEntry")
    public List<Document> searchEntry(@RequestParam(value ="name", defaultValue = "") String data) {
        List<Document> results = new ArrayList<Document>();
        Document searchQuery = new Document();
        searchQuery.put("nom", new Document("$regex", data).append("$options", "i"));
        MongoCollection<Document> collection = database.getCollection("entrees");
        FindIterable<Document> cursor = collection.find(searchQuery);

        try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
            while (cursorIterator.hasNext()) {
                results.add(cursorIterator.next());
            }
        }
        return results;
    }
}
