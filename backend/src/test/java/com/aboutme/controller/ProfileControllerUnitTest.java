package com.aboutme.controller;

import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.aboutme.model.Profile;
import com.aboutme.service.ProfileService;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
class ProfileControllerUnitTest {

    @Mock
    ProfileService service;

    MockMvc mvc;

    @BeforeEach
    void setUp() {
        Profile profile = new Profile(
                "Jane Doe",
                "Engineer",
                "Tagline",
                "Pune",
                "Bio",
                new Profile.Contact("jane@example.com", "gh", "li"),
                List.of(new Profile.SkillGroup("Backend", List.of("Java", "Spring"))),
                List.of(new Profile.Experience("Acme", "Dev", "2022-Now", List.of("Built X"))),
                List.of(new Profile.Project("Proj", "Desc", List.of("Java"), "http://x")));
        lenient().when(service.getProfile()).thenReturn(profile);
        mvc = MockMvcBuilders.standaloneSetup(new ProfileController(service)).build();
    }

    @Test
    void profileReturnsFullProfile() throws Exception {
        mvc.perform(get("/api/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Jane Doe"))
                .andExpect(jsonPath("$.contact.email").value("jane@example.com"))
                .andExpect(jsonPath("$.skills[0].category").value("Backend"));
    }

    @Test
    void skillsReturnsOnlySkills() throws Exception {
        mvc.perform(get("/api/skills"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].items[1]").value("Spring"));
    }

    @Test
    void experienceReturnsOnlyExperience() throws Exception {
        mvc.perform(get("/api/experience"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].company").value("Acme"))
                .andExpect(jsonPath("$[0].highlights[0]").value("Built X"));
    }

    @Test
    void projectsReturnsOnlyProjects() throws Exception {
        mvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Proj"))
                .andExpect(jsonPath("$[0].tech[0]").value("Java"));
    }

    @Test
    void unknownEndpointReturns404() throws Exception {
        mvc.perform(get("/api/nope")).andExpect(status().isNotFound());
    }
}
