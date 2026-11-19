package com.aboutme.service;

import com.aboutme.model.Profile;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

/** Loads profile content from profile.json once at startup. No database needed. */
@Service
public class ProfileService {

    private final ObjectMapper mapper;
    private Profile profile;

    public ProfileService(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @PostConstruct
    void load() throws IOException {
        try (InputStream in = new ClassPathResource("profile.json").getInputStream()) {
            this.profile = mapper.readValue(in, Profile.class);
        }
    }

    public Profile getProfile() {
        return profile;
    }
}
