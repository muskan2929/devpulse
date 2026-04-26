package com.devpulse.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @GetMapping("/me")
    public Map<String,Object> me(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) return Map.of("authenticated", false);
        return Map.of("authenticated", true, "attributes", user.getAttributes());
    }
}

