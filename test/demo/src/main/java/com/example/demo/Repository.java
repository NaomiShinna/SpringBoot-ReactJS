package com.example.demo;

import com.example.demo.model.Articles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import javax.transaction.TransactionScoped;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Repository
public interface Repository extends JpaRepository<Articles, Integer>{
    @Query(value = "SELECT id, title, content, category, created_date, updated_date, status FROM Article limit :limitCount offset :offsetCount", nativeQuery = true)
    @Transactional
    List<Articles> getPartofArticles(int limitCount, int offsetCount);

    @Query(value = "SELECT id, title, content, category, created_date, updated_date, status FROM Article a WHERE a.status = :status limit :limitCount offset :offsetCount ", nativeQuery = true)
    @Transactional
    List<Articles> getPartofArticlesByStatus(String status, int limitCount, int offsetCount);
    @Transactional
    List<Articles> findByStatus(String status);



}
