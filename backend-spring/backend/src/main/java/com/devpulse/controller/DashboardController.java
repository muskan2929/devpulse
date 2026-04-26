package com.devpulse.controller;

import com.devpulse.service.GitHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired private GitHubService gh;

    @GetMapping("/repos")
    public Mono<List<Map<String,Object>>> repos(
            @RegisteredOAuth2AuthorizedClient("github") OAuth2AuthorizedClient client) {
        return gh.getRepos(client.getAccessToken().getTokenValue());
    }
}

