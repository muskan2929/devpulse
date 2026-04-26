package com.devpulse.service;

import com.devpulse.model.User;
import com.devpulse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) {
        OAuth2User oauthUser = super.loadUser(request);

        String login = oauthUser.getAttribute("login");
        String name = oauthUser.getAttribute("name");
        String avatar = oauthUser.getAttribute("avatar_url");
        String token = request.getAccessToken().getTokenValue();

        // ✅ Save or update user in DB
        User user = userRepository.findByGithubLogin(login)
                .orElse(User.builder().githubLogin(login).build());

        user.setName(name);
        user.setAvatarUrl(avatar);
        user.setAccessToken(token); // ✅ Save token
        userRepository.save(user);

        return oauthUser;
    }
}
