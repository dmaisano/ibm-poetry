import { Component, OnInit } from '@angular/core';
import { DataService, RandomText } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string;
  randomText: RandomText;

  constructor(private data: DataService) {}

  ngOnInit() {}

  getRandomText() {
    this.data.getRandomText().subscribe(res => {
      this.randomText = res;
    });
  }
}
