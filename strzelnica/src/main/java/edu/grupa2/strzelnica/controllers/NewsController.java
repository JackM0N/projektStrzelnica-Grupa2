package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.NewsDTO;
import edu.grupa2.strzelnica.services.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/news")
public class NewsController {
    private final NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // GET - Get all news from the service
    @GetMapping()
    @ResponseBody
    public Page<NewsDTO> getNews(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return newsService.getPaginatedNews(page, size);
    }

    // GET - Get a specific news
    @GetMapping("/{id}")
    public ResponseEntity<NewsDTO> getNewsById(@PathVariable Long id) {
        Optional<NewsDTO> optionalNews = newsService.getNewsById(id);

        // Send the news if it exists
        return optionalNews.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // POST - Add new news
    @PostMapping("/add")
    public ResponseEntity<String> addNews(@RequestBody NewsDTO newsDTO) {
        try {
            newsService.saveNews(newsDTO);
            return ResponseEntity.ok("{\"message\": \"success_news_added_successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"message\": \"Error adding news: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing news
    @PutMapping("/edit/{id}")
    public ResponseEntity<NewsDTO> updateNews(@PathVariable Long id, @RequestBody NewsDTO updatedNewsDTO) {
        return newsService.updateNews(id, updatedNewsDTO);
    }

    // DELETE - Delete or restore news
    @DeleteMapping("/{id}")
    public ResponseEntity<NewsDTO> deleteNews(@PathVariable Long id) {
        return newsService.deleteNewsById(id);
    }
}
