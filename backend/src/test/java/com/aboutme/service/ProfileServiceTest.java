package com.aboutme.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;

import com.aboutme.model.Profile;
import tools.jackson.databind.json.JsonMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProfileServiceTest {

    private ProfileService service;

    @BeforeEach
    void setUp() throws Exception {
        service = new ProfileService(JsonMapper.builder().build());
        service.load();
    }

    @Test
    void loadsProfileFromClasspath() {
        Profile profile = service.getProfile();

        assertNotNull(profile);
        assertFalse(profile.name().isBlank());
        assertFalse(profile.title().isBlank());
    }

    @Test
    void loadsContactDetails() {
        Profile.Contact contact = service.getProfile().contact();

        assertNotNull(contact);
        assertFalse(contact.email().isBlank());
        assertFalse(contact.github().isBlank());
        assertFalse(contact.linkedin().isBlank());
    }

    @Test
    void loadsNonEmptySkillGroupsWithItems() {
        var skills = service.getProfile().skills();

        assertFalse(skills.isEmpty());
        skills.forEach(group -> {
            assertFalse(group.category().isBlank());
            assertFalse(group.items().isEmpty());
        });
    }

    @Test
    void loadsExperienceEntries() {
        var experience = service.getProfile().experience();

        assertFalse(experience.isEmpty());
        experience.forEach(e -> {
            assertFalse(e.company().isBlank());
            assertFalse(e.role().isBlank());
        });
    }

    @Test
    void loadsProjectsWithTech() {
        var projects = service.getProfile().projects();

        assertFalse(projects.isEmpty());
        projects.forEach(p -> {
            assertFalse(p.name().isBlank());
            assertFalse(p.tech().isEmpty());
        });
    }

    @Test
    void returnsSameInstanceOnRepeatedCalls() {
        assertSame(service.getProfile(), service.getProfile());
    }

    @Test
    void profileIsNullBeforeLoad() {
        assertNull(new ProfileService(JsonMapper.builder().build()).getProfile());
    }
}
