import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = 'http://localhost:8080/news';
  private postUrl = 'http://localhost:8080/news/add';
  private editUrl = 'http://localhost:8080/news/edit';

  constructor(private http: HttpClient) {}

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.baseUrl);
  }

  getPaginatedNews(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', size.toString());
    return this.http.get<any>(this.baseUrl, {params});
  }

  addNews(news?: News): Observable<News> {
    return this.http.post<News>(this.postUrl, news);
  }

  updateNews(news: News): Observable<News> {
    const url = `${this.editUrl}/${news.id}`;
    return this.http.put<News>(url, news);
  }

  deleteNews(newsId: number): Observable<News> {
    const url = `${this.baseUrl}/${newsId}`;
    return this.http.delete<News>(url);
  }

  getNewsById(newsId: number): Observable<News> {
    const url = `${this.baseUrl}/${newsId}`;
    return this.http.get<News>(url);
  }
}
