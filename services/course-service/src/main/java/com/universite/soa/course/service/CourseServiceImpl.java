package com.universite.soa.course.service;

import com.universite.soa.course.contract.ICourseService;
import com.universite.soa.course.model.Course;
import com.universite.soa.course.repository.CourseRepository;
import jakarta.jws.WebService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@WebService(serviceName = "CourseService", 
            portName = "CourseServicePort",
            endpointInterface = "com.universite.soa.course.contract.ICourseService",
            targetNamespace = "http://soap.universite.com/course")
public class CourseServiceImpl implements ICourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Long courseId) {
        Optional<Course> course = courseRepository.findById(courseId);
        return course.orElse(null);
    }

    @Override
    public List<Course> getCoursesByProfessor(String professor) {
        return courseRepository.findAll().stream()
                .filter(c -> c.getProfessor().equalsIgnoreCase(professor))
                .collect(Collectors.toList());
    }

    @Override
    public Course createCourse(String code, String title, String description, Integer credits, String professor) {
        Course course = new Course(code, title, description, credits, professor);
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Long courseId, String code, String title, String description, Integer credits, String professor) {
        Optional<Course> existingCourse = courseRepository.findById(courseId);
        if (existingCourse.isPresent()) {
            Course course = existingCourse.get();
            course.setCode(code);
            course.setTitle(title);
            course.setDescription(description);
            course.setCredits(credits);
            course.setProfessor(professor);
            return courseRepository.save(course);
        }
        return null;
    }

    @Override
    public boolean deleteCourse(Long courseId) {
        if (courseRepository.existsById(courseId)) {
            courseRepository.deleteById(courseId);
            return true;
        }
        return false;
    }

    @Override
    public List<Course> getCoursesByCredits(Integer credits) {
        return courseRepository.findAll().stream()
                .filter(c -> c.getCredits().equals(credits))
                .collect(Collectors.toList());
    }
}
