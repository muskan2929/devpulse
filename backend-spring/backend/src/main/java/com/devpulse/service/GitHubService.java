package com.devpulse.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.Map;

@Service
public class GitHubService {
    @Autowired private WebClient githubClient;

    public Mono<List<Map<String,Object>>> getRepos(String token) {
        return githubClient.get().uri("/user/repos?per_page=100")
                .header("Authorization","Bearer "+token)
                .retrieve().bodyToMono(List.class).map(l -> (List<Map<String,Object>>) l);
    }

    public Mono<List<Map<String,Object>>> getCommits(String token, String owner, String repo) {
        return githubClient.get().uri("/repos/{o}/{r}/commits?per_page=100", owner, repo)
                .header("Authorization","Bearer "+token)
                .retrieve().bodyToMono(List.class).map(l -> (List<Map<String,Object>>) l);
    }
}
