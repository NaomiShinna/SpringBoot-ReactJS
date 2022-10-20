package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.Length;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "article")
public class Articles {
    //    primary key and auto increment
    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private int id;

    @Column(name = "title", nullable = false)
    @NotNull
    @Size(min = 19, message = "{minimal 20 karakter}")
    @JsonProperty(value = "title")
    private String title;
    //string, default varchar 255

    @Column(name = "content")
    @Lob
    @NotNull
    @Size(min = 199, message = "{minimal 200 karakter}")
    @JsonProperty(value = "content")
    private String content;

    @Column(name = "category")
    @NotNull
    @Size(min = 2, message = "{minimal 3 karakter}")
    @JsonProperty(value = "category")
    private String category;

    @Column(name = "created_date")
    @JsonProperty(value = "created_date")
    private Timestamp created_date;

    @Column(name = "updated_date")
    @JsonProperty(value = "updated_date")
    private Timestamp updated_date;

    @Column(name = "status")
    @NotNull
    @Size(message = "{harus memilih antara Publish, Draft, dan Thrash}")
    @JsonProperty(value = "status")
    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Timestamp getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Timestamp created_date) {
        this.created_date = created_date;
    }

    public Timestamp getUpdated_date() {
        return updated_date;
    }

    public void setUpdated_date(Timestamp updated_date) {
        this.updated_date = updated_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Articles(int id, String title, String content, String category, Timestamp created_date, Timestamp updated_date, String status) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.created_date = created_date;
        this.updated_date = updated_date;
        this.status = status;
    }

    public Articles(){

    }
}
