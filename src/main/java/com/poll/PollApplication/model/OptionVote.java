package com.poll.PollApplication.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Embeddable

public class OptionVote {
    private String voteOption;
    private Long votes = 0L;
}
