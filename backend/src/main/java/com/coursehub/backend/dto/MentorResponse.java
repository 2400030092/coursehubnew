package com.coursehub.backend.dto;

import com.coursehub.backend.entity.User;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class MentorResponse {
    Long id;
    String name;
    String role;
    String company;
    String image;
    String bio;
    Double rating;
    Integer students;
    Integer courseCount;

    public static MentorResponse fromEntity(User user, long studentCount, long courseCount) {
        String fullName = String.format("%s %s", user.getFirstName(), user.getLastName()).trim();

        return MentorResponse.builder()
                .id(user.getId())
                .name(fullName)
                .role("Course Mentor")
                .company("CourseHub")
                .image(user.getAvatarUrl())
                .bio((user.getBio() == null || user.getBio().isBlank())
                        ? "Experienced mentor helping learners grow with practical, career-focused guidance."
                        : user.getBio())
                .rating(4.8)
                .students((int) studentCount)
                .courseCount((int) courseCount)
                .build();
    }
}
