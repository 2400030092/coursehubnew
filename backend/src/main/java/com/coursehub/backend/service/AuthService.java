package com.coursehub.backend.service;

import com.coursehub.backend.dto.AuthLoginRequest;
import com.coursehub.backend.dto.AuthRegisterRequest;
import com.coursehub.backend.dto.UserProfileUpdateRequest;
import com.coursehub.backend.dto.UserResponse;

public interface AuthService {

    UserResponse login(AuthLoginRequest request);

    UserResponse register(AuthRegisterRequest request);

    UserResponse updateProfile(Long userId, UserProfileUpdateRequest request);
}
