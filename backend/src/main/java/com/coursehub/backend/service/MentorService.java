package com.coursehub.backend.service;

import com.coursehub.backend.dto.MentorResponse;

import java.util.List;

public interface MentorService {

    List<MentorResponse> getMentors();
}
