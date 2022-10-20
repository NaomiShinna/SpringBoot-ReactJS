package com.example.demo;

import com.example.demo.model.Articles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class Controller {
    @Autowired
    Repository repository;

    @GetMapping("/article")
    @CrossOrigin(origins = "http://localhost:3000/")
    List<Articles> all() {
        return repository.findAll();
    }

    @GetMapping("/article/{limit}/{offset}")
    @CrossOrigin(origins = "http://localhost:3000/")
    List<Articles> getLimitOffset(@PathVariable int limit, @PathVariable int offset) {
        return repository.getPartofArticles(limit, offset);
    }

    @GetMapping("/article/find/{id}")
    @CrossOrigin(origins = "http://localhost:3000/")
    Optional<Articles> findById(@PathVariable int id) {
        if(repository.findById(id).isPresent()){
            return repository.findById(id);
        }
        return null;
    }

    @GetMapping("/article/{status}")
    @CrossOrigin(origins = "http://localhost:3000/")
    List<Articles> findByStatus(@PathVariable String status) {
        return repository.findByStatus(status);
    }


    @GetMapping("/article/{status}/{limit}/{offset}")
    @CrossOrigin(origins = "http://localhost:3000/")
    List<Articles> getLimitOffsetGroupByStatus(@PathVariable String status, @PathVariable int limit, @PathVariable int offset) {

//        return repository.findByStatus(status).getPartofArticles(limit, offset)
        return repository.getPartofArticlesByStatus(status, limit, offset);
    }

    @PostMapping("/article")
    Articles postArticles(@Valid @RequestBody Articles articles) {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
        Date currentDate = calendar.getTime();
        Timestamp timestamp = new Timestamp(currentDate.getTime());

        Articles newArticles = articles;
        newArticles.setCreated_date(timestamp);

        if (articles.getStatus().equalsIgnoreCase("Publish") || articles.getStatus().equalsIgnoreCase("Draft") ||
                articles.getStatus().equalsIgnoreCase("Thrash")) {
            return repository.save(newArticles);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Statusnya pilih salah satu: Publish, Draft, Thrash");
        }
    }

    @PutMapping("/article/{id}")
    Articles updateArticles(@Valid @RequestBody Articles articles, @PathVariable int id) {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Jakarta"));
        Date currentDate = calendar.getTime();
        Timestamp timestamp = new Timestamp(currentDate.getTime());

        try {
            Optional<Articles> oldArticles = repository.findById(id);

            if (oldArticles.isPresent()) {
                Articles _articles = oldArticles.get();
                _articles.setTitle(articles.getTitle());
                _articles.setContent(articles.getContent());
                _articles.setCategory(articles.getCategory());
                _articles.setUpdated_date(timestamp);
                _articles.setStatus(articles.getStatus());

                return repository.save(_articles);

            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    @DeleteMapping("/article/{id}")
    String deleteArticle(@PathVariable int id) {
        repository.deleteById(id);
        return "Article id = " + id + " sudah berhasil di hapus";
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
