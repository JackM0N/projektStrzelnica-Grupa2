package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.News;
import edu.grupa2.strzelnica.repositories.NewsRepository;
import edu.grupa2.strzelnica.services.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
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

    private final NewsRepository newsRepository;
    private final NewsService newsService;
    @Autowired
    public NewsController(NewsRepository newsRepository, NewsService newsService) {
        this.newsRepository = newsRepository;
        this.newsService = newsService;
    }

    // GET - Pobierz wszystkie newsy
    @GetMapping("/news")
    @ResponseBody
    public List<News> getNews() {
        return newsRepository.findAll();
    }


    // GET - Pobierz specyficzny news
    @GetMapping("/news/{id}")
    public ResponseEntity<?> getNewsById(@PathVariable Long id) {
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isPresent()) {
            return ResponseEntity.ok(optionalNews.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("News not found");
        }
    }

    // POST - Dodaj nowy news
    @PostMapping("/news/add")
    public ResponseEntity<?> addNews(@RequestBody News news) {
        try {
            newsService.saveNews(news);
            return ResponseEntity.ok("News added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding news: " + e.getMessage());
        }
    }

    // PUT - Zaktualizuj istniejący news
    @PutMapping("/news/edit/{id}")
    public ResponseEntity<News> updateNews(@PathVariable Long id, @RequestBody News updatedNews) {
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();
            existingNews.setTitle(updatedNews.getTitle());
            existingNews.setContent(updatedNews.getContent());
            existingNews.setDate(updatedNews.getDate());
            existingNews.setAuthorId(updatedNews.getAuthorId());
            existingNews.setPicture(updatedNews.getPicture());
            News savedNews = newsRepository.save(existingNews);
            return new ResponseEntity<>(savedNews, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE - Usuń lub przywróć news
    @DeleteMapping("/news/{id}")
    public ResponseEntity<News> deleteNews(@PathVariable Long id) {
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();
            if (existingNews.getDeleted()){
                existingNews.setDeleted(false);
            }else{
                existingNews.setDeleted(true);
            }
            News deletedNews = newsRepository.save(existingNews);
            return new ResponseEntity<>(deletedNews, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE - Usuń news
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
//        Optional<News> optionalNews = newsRepository.findById(id);
//        if (optionalNews.isPresent()) {
//            newsRepository.deleteById(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
}