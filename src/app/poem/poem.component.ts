import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface PoemWord {
  fontSize: string;
  word: string;
}

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.scss'],
})
export class PoemComponent implements OnInit {
  title: string;
  lines: PoemWord[][] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const generatedPoem = sessionStorage.getItem('generated-poem');
    const title = sessionStorage.getItem('generated-poem-title');

    if (!generatedPoem || !title) {
      this.router.navigate(['/']);
    }

    this.title = title;

    const lines: string[] = JSON.parse(generatedPoem);

    for (let i = 0; i < lines.length; i++) {
      this.lines[i] = new Array();
    }

    this.getPoemLines(JSON.parse(generatedPoem));

    console.log(this.lines);
  }

  private getPoemLines(lines: string[]) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      for (const word of line.split(' ')) {
        this.lines[i].push({
          fontSize: `${16 + this.countWord(word)}px`,
          word,
        });
      }
    }
  }

  private countWord(word: string): number {
    let count = 0;

    for (const line of this.lines) {
      for (const item of line) {
        if (item.word === word) {
          count += 2;
        }
      }
    }

    return count;
  }
}
