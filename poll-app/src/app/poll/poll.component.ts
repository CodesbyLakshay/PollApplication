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
      { optionText: '', votes: 0 },
      { optionText: '', votes: 0 }]
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
      console.log('Sending to backend:', JSON.stringify(this.newPoll));
      this.pollService.createPoll(this.newPoll).subscribe({
        next: (createdPoll) => {
          console.log('Received from backend:', JSON.stringify(createdPoll));
          const fixedPoll = {
            ...createdPoll,
            options: this.newPoll.options.map((sentOption, i) => ({
              optionText: sentOption.optionText,
              votes: createdPoll.options[i]?.votes || 0
            }))
          };
          this.polls.push(fixedPoll);
          this.resetPoll();
        },
        error: (error) => {
          console.error('Error creating poll:', error);
        }
      });
    }

  resetPoll() {
      this.newPoll = {
        id: 0,
        question: '',
        options: [
          { optionText: '', votes: 0 }, // Comma here
          { optionText: '', votes: 0 }  // No comma needed after last item
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
          this.newPoll.options.push({optionText:'',votes:0})};


 trackByIndex(index:number): number{
   return index;}
}
