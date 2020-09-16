import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { questions } from './questions';

const notfy = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'top',
  },
});

const runAnimation = () => {
  setTimeout(() => {
    const options = document.querySelectorAll('.options-item');
    for (var i = 0; i < options.length; i++) {
      options[i].classList.add('animated');
    }
  }, 100);
};

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})

export class QuizComponent implements OnInit {

  questions: any[] = questions;
  quizProgress: number = 0;
  correctAnswerCount: number = 0;

  displayProgressBar: boolean;
  selectedChoiceIsCorrect: boolean = false;
  selectedChoiceLetter: string;
  buttonIsDisabled: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const localStorageQuizProgress = localStorage.getItem('Quiz progress');
    const parsedLocalStorageQuizProgress = JSON.parse(localStorageQuizProgress);

    this.quizProgress = parsedLocalStorageQuizProgress ? parsedLocalStorageQuizProgress : 0;

    if (this.quizProgress === 3) {
      this.router.navigate(['/result']);
    };

    runAnimation();
  };

  handlePickAnswer(selectedChoice, index) {
    this.buttonIsDisabled = true;
    this.displayProgressBar = true;

    setTimeout(() => {
      this.quizProgress++;
      this.displayProgressBar = false;
      this.selectedChoiceIsCorrect = false;
      this.selectedChoiceLetter = '';
      this.buttonIsDisabled = false;
      localStorage.setItem('Quiz progress', this.quizProgress.toString());
      if (this.quizProgress === 3) {
        this.router.navigate(['/result']);
      };
      runAnimation();
    }, 3000);

    if (selectedChoice === this.questions[this.quizProgress].correctAnswer) {
      notfy.success('Good job! 😄');
      this.selectedChoiceIsCorrect = true;
    } else {
      notfy.error('Sorry, that\'s not quite right 🙁');
      this.selectedChoiceLetter = selectedChoice;
    };

    this.questions[this.quizProgress].selectedChoice = selectedChoice;
    localStorage.setItem('Questions', JSON.stringify(this.questions));
  };
}
