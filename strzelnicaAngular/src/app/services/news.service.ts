import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = 'http://localhost:8080/news';
  private postUrl = 'http://localhost:8080/news/add';
  private editUrl = 'http://localhost:8080/news/edit';

  constructor(private http: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.baseUrl);
  }

  addNews(news?: News): Observable<News> {
    //return this.http.post<News>(this.baseUrl, news);
    return this.http.post<News>(this.postUrl, news);
  }

  updateNews(news: News): Observable<News> {
    const url = `${this.editUrl}/${news.id}`;
    return this.http.put<News>(url, news);
  }

  deleteNews(newsId: number): Observable<void> {
    const url = `${this.baseUrl}/${newsId}`;
    return this.http.delete<void>(url);
  }

  getNewsById(newsId: number): Observable<News> {
    const url = `${this.baseUrl}/${newsId}`;
    return this.http.get<News>(url);
  }
}
