package com.poll.PollApplication.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String question;

    @ElementCollection
    private List<String> options = new ArrayList<>();

    @ElementCollection
    private List<Long> votes = new ArrayList<>();
}
