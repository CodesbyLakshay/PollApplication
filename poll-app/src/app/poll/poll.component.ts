import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Poll, OptionVote } from '../poll.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll',
  imports: [CommonModule , FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit {

  newPoll: Poll ={
    id:0,
    question:'',
    options:[
      { voteOption: '', votes: 0 },
      { voteOption: '', votes: 0 }]
      };

  polls: Poll[] = [];

  constructor(private pollService: PollService){}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls(){
    this.pollService.getPolls().subscribe({
      next: (data) => {
        this.polls = data;
      }
      ,
      error: (error) => {
        console.error("Error fetching polls: " , error);
      }
    }
    );
  }

  createPoll() {
    this.pollService.createPoll(this.newPoll).subscribe({
    next: (createdPoll) => {
      this.polls.push(createdPoll);
      this.resetPoll();
      }

      });
  }

  resetPoll() {
      this.newPoll = {
        id: 0,
        question: '',
        options: [
          { voteOption: '', votes: 0 }, // Comma here
          { voteOption: '', votes: 0 }  // No comma needed after last item
        ]
      };
    }

        vote(pollId: number, optionIndex: number){
          this.pollService.vote(pollId,optionIndex).subscribe({
            next: () => {
              const poll = this.polls.find(p => p.id=== pollId);
              if(poll){
                poll.options[optionIndex].votes++

                }
              },

                    error:(error) =>{
                    console.error("Error voting on polls: " , error);}
            });
          }

        addOption(){
          this.newPoll.options.push({voteOption:'',votes:0})};


 trackByIndex(index:number): number{
   return index;}
}
