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
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  title: string;

  poetry: MatTableDataSource<Poem> = new MatTableDataSource();
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
    this.poetry.data = [];

    this.getPoems();
  }

  ngAfterViewInit() {
    this.poetry.paginator = this.paginator;
  }

  getPoems() {
    this.http.get('assets/poems.json').subscribe((res: Poem[]) => {
      console.log(res[7]);
    });
  }

  getWords(poem: Poem) {
    const words = [];

    for (const word of poem.lines.join().split(' ')) {
      console.log(word);
    }
  }

  filterTable(filterValue: string) {
    this.poetry.filter = filterValue.trim().toLowerCase();
  }

  selectPoem(poem: Poem) {
    console.log(poem);
  }
}
