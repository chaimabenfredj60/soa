package com.universite.soa.course.model;

import jakarta.persistence.*;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlElement;

@Entity
@Table(name = "courses")
@XmlRootElement(name = "Course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @XmlElement
    private Long id;

    @Column(nullable = false)
    @XmlElement
    private String code;

    @Column(nullable = false)
    @XmlElement
    private String title;

    @Column(nullable = false)
    @XmlElement
    private String description;

    @Column(nullable = false)
    @XmlElement
    private Integer credits;

    @Column(nullable = false)
    @XmlElement
    private String professor;

    public Course() {
    }

    public Course(String code, String title, String description, Integer credits, String professor) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.credits = credits;
        this.professor = professor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public String getProfessor() {
        return professor;
    }

    public void setProfessor(String professor) {
        this.professor = professor;
    }
}
