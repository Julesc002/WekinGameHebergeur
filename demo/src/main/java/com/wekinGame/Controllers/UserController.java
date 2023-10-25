package com.wekinGame.Controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

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
import com.wekinGame.ressources.Hasher;

@RestController
public class UserController{
    public static Pattern EMAIL_REGEX = Pattern.compile(
        "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
    MongoClient mongoClient = MongoClients.create("mongodb+srv://gamer:ratio@bdwekingame.decr9eq.mongodb.net/");
    MongoDatabase database = mongoClient.getDatabase("WekinGame");


    @GetMapping("/users/new")
    public Document createUser(@RequestParam(value="username")String username, @RequestParam(value="password")String password,@RequestParam(value="email")String email,@RequestParam(value="bday")String bday){
        Document criteria1 = new Document("pseudo", new Document("$regex", "^"+username+"$").append("$options", "i"));
        Document criteria2 = new Document("donnees.contenu", new Document("$regex", "^"+email+"$").append("$options", "i"));
        List<Document> searchParameters = new ArrayList<>();

        searchParameters.add(criteria1);
        searchParameters.add(criteria2);
        Document searchQuery = new Document("$or", searchParameters);

        MongoCollection<Document> collection = database.getCollection("users");
        FindIterable<Document> cursor = collection.find(searchQuery);

        final MongoCursor<Document> cursorIterator = cursor.cursor();
        if(cursorIterator.hasNext()){
            return new Document("msg","try to change email address or username");
        }
        Document dataToTranser = new Document("pseudo",username)
            .append("mail",email)
            .append("mdp",Hasher.hashPassword(password))
            .append("date_naissance",bday);
        collection.insertOne(dataToTranser);
        return new Document("msg","mail envoyé");
    }

    @GetMapping("/users/{id}/delete")
    public Document DeleteUser(@PathVariable int id){
        Document criteria1 = new Document("_id",id);
        MongoCollection<Document> collection = database.getCollection("users");
        FindIterable<Document> cursor = collection.find(criteria1);

        final MongoCursor<Document> cursorIterator = cursor.cursor();
        if(cursorIterator.hasNext()){
            collection.deleteOne(criteria1);
            return new Document("msg","deletion complete");
        }
        return new Document("msg","try to change email address or username");
    }
}