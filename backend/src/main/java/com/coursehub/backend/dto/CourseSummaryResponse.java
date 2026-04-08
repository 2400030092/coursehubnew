package com.coursehub.backend.dto;

import com.coursehub.backend.entity.Course;
import lombok.Builder;
import lombok.Value;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Value
@Builder
public class CourseSummaryResponse {
    Long id;
    String title;
    String description;
    String category;
    String level;
    BigDecimal price;
    String status;
    Long instructorId;
    String firstName;
    String lastName;
    String instructorAvatar;
    String thumbnailUrl;
    Integer enrollmentCount;
    LocalDateTime createdAt;

    public static CourseSummaryResponse fromEntity(Course course) {
        return CourseSummaryResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .category(course.getCategory())
                .level(course.getLevel() != null ? course.getLevel().name().toLowerCase() : null)
                .price(course.getPrice())
                .status(course.getStatus() != null ? course.getStatus().name().toLowerCase() : null)
                .instructorId(course.getInstructor() != null ? course.getInstructor().getId() : null)
                .firstName(course.getInstructor() != null ? course.getInstructor().getFirstName() : null)
                .lastName(course.getInstructor() != null ? course.getInstructor().getLastName() : null)
                .instructorAvatar(course.getInstructor() != null ? course.getInstructor().getAvatarUrl() : null)
                .thumbnailUrl(course.getThumbnailUrl())
                .enrollmentCount(course.getEnrollmentCount())
                .createdAt(course.getCreatedAt())
                .build();
    }
}
