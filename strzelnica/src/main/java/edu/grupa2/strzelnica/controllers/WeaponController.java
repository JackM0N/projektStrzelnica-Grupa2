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
import java.util.List;
import java.util.Optional;

@Controller
public class NewsController {
    // News service for handling the news repository
    private final NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // GET - Pobierz wszystkie newsy
    @GetMapping("/news")
    @ResponseBody
    public Page<News> getNews(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return newsService.getPaginatedNews(page, size);
    }

    // GET - Pobierz specyficzny news
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

    // POST - Dodaj nowy news
    @PostMapping("/news/add")
    public ResponseEntity<?> addNews(@RequestBody News news) {
        try {
            newsService.saveNews(news);
            return ResponseEntity.ok().body("{\"message\": \"success_news_added_successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding news: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Zaktualizuj istniejący news
    @PutMapping("/news/edit/{id}")
    public ResponseEntity<News> updateNews(@PathVariable Long id, @RequestBody News updatedNews) {
        // Get the news from news service
        Optional<News> optionalNews = newsService.getNewsById(id);

        // Update the news if it exists
        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();
            existingNews.setTitle(updatedNews.getTitle());
            existingNews.setContent(updatedNews.getContent());
            existingNews.setDate(updatedNews.getDate());
            existingNews.setAuthorId(updatedNews.getAuthorId());
            existingNews.setPicture(updatedNews.getPicture());
            News savedNews = newsService.saveNews(existingNews);
            return new ResponseEntity<>(savedNews, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE - Usuń lub przywróć news
    @DeleteMapping("/news/{id}")
    public ResponseEntity<News> deleteNews(@PathVariable Long id) {
        // Get the news from news service
        Optional<News> optionalNews = newsService.getNewsById(id);

        // Delete news if it exists
        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();
            existingNews.setDeleted(!existingNews.getDeleted());

            // Save the news to the database using the new service
            News deletedNews = newsService.saveNews(existingNews);
            return new ResponseEntity<>(deletedNews, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}