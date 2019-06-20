import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

export interface Poem {
  index?: number;
  author: string;
  title: string;
  linecount: string;
  lines: string[];
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.dataSource.data = [];

    this.getPoems();

    for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      this.userPoem.vocabulary.push({
        letter,
        value: '',
      });
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

  getWords(poem: Poem) {
    const words = [];

    for (const word of poem.lines.join().split(' ')) {
      console.log(word);
    }
  }

  filterTable(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectPoem(poem: Poem): void {
    this.selectedPoem = poem;
  }
}
