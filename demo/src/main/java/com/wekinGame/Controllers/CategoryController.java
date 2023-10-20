package com.wekinGame.Controllers;

import org.bson.Document;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

@RestController
public class CategoryController {
    
    MongoClient mongoClient = MongoClients.create("mongodb+srv://gamer:ratio@bdwekingame.decr9eq.mongodb.net/");
    MongoDatabase database = mongoClient.getDatabase("WekinGame");

    @GetMapping("/category/{idWiki}")
    public Object getCategoryWithIdWiki(@PathVariable("idWiki") String idWiki) {
        Document searchQuery = new Document();
        searchQuery.put("_id", Integer.parseInt(idWiki));

        MongoCollection<Document> collection = database.getCollection("wikis");
        FindIterable<Document> cursor = collection.find(searchQuery);

        Document resultsQuery = new Document();
        try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
            while (cursorIterator.hasNext()) {
                resultsQuery = cursorIterator.next();
            }
        }

        return resultsQuery.get("categories");
    }

    
}
