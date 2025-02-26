package com.poll.PollApplication.services;

import com.poll.PollApplication.model.Poll;
import com.poll.PollApplication.repositories.PollRepository;
import org.springframework.stereotype.Service;

@Service


public class PollService {

    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }
}
