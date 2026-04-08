package com.coursehub.backend.repository;

import com.coursehub.backend.entity.Enrollment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    @EntityGraph(attributePaths = {"course", "course.instructor"})
    List<Enrollment> findByStudentIdOrderByCreatedAtDesc(Long studentId);

    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);

    Optional<Enrollment> findByStudentIdAndCourseId(Long studentId, Long courseId);

    long countByCourseId(Long courseId);

    long countByCourseInstructorId(Long instructorId);

    void deleteByCourseIdIn(List<Long> courseIds);

    void deleteByStudentId(Long studentId);
}
