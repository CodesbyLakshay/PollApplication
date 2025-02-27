package com.poll.PollApplication.services;

import com.poll.PollApplication.model.OptionVote;
import com.poll.PollApplication.model.Poll;
import com.poll.PollApplication.repositories.PollRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service


public class PollService {

    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Optional<Poll> getPollById(Long id) {
        return pollRepository.findById(id);
    }

    public void vote(Long pollId, int optionindex) {
        Poll poll = pollRepository.findById(pollId).orElseThrow();
        List<OptionVote> Options = poll.getOptions();
        if (optionindex<0 || optionindex>= Options.size()){
            throw new RuntimeException();
        }
        OptionVote selectedOption = Options.get(optionindex);
        selectedOption.setVotes(selectedOption.getVotes()+1);
        pollRepository.save(poll);
    }
}
