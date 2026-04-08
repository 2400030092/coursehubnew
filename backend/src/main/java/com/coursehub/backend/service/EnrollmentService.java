package com.coursehub.backend.service;

import com.coursehub.backend.dto.EnrollmentRequest;
import com.coursehub.backend.dto.EnrollmentResponse;

import java.util.List;

public interface EnrollmentService {

    EnrollmentResponse createEnrollment(EnrollmentRequest request);

    List<EnrollmentResponse> getEnrollmentsForStudent(Long studentId);
}
