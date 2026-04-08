package com.coursehub.backend.service.impl;

import com.coursehub.backend.dto.CourseSummaryResponse;
import com.coursehub.backend.dto.CourseDetailResponse;
import com.coursehub.backend.dto.CreateCourseRequest;
import com.coursehub.backend.entity.Course;
import com.coursehub.backend.entity.User;
import com.coursehub.backend.enums.CourseLevel;
import com.coursehub.backend.enums.CourseStatus;
import com.coursehub.backend.enums.UserRole;
import com.coursehub.backend.repository.CourseRepository;
import com.coursehub.backend.repository.EnrollmentRepository;
import com.coursehub.backend.repository.UserRepository;
import com.coursehub.backend.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Override
    public List<CourseSummaryResponse> getCourses(String search, String category, String level) {
        List<Course> courses;

        if (search != null && !search.isBlank()) {
            courses = courseRepository.findByStatusAndTitleContainingIgnoreCaseOrStatusAndDescriptionContainingIgnoreCase(
                    CourseStatus.PUBLISHED,
                    search.trim(),
                    CourseStatus.PUBLISHED,
                    search.trim()
            );
        } else if (category != null && !category.isBlank()) {
            courses = courseRepository.findByStatusAndCategoryIgnoreCase(CourseStatus.PUBLISHED, category.trim());
        } else if (level != null && !level.isBlank()) {
            courses = courseRepository.findByStatusAndLevel(
                    CourseStatus.PUBLISHED,
                    CourseLevel.valueOf(level.trim().toUpperCase(Locale.ENGLISH))
            );
        } else {
            courses = courseRepository.findByStatus(CourseStatus.PUBLISHED);
        }

        return courses.stream()
                .map(CourseSummaryResponse::fromEntity)
                .toList();
    }

    @Override
    public CourseDetailResponse getCourseById(Long courseId) {
        Course course = courseRepository.findDetailedByIdAndStatus(courseId, CourseStatus.PUBLISHED)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Course not found"));

        return CourseDetailResponse.fromEntity(course);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CourseSummaryResponse> getCoursesForInstructor(Long instructorId) {
        return courseRepository.findByInstructorIdOrderByCreatedAtDesc(instructorId).stream()
                .map(CourseSummaryResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional
    public CourseDetailResponse createCourse(CreateCourseRequest request) {
        User instructor = userRepository.findById(request.getInstructorId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Instructor not found"));

        if (instructor.getRole() != UserRole.EDUCATOR && instructor.getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(BAD_REQUEST, "Only educators can create courses");
        }

        Course course = new Course();
        course.setInstructor(instructor);
        course.setTitle(request.getTitle().trim());
        course.setDescription(request.getDescription().trim());
        course.setCategory(request.getCategory().trim());
        course.setLevel(parseLevel(request.getLevel()));
        course.setStatus(CourseStatus.DRAFT);
        course.setPrice(request.getPrice() != null ? request.getPrice() : BigDecimal.ZERO);
        course.setThumbnailUrl(normalize(request.getThumbnailUrl()));
        course.setEnrollmentCount(0);

        return CourseDetailResponse.fromEntity(courseRepository.save(course));
    }

    @Override
    @Transactional
    public void deleteCourse(Long courseId, Long instructorId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Course not found"));

        if (course.getInstructor() == null || !course.getInstructor().getId().equals(instructorId)) {
            throw new ResponseStatusException(BAD_REQUEST, "You can only delete your own courses");
        }

        if (enrollmentRepository.countByCourseId(courseId) > 0) {
            throw new ResponseStatusException(BAD_REQUEST, "Cannot delete a course with enrolled students");
        }

        courseRepository.delete(course);
    }

    private CourseLevel parseLevel(String rawLevel) {
        try {
            return CourseLevel.valueOf(rawLevel.trim().toUpperCase(Locale.ENGLISH));
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(BAD_REQUEST, "Invalid course level");
        }
    }

    private String normalize(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
