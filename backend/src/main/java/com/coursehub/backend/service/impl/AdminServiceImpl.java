package com.coursehub.backend.service.impl;

import com.coursehub.backend.dto.CourseSummaryResponse;
import com.coursehub.backend.dto.UserResponse;
import com.coursehub.backend.entity.User;
import com.coursehub.backend.enums.CourseStatus;
import com.coursehub.backend.enums.UserRole;
import com.coursehub.backend.repository.CourseRepository;
import com.coursehub.backend.repository.EnrollmentRepository;
import com.coursehub.backend.repository.UserRepository;
import com.coursehub.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers(Long adminId) {
        requireAdmin(adminId);
        return userRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(UserResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CourseSummaryResponse> getAllCourses(Long adminId) {
        requireAdmin(adminId);
        return courseRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(CourseSummaryResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional
    public void deleteUser(Long adminId, Long userId) {
        User admin = requireAdmin(adminId);

        if (admin.getId().equals(userId)) {
            throw new ResponseStatusException(FORBIDDEN, "You cannot delete your own admin account");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));

        if (user.getRole() == UserRole.STUDENT) {
            enrollmentRepository.deleteByStudentId(userId);
            userRepository.delete(user);
            return;
        }

        if (user.getRole() == UserRole.EDUCATOR) {
            var courses = courseRepository.findByInstructorIdOrderByCreatedAtDesc(userId);
            if (!courses.isEmpty()) {
                var courseIds = courses.stream().map(course -> course.getId()).toList();
                enrollmentRepository.deleteByCourseIdIn(courseIds);
                courseRepository.deleteAll(courses);
            }
            userRepository.delete(user);
            return;
        }

        userRepository.delete(user);
    }

    @Override
    @Transactional
    public CourseSummaryResponse updateCourseStatus(Long adminId, Long courseId, String status) {
        requireAdmin(adminId);

        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Course not found"));

        try {
            course.setStatus(CourseStatus.valueOf(status.trim().toUpperCase(Locale.ENGLISH)));
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(BAD_REQUEST, "Invalid course status");
        }

        return CourseSummaryResponse.fromEntity(courseRepository.save(course));
    }

    @Override
    @Transactional
    public void deleteCourse(Long adminId, Long courseId) {
        requireAdmin(adminId);

        if (enrollmentRepository.countByCourseId(courseId) > 0) {
            throw new ResponseStatusException(FORBIDDEN, "Cannot delete a course with enrolled students");
        }

        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Course not found"));
        courseRepository.delete(course);
    }

    private User requireAdmin(Long adminId) {
        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Admin user not found"));

        if (user.getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(FORBIDDEN, "Admin access required");
        }

        return user;
    }
}
