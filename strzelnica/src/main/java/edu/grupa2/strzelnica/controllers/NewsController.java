package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.News;
import edu.grupa2.strzelnica.services.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@Controller
public class NewsController {
    // Service for handling the news repository
    private final NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // GET - Get all news from the service
    @GetMapping("/news")
    @ResponseBody
    public Page<News> getNews(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return newsService.getPaginatedNews(page, size);
    }

    // GET - Get a specific news
    @GetMapping("/news/{id}")
    public ResponseEntity<?> getNewsById(@PathVariable Long id) {
        // Get the news from news service
        Optional<News> optionalNews = newsService.getNewsById(id);

        // Send the news if it exists
        if (optionalNews.isPresent()) {
            return ResponseEntity.ok(optionalNews.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_news_not_found\"}");
        }
    }

    // POST - Add new news
    @PostMapping("/news/add")
    public ResponseEntity<?> addNews(@RequestBody News news) {
        try {
            newsService.saveNews(news);
            return ResponseEntity.ok().body("{\"message\": \"success_news_added_successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding news: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing news
    @PutMapping("/news/edit/{id}")
    public ResponseEntity<News> updateNews(@PathVariable Long id, @RequestBody News updatedNews) {
        return newsService.updateNews(id, updatedNews);
    }

    // DELETE - Delete or restore news
    @DeleteMapping("/news/{id}")
    public ResponseEntity<News> deleteNews(@PathVariable Long id) {
        return newsService.deleteNewsById(id);
    }
}