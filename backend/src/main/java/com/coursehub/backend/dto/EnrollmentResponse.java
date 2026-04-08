package com.coursehub.backend.dto;

import com.coursehub.backend.entity.Enrollment;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Value
@Builder
public class EnrollmentResponse {
    Long id;
    Long courseId;
    String title;
    String description;
    String category;
    String level;
    String status;
    Double progress;
    Integer enrollmentCount;
    String thumbnailUrl;
    Long instructorId;
    String firstName;
    String lastName;
    String instructorAvatar;
    LocalDateTime enrolledAt;

    public static EnrollmentResponse fromEntity(Enrollment enrollment) {
        var course = enrollment.getCourse();
        var instructor = course.getInstructor();

        return EnrollmentResponse.builder()
                .id(enrollment.getId())
                .courseId(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .category(course.getCategory())
                .level(course.getLevel() != null ? course.getLevel().name().toLowerCase() : null)
                .status(course.getStatus() != null ? course.getStatus().name().toLowerCase() : null)
                .progress(enrollment.getProgress())
                .enrollmentCount(course.getEnrollmentCount())
                .thumbnailUrl(course.getThumbnailUrl())
                .instructorId(instructor != null ? instructor.getId() : null)
                .firstName(instructor != null ? instructor.getFirstName() : null)
                .lastName(instructor != null ? instructor.getLastName() : null)
                .instructorAvatar(instructor != null ? instructor.getAvatarUrl() : null)
                .enrolledAt(enrollment.getCreatedAt())
                .build();
    }
}
