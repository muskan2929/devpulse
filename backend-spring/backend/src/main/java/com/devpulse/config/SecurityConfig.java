package com.devpulse.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(c -> c.configurationSource(corsSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(a -> a
                        .requestMatchers(
                                "/",
                                "/actuator/**",
                                "/api/public/**",
                                "/api/auth/**",
                                "/oauth2/**",
                                "/login/**",
                                "/error"
                        ).permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(o -> o
                        .defaultSuccessUrl("https://devpulse-hazel.vercel.app/dashboard", true)
                        .failureUrl("https://devpulse-hazel.vercel.app/?error=true")
                );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsSource() {
        CorsConfiguration c = new CorsConfiguration();
        c.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "https://devpulse-hazel.vercel.app"
        ));
        c.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        c.setAllowedHeaders(List.of("*"));
        c.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource s = new UrlBasedCorsConfigurationSource();
        s.registerCorsConfiguration("/**", c);
        return s;
    }
}