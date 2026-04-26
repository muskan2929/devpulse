package com.devpulse.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient githubClient() {
        return WebClient.builder().baseUrl("https://api.github.com").build();
    }

    @Bean
    public WebClient mlClient() {
        return WebClient.builder().baseUrl(System.getenv().getOrDefault("ML_SERVICE_URL","http://localhost:8000")).build();
    }
}

