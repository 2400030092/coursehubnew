package com.coursehub.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.initializer")
public class InitializerProperties {

    private boolean enabled = true;
    private boolean seedMentors = true;
    private boolean seedStudents = true;
    private SeedUser admin = new SeedUser();
    private SeedUser chintu = new SeedUser();

    @Getter
    @Setter
    public static class SeedUser {
        private String firstName;
        private String lastName;
        private String email;
        private String password;
    }
}
