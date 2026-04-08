package com.coursehub.backend.controller;

import com.coursehub.backend.dto.CourseSummaryResponse;
import com.coursehub.backend.dto.CourseDetailResponse;
import com.coursehub.backend.dto.CreateCourseRequest;
import com.coursehub.backend.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<List<CourseSummaryResponse>> getCourses(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String level
    ) {
        return ResponseEntity.ok(courseService.getCourses(search, category, level));
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseDetailResponse> getCourseById(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getCourseById(courseId));
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<CourseSummaryResponse>> getInstructorCourses(@PathVariable Long instructorId) {
        return ResponseEntity.ok(courseService.getCoursesForInstructor(instructorId));
    }

    @PostMapping
    public ResponseEntity<CourseDetailResponse> createCourse(@Valid @RequestBody CreateCourseRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(courseService.createCourse(request));
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(
            @PathVariable Long courseId,
            @RequestParam Long instructorId
    ) {
        courseService.deleteCourse(courseId, instructorId);
        return ResponseEntity.noContent().build();
    }
}
