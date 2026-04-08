package com.coursehub.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCourseStatusRequest {

    @NotBlank(message = "Status is required")
    private String status;
}
