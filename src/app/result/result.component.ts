import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  score: number = 0;
  numberOfCorrectAnswers: number = 0;

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
  };

  handleRetakeQuiz () {
    localStorage.removeItem('Questions');
    localStorage.removeItem('Quiz progress');
    this.router.navigate(['/']);
  };

}
