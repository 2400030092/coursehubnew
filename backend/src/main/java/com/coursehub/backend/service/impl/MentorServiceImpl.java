package com.coursehub.backend.service.impl;

import com.coursehub.backend.dto.MentorResponse;
import com.coursehub.backend.enums.UserRole;
import com.coursehub.backend.repository.CourseRepository;
import com.coursehub.backend.repository.EnrollmentRepository;
import com.coursehub.backend.repository.UserRepository;
import com.coursehub.backend.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MentorServiceImpl implements MentorService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Override
    @Transactional(readOnly = true)
    public List<MentorResponse> getMentors() {
        return userRepository.findByRoleOrderByCreatedAtDesc(UserRole.EDUCATOR).stream()
                .map(user -> MentorResponse.fromEntity(
                        user,
                        enrollmentRepository.countByCourseInstructorId(user.getId()),
                        courseRepository.countByInstructorId(user.getId())
                ))
                .toList();
    }
}
