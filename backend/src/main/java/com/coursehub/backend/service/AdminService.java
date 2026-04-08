package com.coursehub.backend.service;

import com.coursehub.backend.dto.CourseSummaryResponse;
import com.coursehub.backend.dto.UserResponse;

import java.util.List;

public interface AdminService {

    List<UserResponse> getAllUsers(Long adminId);

    List<CourseSummaryResponse> getAllCourses(Long adminId);

    void deleteUser(Long adminId, Long userId);

    CourseSummaryResponse updateCourseStatus(Long adminId, Long courseId, String status);

    void deleteCourse(Long adminId, Long courseId);
}
