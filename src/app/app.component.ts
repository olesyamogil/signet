import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material';
import {IFilm, IFilmsResponce} from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  dataSource: IFilm[];
  totalItemsLength: number;
  pageSize = 10;
  displayedColumns = ['id', 'name', 'genres', 'year'];
  years = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
  ];
  genres = [
    'Genre 1',
    'Genre 2',
    'Genre 3',
    'Genre 4',
    'Genre 5',
    'Genre 6',
    'Genre 7',
    'Genre 8',
    'Genre 9',
  ];
  yearFilter = this.years[0];
  genreFilter = this.genres[0];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getFilms(this.yearFilter, this.genreFilter, this.pageSize);
  }

  filterFilms() {
    this.getFilms(this.yearFilter, this.genreFilter, this.pageSize);
  }

  onPaginationChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.getFilms(
      this.yearFilter,
      this.genreFilter,
      event.pageSize,
      event.pageIndex
    );
  }

  getFilms(
    year: number,
    genre: string,
    perPage: number,
    page: number = 0,
  ) {
    let queryParameters = new HttpParams()
      .set('p', String(page))
      .set('perPage', String(perPage));
    if (genre) {
      queryParameters = queryParameters.append('genre', genre);
    }
    if (year) {
      queryParameters = queryParameters.append('year', String(year));
    }
    this.http
      .get('http://localhost:3000/films', {
        params: queryParameters,
      })
      .subscribe((data: IFilmsResponce) => {
        this.dataSource = data.data;
        this.totalItemsLength = data.total;
      });
  }
}
