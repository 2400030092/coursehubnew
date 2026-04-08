package com.coursehub.backend.dto;

import com.coursehub.backend.entity.User;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserResponse {
    Long id;
    String email;
    String firstName;
    String lastName;
    String role;
    String bio;
    String avatar;

    public static UserResponse fromEntity(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole() != null ? user.getRole().name().toLowerCase() : null)
                .bio(user.getBio())
                .avatar(user.getAvatarUrl())
                .build();
    }
}
