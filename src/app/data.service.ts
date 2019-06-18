import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RandomText {
  title: string;
  slug: string;
  length: number;
  text: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getRandomText(): Observable<RandomText> {
    return this.http.get<RandomText>(`https://litipsum.com/api/json`);
  }
}
