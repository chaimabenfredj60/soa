package com.universite.soa.course.contract;

import com.universite.soa.course.model.Course;
import jakarta.jws.WebMethod;
import jakarta.jws.WebService;

import java.util.List;

@WebService(name = "CourseService", targetNamespace = "http://soap.universite.com/course")
public interface ICourseService {

    @WebMethod(operationName = "GetAllCourses")
    List<Course> getAllCourses();

    @WebMethod(operationName = "GetCourseById")
    Course getCourseById(Long courseId);

    @WebMethod(operationName = "GetCoursesByProfessor")
    List<Course> getCoursesByProfessor(String professor);

    @WebMethod(operationName = "CreateCourse")
    Course createCourse(String code, String title, String description, Integer credits, String professor);

    @WebMethod(operationName = "UpdateCourse")
    Course updateCourse(Long courseId, String code, String title, String description, Integer credits, String professor);

    @WebMethod(operationName = "DeleteCourse")
    boolean deleteCourse(Long courseId);

    @WebMethod(operationName = "GetCoursesByCredits")
    List<Course> getCoursesByCredits(Integer credits);
}
