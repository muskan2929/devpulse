package com.devpulse.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.Map;

@Service
public class MlService {
    @Autowired private WebClient mlClient;

    public Mono<Map> productivity(Object payload) {
        return mlClient.post().uri("/analyze/productivity").bodyValue(payload).retrieve().bodyToMono(Map.class);
    }
    public Mono<Map> burnout(Object payload) {
        return mlClient.post().uri("/analyze/burnout").bodyValue(payload).retrieve().bodyToMono(Map.class);
    }
    public Mono<Map> skills(Object payload) {
        return mlClient.post().uri("/analyze/skills").bodyValue(payload).retrieve().bodyToMono(Map.class);
    }
}

