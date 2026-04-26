package com.devpulse.repository;

import com.devpulse.model.Commit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommitRepository extends JpaRepository<Commit, Long> {
    List<Commit> findByUserId(Long userId);
}

