package com.coursehub.backend.controller;

import com.coursehub.backend.dto.MentorResponse;
import com.coursehub.backend.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mentors")
@RequiredArgsConstructor
public class MentorController {

    private final MentorService mentorService;

    @GetMapping
    public ResponseEntity<List<MentorResponse>> getMentors() {
        return ResponseEntity.ok(mentorService.getMentors());
    }
}
