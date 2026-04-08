package com.coursehub.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileUpdateRequest {

    private String firstName;
    private String lastName;
    private String bio;
    private String avatarUrl;
}
