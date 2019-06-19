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
  poetryColumns: string[] = ['position', 'author', 'title', 'linecount', 'button'];

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
    this.http.get('assets/poems.json').subscribe((res: any) => {
      console.log(res);
    });
  }

  filterTable(filterValue: string) {
    this.poetry.filter = filterValue.trim().toLowerCase();
  }

  // searchPoetry() {
  //   if (this.poemQuery.text === '') {
  //     return;
  //   }

  //   this.data.getPoetry(this.poemQuery).subscribe((res: any) => {
  //     if (res.status) {
  //       // error goes here
  //       return;
  //     }

  //     if (res.length < 1) {
  //       // error goes here
  //       return;
  //     } else {
  //       console.log(res.length);

  //       const poems = [];
  //       this.poetry.data = [];

  //       for (let i = 0; i < res.length; i++) {
  //         const poem: Poem = res[i];

  //         poems.push({
  //           index: i + 1,
  //           ...poem,
  //         });
  //       }

  //       // localStorage.setItem('poems', JSON.stringify(poems));

  //       this.poetry.data = poems;
  //     }
  //   });
  // }

  // search_box_placeholder(): string {
  //   const searchText = 'Search by';

  //   switch (this.poemQuery.inputField) {
  //     case 'author':
  //       return `${searchText} Author`;
  //     case 'title':
  //       return `${searchText} Title`;
  //     case 'lines':
  //       return `${searchText} Phrase(s)`;
  //     case 'linecount':
  //       return `${searchText} Line Count`;
  //     default:
  //       break;
  //   }
  // }

  selectPoem(poem: Poem) {
    console.log(poem);
  }
}
