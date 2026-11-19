package com.aboutme.model;

import java.util.List;

public record Profile(
        String name,
        String title,
        String tagline,
        String location,
        String bio,
        Contact contact,
        List<SkillGroup> skills,
        List<Experience> experience,
        List<Project> projects) {

    public record Contact(String email, String github, String linkedin) {}

    public record SkillGroup(String category, List<String> items) {}

    public record Experience(String company, String role, String period, List<String> highlights) {}

    public record Project(String name, String description, List<String> tech, String url) {}
}
