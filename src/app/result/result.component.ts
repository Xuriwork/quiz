import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

const LINK_TO_AUDIO_FILE_GOOD_SCORE = "https://ia600805.us.archive.org/4/items/11TheQuidditchMatch/2001%20-%20Harry%20Potter%20and%20The%20Sorcerer%27s%20Stone/07%20-%20Entry%20Into%20The%20Great%20Hall%20And%20The%20Banquet.mp3";
const LINK_TO_AUDIO_FILE_BAD_SCORE = "https://ia600805.us.archive.org/4/items/11TheQuidditchMatch/2001%20-%20Harry%20Potter%20and%20The%20Sorcerer%27s%20Stone/18-LeavingHogwarts.mp3";


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {

  score: number = 0;
  numberOfCorrectAnswers: number = 0;
  audio: any = new Audio();

  constructor(private router: Router) { }

  ngOnInit() {
    const localStorageQuestions = localStorage.getItem('Questions');
    const parsedLocalStorageQuestions = JSON.parse(localStorageQuestions);

    if (!parsedLocalStorageQuestions) return this.router.navigate(['/']);

    let found = false;
    for(let i = 0; i < parsedLocalStorageQuestions.length; i++) {
        if (parsedLocalStorageQuestions[i].selectedChoice) found = true;
        else found = false;
    };

    if (!found) return this.router.navigate(['/']);

    parsedLocalStorageQuestions.forEach((question, index) => {
      if (question.correctAnswer === question.selectedChoice) {
        this.numberOfCorrectAnswers++
      };
    });

    const audio = this.audio;
    audio.src = this.numberOfCorrectAnswers === 3 ? LINK_TO_AUDIO_FILE_GOOD_SCORE : LINK_TO_AUDIO_FILE_BAD_SCORE;
    audio.load();
    audio.play();
    audio.volume = 0.4;
  };

  ngOnDestroy() {
    this.audio.pause();
    this.audio.currentTime = 0;
  };

  handleRetakeQuiz () {
    localStorage.removeItem('Questions');
    localStorage.removeItem('Quiz progress');
    this.router.navigate(['/']);
  };

}
