import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { PoemDialogComponent } from '../poem-dialog/poem-dialog.component';
import { stringify } from '@angular/compiler/src/util';

export interface Poem {
  index?: number;
  author: string;
  title: string;
  linecount: string;
  lines: string[];
  words: string[];
}

export interface Vocabulary {
  letter: string;
  value: string;
}

export interface UserPoem {
  title: string;
  vocabulary: Vocabulary[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  title: string;

  userPoem: UserPoem = {
    title: '',
    vocabulary: [],
  };

  dataSource: MatTableDataSource<Poem> = new MatTableDataSource();
  poetryColumns: string[] = [
    'position',
    'author',
    'title',
    'linecount',
    'button',
  ];

  selectedPoem: Poem;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    console.log({
      uniqueVisitor: localStorage.getItem('first-time-visit'),
    });

    // show help dialog if the user visits the page for the first time
    if (!localStorage.getItem('first-time-visit')) {
      this.showHelp();
    }

    this.dataSource.data = [];

    this.getPoems();

    if (!sessionStorage.getItem('user-poem')) {
      for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
        this.userPoem.vocabulary.push({
          letter,
          value: '',
        });
      }
    } else {
      this.userPoem = JSON.parse(sessionStorage.getItem('user-poem'));
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPoems(): void {
    this.http.get('assets/poems.json').subscribe((poems: Poem[]) => {
      for (let i = 0; i < poems.length; i++) {
        const poem = poems[i];
        poem.index = i;
      }

      this.dataSource.data = poems;
    });
  }

  filterTable(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectPoem(poem: Poem) {
    const words = poem.words.sort(() => 0.5 - Math.random()).slice(0, 26);
    for (const item of this.userPoem.vocabulary) {
      item.value = words.pop();
    }

    sessionStorage.setItem('user-poem', JSON.stringify(this.userPoem));
  }

  viewPoem(poem: Poem): void {
    const dialogRef = this.dialog.open(PoemDialogComponent, {
      // width: '450px',
      data: {
        poem,
      },
    });
  }

  randomize() {
    try {
      let words: string[] = [];

      for (const { value } of this.userPoem.vocabulary) {
        if (value !== '') {
          words.push(value);
        }
      }

      if (words.length !== this.userPoem.vocabulary.length) {
        throw new Error('Vocabulary must be filled!');
      }

      words = words.sort(() => 0.5 - Math.random());

      for (let i = 0; i < this.userPoem.vocabulary.length; i++) {
        const item = this.userPoem.vocabulary[i];

        item.value = words[i];
      }

      sessionStorage.setItem('user-poem', JSON.stringify(this.userPoem));
    } catch (error) {
      // error modal
      this.dialog.open(ErrorDialogComponent, {
        data: {
          error: error.message,
        },
      });
    }
  }

  showHelp(): void {
    const dialogRef = this.dialog.open(HelpDialogComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        localStorage.setItem('first-time-visit', 'false');
      },
    });
  }

  updatePoemTitle() {
    this.userPoem.title = this.userPoem.title.toUpperCase();

    sessionStorage.setItem('user-poem', JSON.stringify(this.userPoem));
  }

  updateValue(item: Vocabulary) {
    item.value = item.value.toLowerCase() || '';

    sessionStorage.setItem('user-poem', JSON.stringify(this.userPoem));
  }

  createPoem() {
    try {
      if (!this.userPoem.title) {
        throw new Error('Missing poem title!');
      }

      const dict: {
        [key: string]: string;
      } = {};

      for (const { letter, value } of this.userPoem.vocabulary) {
        if (value === '' || value === undefined) {
          throw new Error('Vocabulary must be filled!');
        } else {
          dict[letter] = value;
        }
      }

      // line 1
      let title = '';
      for (const letter of this.userPoem.title) {
        title += ` ${dict[letter]}`;
      }

      const lines = [
        this.getNextLine(dict[this.userPoem.title[0]], dict),
        this.getNextLine(dict[this.userPoem.title[1]], dict),
        this.getNextLine(dict[this.userPoem.title[2]], dict),
      ];

      for (let i = 0; i < 3; i++) {
        const line = lines[i];

        for (const word of line.split(' ')) {
          lines.push(this.getNextLine(word, dict));
        }
      }

      sessionStorage.setItem('generated-peom', JSON.stringify(lines));
    } catch (error) {
      // error modal
      this.dialog.open(ErrorDialogComponent, {
        data: {
          error: error.message,
        },
      });
    }
  }

  private getNextLine(
    word: string,
    dict: {
      [key: string]: string;
    }
  ) {
    let line = '';

    for (const letter of word) {
      line += ` ${dict[letter.toUpperCase()]}`;
    }

    return line.trim();
  }
}
