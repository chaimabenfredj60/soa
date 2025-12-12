package com.universite.soa.course.controller;

import com.universite.soa.course.model.Course;
import com.universite.soa.course.service.CourseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseServiceImpl courseService;

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        response.put("service", "course-service");
        response.put("type", "REST");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getCourses() {
        List<Course> courses = Arrays.asList(
            new Course("SOA101", "Architecture SOA", "Introduction à SOA", 3, "Dr. Ahmed Bennani"),
            new Course("WEB101", "Développement Web", "Fondamentaux du web", 3, "Dr. Fatima Hassan"),
            new Course("DB101", "Bases de données", "Conception BDD", 3, "Dr. Mohamed Karim")
        );
        return ResponseEntity.ok(courses);
    }
}
