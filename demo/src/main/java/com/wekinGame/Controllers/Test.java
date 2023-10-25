package com.wekinGame.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wekinGame.ressources.Hasher;
import com.wekinGame.ressources.idGenerator;

@RestController
public class Test {
    @GetMapping("/")
    public String hash(){
        return ""+idGenerator.newUserId();
        //return (Hasher.hashPassword("PulpFiction"));
    }
}
