package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.News;
import edu.grupa2.strzelnica.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NewsService {
    private final NewsRepository newsRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    // Method to get paginated news
    public Page<News> getPaginatedNews(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "date"));
        return newsRepository.findAll(pageable);
    }

    // Method to get specific news by its ID
    public Optional<News> getNewsById(Long id) {
        return newsRepository.findById(id);
    }

    // Method to save new news
    public News saveNews(News news) {
        return newsRepository.save(news);
    }

    // Method to update an existing news
    public ResponseEntity<News> updateNews(Long id, News updatedNews) {
        // Get the news from news service
        Optional<News> optionalNews = this.getNewsById(id);

        // Update the news if it exists
        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();
            existingNews.setTitle(updatedNews.getTitle());
            existingNews.setContent(updatedNews.getContent());
            existingNews.setDate(updatedNews.getDate());
            existingNews.setAuthorId(updatedNews.getAuthorId());
            existingNews.setPicture(updatedNews.getPicture());

            News savedNews = this.saveNews(existingNews);
            return new ResponseEntity<>(savedNews, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Method to delete a news by its ID
    public ResponseEntity<News> deleteNewsById(Long id) {
        // Get the news from news service
        Optional<News> optionalNews = this.getNewsById(id);

        // Delete news if it exists
        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();
            existingNews.setDeleted(!existingNews.getDeleted());

            // Save the news to the database using the new service
            News deletedNews = this.saveNews(existingNews);
            return new ResponseEntity<>(deletedNews, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
