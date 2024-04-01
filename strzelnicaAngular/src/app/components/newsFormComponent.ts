import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news-form',
  templateUrl: 'newsForm.component.html',
  styleUrls: ['../styles/newsForm.component.css']
})
export class NewsFormComponent {
  news: any = {}; // Initialize an object to store form data

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post<any>('http://localhost:8080/api/news', this.news)
      .subscribe(
        response => {
          console.log('News added successfully:', response);
          // Reset the form or show success message
        },
        error => {
          console.error('Error adding news:', error);
          // Handle error, show error message, etc.
        }
      );
  }
}
