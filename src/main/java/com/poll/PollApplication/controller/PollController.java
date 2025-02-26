package com.poll.PollApplication.controller;

import com.poll.PollApplication.model.Poll;
import com.poll.PollApplication.services.PollService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    public PollController(PollService pollServices) {
        this.pollService = pollServices;
    }

    private PollService pollService;


    @PostMapping
    public Poll createPoll(@RequestBody Poll poll){
        return pollService.createPoll(poll);
    }
}
