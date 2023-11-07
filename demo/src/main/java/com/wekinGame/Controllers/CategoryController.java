package com.wekinGame.Controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/category/{idWiki}/{nameCategory}")
    public List<Document> getEntryNameWithWikiIdAndCategoryName(@PathVariable("idWiki") String idWiki,
            @PathVariable("nameCategory") String nameCategory) {
        List<Document> resultsQuery = new ArrayList<Document>();
        Document searchQuery = new Document();
        searchQuery.put("id_wiki", Integer.parseInt(idWiki));
        List<Bson> pipeline = Arrays.asList(
                Aggregates.match(searchQuery),
                Aggregates.project(Projections.fields(
                        Projections.include("_id", "nom"))));
        MongoCollection<Document> collection = database.getCollection("entrees");
        AggregateIterable<Document> cursor = collection.aggregate(pipeline);

        try (final MongoCursor<Document> cursorIterator = cursor.cursor()) {
            while (cursorIterator.hasNext()) {
                resultsQuery.add(cursorIterator.next());
            }
        }
        return resultsQuery;
    }

    @PatchMapping("/wiki/{id}/category/create")
    public Map<String, String> createCategory(@PathVariable("id") String id, @RequestBody Map<String, String> request) {
        MongoCollection<Document> collectionWiki = database.getCollection("wikis");
        Document searchQuery = new Document();
        searchQuery.put("_id", Integer.parseInt(id));
        Document wiki = collectionWiki.find(searchQuery).first();

        String newCategory = request.get("nom");
        List<String> categories = (List<String>) wiki.get("categories");
        Map<String, String> response = new HashMap<>();

        if (!categories.contains(newCategory)) {
            categories.add(request.get("nom"));
            wiki.put("categories", categories);
            collectionWiki.replaceOne(searchQuery, wiki);
            response.put("code", "200");
            response.put("message", "Catégorie ajoutée avec succès");
        } else {
            response.put("code", "409");
            response.put("message", "La catégorie existe déjà");
        }

        return response;
    }

    private void removeCategoryFromWikiEntries(String idWiki, String category) {
        MongoCollection<Document> collectionEntrees = database.getCollection("entrees");

        Document searchQuery = new Document();
        searchQuery.put("id_wiki", Integer.parseInt(idWiki));
        searchQuery.put("categories", category);

        Document updateQuery = new Document("$pull", new Document("categories", category));
        collectionEntrees.updateMany(searchQuery, updateQuery);
    }

}
