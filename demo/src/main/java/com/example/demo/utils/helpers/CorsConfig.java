package com.example.demo.utils.helpers; // <--- Asegúrate que esto coincida con tu estructura de carpetas

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Aplica a TODAS las URLs de tu API
                        .allowedOrigins("http://localhost:5173") // Solo permite a tu React
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // <--- AQUÍ está la clave
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}