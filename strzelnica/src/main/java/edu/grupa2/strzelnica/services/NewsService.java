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
import java.util.Optional;

@Service
public class NewsService {
    private final NewsRepository newsRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public Page<News> getPaginatedNews(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "date"));
        return newsRepository.findAll(pageable);
    }

    public Optional<News> getNewsById(Long id) {
        return newsRepository.findById(id);
    }

    public News saveNews(News news) {
        return newsRepository.save(news);
    }

    public ResponseEntity<News> updateNews(Long id, News updatedNews) {
        Optional<News> optionalNews = this.getNewsById(id);

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

    public ResponseEntity<News> deleteNewsById(Long id) {
        Optional<News> optionalNews = this.getNewsById(id);

        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();
            existingNews.setDeleted(!existingNews.isDeleted());

            News deletedNews = this.saveNews(existingNews);
            return new ResponseEntity<>(deletedNews, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
