package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.NewsDTO;
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

import java.util.Date;
import java.util.Optional;

@Service
public class NewsService {
    private final NewsRepository newsRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    private NewsDTO convertEntityToDTO(News news){
        NewsDTO newsDTO = new NewsDTO();
        newsDTO.setId(news.getId());
        newsDTO.setTitle(news.getTitle());
        newsDTO.setPicture(news.getPicture());
        newsDTO.setDate(news.getDate());
        newsDTO.setAuthorId(news.getAuthorId());
        newsDTO.setContent(news.getContent());
        newsDTO.setDeleted(news.isDeleted());
        return newsDTO;
    }

    private News convertDTOToEntity(NewsDTO newsDTO){
        News news = new News();
        news.setId(newsDTO.getId());
        news.setTitle(newsDTO.getTitle());
        news.setPicture(newsDTO.getPicture());
        news.setDate(newsDTO.getDate());
        news.setAuthorId(newsDTO.getAuthorId());
        news.setContent(newsDTO.getContent());
        news.setDeleted(newsDTO.isDeleted());
        return news;
    }
    public Page<NewsDTO> getPaginatedNews(int page, int size) {
        Pageable pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, "date"));
        Page<News> newsPage = newsRepository.findAll(pageable);
        return newsPage.map(this::convertEntityToDTO);
    }

    public Optional<NewsDTO> getNewsById(Long id) {
        return newsRepository.findById(id).map(this::convertEntityToDTO);
    }

    public NewsDTO saveNews(NewsDTO newsDTO) {
        News news = convertDTOToEntity(newsDTO);
        News savedNews = newsRepository.save(news);
        return convertEntityToDTO(savedNews);
    }

    public ResponseEntity<NewsDTO> updateNews(Long id, NewsDTO updatedNewsDTO) {
        Optional<News> optionalNews = newsRepository.findById(id);

        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();

            // Update fields from the DTO if they are present
            if (updatedNewsDTO.getTitle() != null) {
                existingNews.setTitle(updatedNewsDTO.getTitle());
            }
            if (updatedNewsDTO.getContent() != null) {
                existingNews.setContent(updatedNewsDTO.getContent());
            }
            if (updatedNewsDTO.getDate() != null) {
                existingNews.setDate(updatedNewsDTO.getDate());
            }
            if (updatedNewsDTO.getAuthorId() != null) {
                existingNews.setAuthorId(updatedNewsDTO.getAuthorId());
            }
            if (updatedNewsDTO.getPicture() != null) {
                existingNews.setPicture(updatedNewsDTO.getPicture());
            }
            existingNews.setDeleted(updatedNewsDTO.isDeleted());

            News savedNews = newsRepository.save(existingNews);
            return new ResponseEntity<>(convertEntityToDTO(savedNews), HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    public ResponseEntity<NewsDTO> deleteNewsById(Long id) {
        Optional<News> optionalNews = newsRepository.findById(id);

        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();
            existingNews.setDeleted(!existingNews.isDeleted());

            News deletedNews = newsRepository.save(existingNews);
            return new ResponseEntity<>(convertEntityToDTO(deletedNews), HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
