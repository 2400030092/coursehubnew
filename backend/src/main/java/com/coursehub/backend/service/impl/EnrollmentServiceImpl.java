package com.coursehub.backend.service.impl;

import com.coursehub.backend.dto.EnrollmentRequest;
import com.coursehub.backend.dto.EnrollmentResponse;
import com.coursehub.backend.entity.Enrollment;
import com.coursehub.backend.entity.User;
import com.coursehub.backend.enums.CourseStatus;
import com.coursehub.backend.enums.UserRole;
import com.coursehub.backend.repository.CourseRepository;
import com.coursehub.backend.repository.EnrollmentRepository;
import com.coursehub.backend.repository.UserRepository;
import com.coursehub.backend.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Override
    @Transactional
    public EnrollmentResponse createEnrollment(EnrollmentRequest request) {
        User student = userRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));

        if (student.getRole() != UserRole.STUDENT) {
            throw new ResponseStatusException(BAD_REQUEST, "Only students can enroll in courses");
        }

        var course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Course not found"));

        if (course.getStatus() != CourseStatus.PUBLISHED) {
            throw new ResponseStatusException(BAD_REQUEST, "Only published courses can be enrolled in");
        }

        if (enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), course.getId())) {
            throw new ResponseStatusException(BAD_REQUEST, "You are already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setProgress(0.0);

        course.setEnrollmentCount(course.getEnrollmentCount() + 1);
        courseRepository.save(course);

        return EnrollmentResponse.fromEntity(enrollmentRepository.save(enrollment));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EnrollmentResponse> getEnrollmentsForStudent(Long studentId) {
        return enrollmentRepository.findByStudentIdOrderByCreatedAtDesc(studentId).stream()
                .map(EnrollmentResponse::fromEntity)
                .toList();
    }
}
