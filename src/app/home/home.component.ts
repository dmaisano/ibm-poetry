import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';

export interface PoemQuery {
  inputField: 'author' | 'title' | 'lines' | 'linecount';
  text: string;
}

export interface Poem {
  index?: number;
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
export class HomeComponent implements AfterViewInit, OnInit {
  title: string;

  poemQuery: PoemQuery = {
    inputField: 'author',
    text: '',
  };

  poetry: MatTableDataSource<Poem> = new MatTableDataSource();
  poetryColumns: string[] = ['position', 'author', 'title', 'linecount'];

  selectedPoem: Poem;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.poetry.paginator = this.paginator;
    // this.poetry.sort = this.searchPoetry;
  }

  ngAfterViewInit() {
    this.poetry.sort = this.sort;
    this.poetry.paginator = this.paginator;
  }

  inputSubmit(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchPoetry();
    }
  }

  filterTable(filterValue: string) {
    this.poetry.filter = filterValue.trim().toLowerCase();
  }

  searchPoetry() {
    if (this.poemQuery.text === '') {
      return;
    }

    this.data.getPoetry(this.poemQuery).subscribe((res: any) => {
      if (res.status) {
        // error goes here
        return;
      }

      if (res.length < 1) {
        // error goes here
        return;
      } else {
        console.log(res.length);

        const poems = [];
        this.poetry.data = [];

        for (let i = 0; i < res.length; i++) {
          const poem: Poem = res[i];

          poems.push({
            index: i + 1,
            ...poem,
          });
        }

        this.poetry.data = poems;
      }
    });
  }

  search_box_placeholder(): string {
    const searchText = 'Search by';

    switch (this.poemQuery.inputField) {
      case 'author':
        return `${searchText} Author`;
      case 'title':
        return `${searchText} Title`;
      case 'lines':
        return `${searchText} Phrase(s)`;
      case 'linecount':
        return `${searchText} Line Count`;
      default:
        break;
    }
  }
}
