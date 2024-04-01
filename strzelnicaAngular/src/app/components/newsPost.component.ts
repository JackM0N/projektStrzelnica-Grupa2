<form (ngSubmit)="onSubmit()">
  <label>Title:</label>
  <input type="text" [(ngModel)]="news.title" name="title" required>
  
  <label>Content:</label>
  <textarea [(ngModel)]="news.content" name="content" required></textarea>
  
  <label>Picture URL:</label>
  <input type="text" [(ngModel)]="news.picture" name="picture">
  
  <label>Date:</label>
  <input type="date" [(ngModel)]="news.date" name="date" required>
  
  <label>Author ID:</label>
  <input type="text" [(ngModel)]="news.authorId" name="authorId" required>

  <!-- Add more input fields as needed -->

  <button type="submit">Submit</button>
</form>
