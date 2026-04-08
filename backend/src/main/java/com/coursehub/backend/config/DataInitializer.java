package com.coursehub.backend.config;

import com.coursehub.backend.entity.Course;
import com.coursehub.backend.entity.CourseModule;
import com.coursehub.backend.entity.Lesson;
import com.coursehub.backend.entity.User;
import com.coursehub.backend.enums.CourseLevel;
import com.coursehub.backend.enums.CourseStatus;
import com.coursehub.backend.enums.UserRole;
import com.coursehub.backend.repository.CourseRepository;
import com.coursehub.backend.repository.EnrollmentRepository;
import com.coursehub.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private static final List<String> LEGACY_SEED_EMAILS = List.of(
            "jane.educator@coursehub.local",
            "student@demo.com",
            "educator@demo.com",
            "admin@demo.com",
            "admin@coursehub.local"
    );

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final InitializerProperties initializerProperties;

    @Bean
    public CommandLineRunner seedData() {
        return args -> {
            if (!initializerProperties.isEnabled()) {
                return;
            }

            cleanupLegacySeedData();
            seedAdminUser();

            if (initializerProperties.isSeedMentors()) {
                seedMentorUsersAndCourses();
            }

            if (initializerProperties.isSeedStudents()) {
                seedStudentUsers();
            }
        };
    }

    @Transactional
    public void seedAdminUser() {
        saveOrUpdateDemoUser(
                initializerProperties.getAdmin().getEmail(),
                initializerProperties.getAdmin().getFirstName(),
                initializerProperties.getAdmin().getLastName(),
                initializerProperties.getAdmin().getPassword(),
                UserRole.ADMIN
        );
    }

    @Transactional
    public void seedMentorUsersAndCourses() {
        List<User> mentors = new ArrayList<>();

        mentors.add(saveOrUpdateDemoUser(
                initializerProperties.getChintu().getEmail(),
                initializerProperties.getChintu().getFirstName(),
                initializerProperties.getChintu().getLastName(),
                initializerProperties.getChintu().getPassword(),
                UserRole.EDUCATOR,
                "Spring Boot mentor focused on backend architecture, MySQL design, and practical Java development.",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80"
        ));

        mentors.add(saveOrUpdateDemoUser(
                "priya.sharma@coursehub.local",
                "Priya",
                "Sharma",
                "Priya@123",
                UserRole.EDUCATOR,
                "UI/UX mentor helping learners design modern product experiences and better interfaces.",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80"
        ));

        mentors.add(saveOrUpdateDemoUser(
                "rahul.verma@coursehub.local",
                "Rahul",
                "Verma",
                "Rahul@123",
                UserRole.EDUCATOR,
                "Frontend mentor teaching React, component design, and responsive web applications.",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
        ));

        mentors.add(saveOrUpdateDemoUser(
                "sneha.patel@coursehub.local",
                "Sneha",
                "Patel",
                "Sneha@123",
                UserRole.EDUCATOR,
                "Data science mentor covering Python, analytics, and machine learning for real projects.",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=80"
        ));

        mentors.add(saveOrUpdateDemoUser(
                "arjun.singh@coursehub.local",
                "Arjun",
                "Singh",
                "Arjun@123",
                UserRole.EDUCATOR,
                "Cloud and DevOps mentor focused on Docker, deployment pipelines, and scalable systems.",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80"
        ));

        seedCourseIfMissing(
                mentors.get(0),
                "Mastering Spring Boot and MySQL",
                "Build real-world REST APIs with Java, Spring Boot, JPA, and MySQL from scratch.",
                "Web Development",
                CourseLevel.INTERMEDIATE,
                "149.99",
                List.of(
                        createModule("Spring Boot Foundations", "Project setup, structure, and REST basics", 1, List.of(
                                createLesson("Creating Your First Spring Boot App", 1, 420, "https://www.youtube.com/embed/9SGDpanrc8U"),
                                createLesson("Designing REST Controllers", 2, 480, "https://www.youtube.com/embed/vtPkZShrvXQ")
                        )),
                        createModule("Persistence with MySQL", "Working with JPA and relational modeling", 2, List.of(
                                createLesson("Entity Mapping Best Practices", 1, 510, "https://www.youtube.com/embed/8SGI_XS5OPw"),
                                createLesson("Repositories and Services", 2, 530, "https://www.youtube.com/embed/quyD6dXU4mE")
                        ))
                )
        );

        seedCourseIfMissing(
                mentors.get(1),
                "Practical UI/UX Design",
                "Learn layout, typography, user flows, and design systems through real product examples.",
                "Design",
                CourseLevel.BEGINNER,
                "89.99",
                List.of(
                        createModule("Design Foundations", "Color, spacing, and visual hierarchy", 1, List.of(
                                createLesson("Understanding Visual Hierarchy", 1, 360, "https://www.youtube.com/embed/Qj1FK8n7WgY"),
                                createLesson("Typography for Interfaces", 2, 420, "https://www.youtube.com/embed/sByzHoiYFX0")
                        )),
                        createModule("UX Workflow", "Research, wireframes, and prototypes", 2, List.of(
                                createLesson("User Journey Mapping", 1, 450, "https://www.youtube.com/embed/mSxpVRo3BLg"),
                                createLesson("Building Clickable Prototypes", 2, 390, "https://www.youtube.com/embed/Ovj4hFxko7c")
                        ))
                )
        );

        seedCourseIfMissing(
                mentors.get(2),
                "React Projects from Zero to Deploy",
                "Create responsive React applications with routing, forms, state management, and deployment.",
                "Web Development",
                CourseLevel.BEGINNER,
                "119.99",
                List.of(
                        createModule("React Core Skills", "Components, props, and hooks", 1, List.of(
                                createLesson("Building Reusable Components", 1, 450, "https://www.youtube.com/embed/Y2hgEGPzTZY"),
                                createLesson("State and Side Effects", 2, 520, "https://www.youtube.com/embed/IYvD9oBCuJI")
                        )),
                        createModule("Shipping a Project", "Routing, forms, and deployment", 2, List.of(
                                createLesson("Working with React Router", 1, 480, "https://www.youtube.com/embed/w7ejDZ8SWv8"),
                                createLesson("Deploying Your App", 2, 360, "https://www.youtube.com/embed/Tn6-PIqc4UM")
                        ))
                )
        );

        seedCourseIfMissing(
                mentors.get(3),
                "Data Science with Python",
                "Explore Python, data cleaning, visualization, and beginner machine learning workflows.",
                "Data Science",
                CourseLevel.INTERMEDIATE,
                "129.99",
                List.of(
                        createModule("Python for Analysis", "Data structures, notebooks, and workflows", 1, List.of(
                                createLesson("Working with Pandas", 1, 540, "https://www.youtube.com/embed/r-uOLxNrNk8"),
                                createLesson("Cleaning Real Data", 2, 480, "https://www.youtube.com/embed/vmEHCJofslg")
                        )),
                        createModule("Visuals and Models", "Charts and introductory ML concepts", 2, List.of(
                                createLesson("Data Visualization with Seaborn", 1, 420, "https://www.youtube.com/embed/6GUZXDef2U0"),
                                createLesson("Intro to Machine Learning", 2, 510, "https://www.youtube.com/embed/i_LwzRVP7bg")
                        ))
                )
        );

        seedCourseIfMissing(
                mentors.get(4),
                "DevOps Foundations with Docker",
                "Understand containers, CI/CD basics, and deployment workflows for modern teams.",
                "Cloud",
                CourseLevel.INTERMEDIATE,
                "109.99",
                List.of(
                        createModule("Containers 101", "Docker fundamentals and images", 1, List.of(
                                createLesson("Understanding Docker Images", 1, 390, "https://www.youtube.com/embed/fqMOX6JJhGo"),
                                createLesson("Running Multi-Service Apps", 2, 450, "https://www.youtube.com/embed/3c-iBn73dDE")
                        )),
                        createModule("Delivery Pipelines", "Automation and cloud-ready practices", 2, List.of(
                                createLesson("CI/CD Concepts", 1, 420, "https://www.youtube.com/embed/scEDHsr3APg"),
                                createLesson("Deploying with Confidence", 2, 360, "https://www.youtube.com/embed/0yWAtQ6wYNM")
                        ))
                )
        );
    }

    @Transactional
    public void seedStudentUsers() {
        saveOrUpdateDemoUser(
                "amit.student@coursehub.local",
                "Amit",
                "Kumar",
                "Amit@123",
                UserRole.STUDENT,
                "Motivated learner exploring full-stack development."
        );

        saveOrUpdateDemoUser(
                "neha.student@coursehub.local",
                "Neha",
                "Gupta",
                "Neha@123",
                UserRole.STUDENT,
                "Design-focused student building UI and UX skills."
        );

        saveOrUpdateDemoUser(
                "rohit.student@coursehub.local",
                "Rohit",
                "Shah",
                "Rohit@123",
                UserRole.STUDENT,
                "Backend learner interested in Java and databases."
        );

        saveOrUpdateDemoUser(
                "kavya.student@coursehub.local",
                "Kavya",
                "Reddy",
                "Kavya@123",
                UserRole.STUDENT,
                "Curious student learning analytics and Python."
        );

        saveOrUpdateDemoUser(
                "vikas.student@coursehub.local",
                "Vikas",
                "Mishra",
                "Vikas@123",
                UserRole.STUDENT,
                "Cloud and DevOps enthusiast growing step by step."
        );
    }

    @Transactional
    private User createUser(String firstName, String lastName, String email, String password, UserRole role) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setBio("");
        user.setAvatarUrl(null);
        return user;
    }

    private User saveOrUpdateDemoUser(String email, String firstName, String lastName, String password, UserRole role) {
        return saveOrUpdateDemoUser(email, firstName, lastName, password, role, "", null);
    }

    private User saveOrUpdateDemoUser(String email, String firstName, String lastName, String password, UserRole role, String bio) {
        return saveOrUpdateDemoUser(email, firstName, lastName, password, role, bio, null);
    }

    private User saveOrUpdateDemoUser(
            String email,
            String firstName,
            String lastName,
            String password,
            UserRole role,
            String bio,
            String avatarUrl
    ) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseGet(() -> createUser(firstName, lastName, email, password, role));

        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setBio(bio);
        user.setAvatarUrl(avatarUrl);

        return userRepository.save(user);
    }

    @Transactional
    public void cleanupLegacySeedData() {
        Set<String> emailsToRemove = new LinkedHashSet<>(LEGACY_SEED_EMAILS);
        emailsToRemove.remove(initializerProperties.getAdmin().getEmail());

        for (String email : emailsToRemove) {
            var courses = courseRepository.findByInstructorEmailIgnoreCase(email);
            if (!courses.isEmpty()) {
                var courseIds = courses.stream().map(course -> course.getId()).toList();
                enrollmentRepository.deleteByCourseIdIn(courseIds);
                courseRepository.deleteAll(courses);
            }

            userRepository.findByEmailIgnoreCase(email).ifPresent(user -> userRepository.delete(user));
        }
    }

    private void seedCourseIfMissing(
            User instructor,
            String title,
            String description,
            String category,
            CourseLevel level,
            String price,
            List<CourseModule> modules
    ) {
        boolean exists = courseRepository.findByInstructorIdOrderByCreatedAtDesc(instructor.getId()).stream()
                .anyMatch(course -> course.getTitle().equalsIgnoreCase(title));

        if (exists) {
            return;
        }

        courseRepository.save(createCourse(
                instructor,
                title,
                description,
                category,
                level,
                new BigDecimal(price),
                null,
                0,
                modules
        ));
    }

    private Course createCourse(
            User instructor,
            String title,
            String description,
            String category,
            CourseLevel level,
            BigDecimal price,
            String thumbnailUrl,
            Integer enrollmentCount,
            List<CourseModule> modules
    ) {
        Course course = new Course();
        course.setTitle(title);
        course.setDescription(description);
        course.setCategory(category);
        course.setLevel(level);
        course.setStatus(CourseStatus.PUBLISHED);
        course.setPrice(price);
        course.setThumbnailUrl(thumbnailUrl);
        course.setEnrollmentCount(enrollmentCount);
        course.setInstructor(instructor);

        for (CourseModule module : modules) {
            module.setCourse(course);
            for (Lesson lesson : module.getLessons()) {
                lesson.setModule(module);
            }
        }

        course.setModules(modules);
        return course;
    }

    private CourseModule createModule(String title, String description, Integer orderIndex, List<Lesson> lessons) {
        CourseModule module = new CourseModule();
        module.setTitle(title);
        module.setDescription(description);
        module.setOrderIndex(orderIndex);
        module.setLessons(lessons);
        return module;
    }

    private Lesson createLesson(String title, Integer orderIndex, Integer duration, String videoUrl) {
        Lesson lesson = new Lesson();
        lesson.setTitle(title);
        lesson.setType("video");
        lesson.setOrderIndex(orderIndex);
        lesson.setDurationInSeconds(duration);
        lesson.setVideoUrl(videoUrl);
        return lesson;
    }
}
