export interface OptionVote {
    voteOption: string;
    votes: number;
}

export interface Poll {
    id: number;
    question: string;
    options: OptionVote[];
}
