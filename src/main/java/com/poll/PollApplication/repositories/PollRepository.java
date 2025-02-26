package com.poll.PollApplication.repositories;

import com.poll.PollApplication.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface PollRepository extends JpaRepository<Poll, Long> {
}
