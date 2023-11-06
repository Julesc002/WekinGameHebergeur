package com.wekinGame.ressources;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Sorts;

public class idGenerator {

    public static Integer newUserId(){
        MongoClient mongoClient = MongoClients.create("mongodb+srv://gamer:ratio@bdwekingame.decr9eq.mongodb.net/");
        MongoDatabase database = mongoClient.getDatabase("WekinGame");
        
        MongoCollection<Document> collectionEntrees = database.getCollection("users");
        //FindIterable<Document> cursor = collectionEntrees.find().sort();

        List<Document> sortedEntries = collectionEntrees.find()
            .projection(new Document("_id",1))
            .sort(Sorts.descending("_id"))
            .into(new ArrayList<>());
        return (Integer) sortedEntries.get(0).get("_id")+1;
        
}

}
