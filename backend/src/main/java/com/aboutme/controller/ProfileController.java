package com.aboutme.controller;

import com.aboutme.model.Profile;
import com.aboutme.service.ProfileService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping("/profile")
    public Profile profile() {
        return service.getProfile();
    }

    @GetMapping("/skills")
    public List<Profile.SkillGroup> skills() {
        return service.getProfile().skills();
    }

    @GetMapping("/experience")
    public List<Profile.Experience> experience() {
        return service.getProfile().experience();
    }

    @GetMapping("/projects")
    public List<Profile.Project> projects() {
        return service.getProfile().projects();
    }
}
