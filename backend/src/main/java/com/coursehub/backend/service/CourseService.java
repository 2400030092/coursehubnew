package com.coursehub.backend.service;

import com.coursehub.backend.dto.CourseSummaryResponse;
import com.coursehub.backend.dto.CourseDetailResponse;
import com.coursehub.backend.dto.CreateCourseRequest;

import java.util.List;

public interface CourseService {

    List<CourseSummaryResponse> getCourses(String search, String category, String level);

    CourseDetailResponse getCourseById(Long courseId);

    List<CourseSummaryResponse> getCoursesForInstructor(Long instructorId);

    CourseDetailResponse createCourse(CreateCourseRequest request);

    void deleteCourse(Long courseId, Long instructorId);
}
