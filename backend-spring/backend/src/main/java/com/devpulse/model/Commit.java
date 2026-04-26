package com.devpulse.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity @Table(name="commits")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Commit {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sha;
    private String repo;
    private String message;
    private String language;
    private Instant timestamp;

    @ManyToOne @JoinColumn(name="user_id")
    private User user;
}

