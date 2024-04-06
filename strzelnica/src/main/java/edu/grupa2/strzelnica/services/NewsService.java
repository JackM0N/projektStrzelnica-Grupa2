package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.News;
import edu.grupa2.strzelnica.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    // Method to get all news
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    // Method to get a specific news by its ID
    public Optional<News> getNewsById(Long id) {
        return newsRepository.findById(id);
    }

    // Method to save a new news
    public News saveNews(News news) {
        return newsRepository.save(news);
    }

    // Method to update an existing news
    public News updateNews(Long id, News updatedNews) {
        if (newsRepository.existsById(id)) {
            updatedNews.setId(id); // Ensure the ID is set correctly
            return newsRepository.save(updatedNews);
        } else {
            throw new IllegalArgumentException("News with ID " + id + " does not exist");
        }
    }

    // Method to delete a news by its ID
    public void deleteNewsById(Long id) {
        newsRepository.deleteById(id);
    }
}