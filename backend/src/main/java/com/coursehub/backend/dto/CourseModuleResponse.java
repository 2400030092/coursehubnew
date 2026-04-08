package com.coursehub.backend.dto;

import com.coursehub.backend.entity.CourseModule;
import lombok.Builder;
import lombok.Value;

import java.util.Comparator;
import java.util.List;

@Value
@Builder
public class CourseModuleResponse {
    Long id;
    String title;
    String description;
    Integer orderIndex;
    List<LessonResponse> lessons;

    public static CourseModuleResponse fromEntity(CourseModule module) {
        return CourseModuleResponse.builder()
                .id(module.getId())
                .title(module.getTitle())
                .description(module.getDescription())
                .orderIndex(module.getOrderIndex())
                .lessons(module.getLessons().stream()
                        .sorted(Comparator.comparing(CourseModuleResponse::lessonOrder))
                        .map(LessonResponse::fromEntity)
                        .toList())
                .build();
    }

    private static Integer lessonOrder(com.coursehub.backend.entity.Lesson lesson) {
        return lesson.getOrderIndex();
    }
}
