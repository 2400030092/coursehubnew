package com.coursehub.backend.controller;

import com.coursehub.backend.dto.AdminCourseStatusRequest;
import com.coursehub.backend.dto.CourseSummaryResponse;
import com.coursehub.backend.dto.UserResponse;
import com.coursehub.backend.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers(@RequestParam Long adminId) {
        return ResponseEntity.ok(adminService.getAllUsers(adminId));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@RequestParam Long adminId, @PathVariable Long userId) {
        adminService.deleteUser(adminId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/courses")
    public ResponseEntity<List<CourseSummaryResponse>> getAllCourses(@RequestParam Long adminId) {
        return ResponseEntity.ok(adminService.getAllCourses(adminId));
    }

    @PatchMapping("/courses/{courseId}/status")
    public ResponseEntity<CourseSummaryResponse> updateCourseStatus(
            @RequestParam Long adminId,
            @PathVariable Long courseId,
            @Valid @RequestBody AdminCourseStatusRequest request
    ) {
        return ResponseEntity.ok(adminService.updateCourseStatus(adminId, courseId, request.getStatus()));
    }

    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<Void> deleteCourse(@RequestParam Long adminId, @PathVariable Long courseId) {
        adminService.deleteCourse(adminId, courseId);
        return ResponseEntity.noContent().build();
    }
}
