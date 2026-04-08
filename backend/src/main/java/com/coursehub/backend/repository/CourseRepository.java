package com.coursehub.backend.repository;

import com.coursehub.backend.entity.Course;
import com.coursehub.backend.enums.CourseLevel;
import com.coursehub.backend.enums.CourseStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByStatus(CourseStatus status);

    List<Course> findByStatusAndCategoryIgnoreCase(CourseStatus status, String category);

    List<Course> findByStatusAndLevel(CourseStatus status, CourseLevel level);

    List<Course> findByStatusAndTitleContainingIgnoreCaseOrStatusAndDescriptionContainingIgnoreCase(
            CourseStatus firstStatus,
            String title,
            CourseStatus secondStatus,
            String description
    );

    @Query("""
            select distinct c from Course c
            left join fetch c.modules m
            left join fetch m.lessons
            left join fetch c.instructor
            where c.id = :courseId and c.status = :status
            """)
    Optional<Course> findDetailedByIdAndStatus(@Param("courseId") Long courseId, @Param("status") CourseStatus status);

    @EntityGraph(attributePaths = {"instructor"})
    List<Course> findByInstructorIdOrderByCreatedAtDesc(Long instructorId);

    @EntityGraph(attributePaths = {"instructor"})
    List<Course> findAllByOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = {"instructor"})
    List<Course> findByInstructorEmailIgnoreCase(String email);

    long countByInstructorId(Long instructorId);
}
