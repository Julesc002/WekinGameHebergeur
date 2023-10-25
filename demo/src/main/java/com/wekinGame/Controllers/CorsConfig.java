package com.wekinGame.Controllers;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000") // Autoriser uniquement les requêtes depuis ce domaine
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE") // Méthodes HTTP autorisées
            .allowCredentials(true); // Autoriser les cookies, si nécessaire
    }
}