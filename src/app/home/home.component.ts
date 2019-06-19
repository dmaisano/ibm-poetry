import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

export interface PoemQuery {
  inputField: 'author' | 'title' | 'lines' | 'linecount';
  text: string;
}

export interface Poem {
  author: string;
  title: string;
  linecount: string;
  lines: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string;

  poetry: Poem[];
  selectedPoem: Poem;

  poemQuery: PoemQuery = {
    inputField: 'author',
    text: '',
  };

  constructor(private data: DataService) {}

  ngOnInit() {}

  getRandomText() {
    this.data.getPoetry(this.poemQuery).subscribe((poetry: Poem[]) => {
      this.poetry = [];

      for (const poem of poetry) {
        this.poetry.push(poem);
      }
    });
  }

  search_box_placeholder(): string {
    return `Search by ${this.poemQuery.inputField
      .charAt(0)
      .toUpperCase()}${this.poemQuery.inputField.slice(1)}`;
  }
}
