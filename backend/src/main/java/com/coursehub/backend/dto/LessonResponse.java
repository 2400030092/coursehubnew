package com.coursehub.backend.dto;

import com.coursehub.backend.entity.Lesson;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LessonResponse {
    Long id;
    String title;
    String type;
    Integer duration;
    Integer orderIndex;
    String videoUrl;

    public static LessonResponse fromEntity(Lesson lesson) {
        return LessonResponse.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .type(lesson.getType())
                .duration(lesson.getDurationInSeconds())
                .orderIndex(lesson.getOrderIndex())
                .videoUrl(lesson.getVideoUrl())
                .build();
    }
}
