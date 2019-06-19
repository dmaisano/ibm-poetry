import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poem, PoemQuery } from './home/home.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPoetry(queryObj: PoemQuery): Observable<Poem[]> {
    return this.http.get<Poem[]>(
      `http://poetrydb.org/${queryObj.inputField}/${queryObj.text}`
    );
  }
}
