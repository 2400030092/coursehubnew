package com.coursehub.backend.dto;

import com.coursehub.backend.entity.Course;
import lombok.Builder;
import lombok.Value;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@Value
@Builder
public class CourseDetailResponse {
    Long id;
    String title;
    String description;
    String category;
    String level;
    BigDecimal price;
    String status;
    String thumbnailUrl;
    Integer enrollmentCount;
    Long instructorId;
    String firstName;
    String lastName;
    String instructorAvatar;
    List<CourseModuleResponse> modules;

    public static CourseDetailResponse fromEntity(Course course) {
        return CourseDetailResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .category(course.getCategory())
                .level(course.getLevel() != null ? course.getLevel().name().toLowerCase() : null)
                .price(course.getPrice())
                .status(course.getStatus() != null ? course.getStatus().name().toLowerCase() : null)
                .thumbnailUrl(course.getThumbnailUrl())
                .enrollmentCount(course.getEnrollmentCount())
                .instructorId(course.getInstructor() != null ? course.getInstructor().getId() : null)
                .firstName(course.getInstructor() != null ? course.getInstructor().getFirstName() : null)
                .lastName(course.getInstructor() != null ? course.getInstructor().getLastName() : null)
                .instructorAvatar(course.getInstructor() != null ? course.getInstructor().getAvatarUrl() : null)
                .modules(course.getModules().stream()
                        .sorted(Comparator.comparing(CourseDetailResponse::moduleOrder))
                        .map(CourseModuleResponse::fromEntity)
                        .toList())
                .build();
    }

    private static Integer moduleOrder(com.coursehub.backend.entity.CourseModule module) {
        return module.getOrderIndex();
    }
}
