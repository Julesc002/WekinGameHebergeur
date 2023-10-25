package com.wekinGame.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wekinGame.ressources.Hasher;

@RestController
public class Test {
    @GetMapping("/")
    public String hash(){
        return (Hasher.hashPassword("PulpFiction"));
    }
}
