package com.example.demo.Model;

import java.util.List;

public class Group {
    public String id;
    String topicName;
    String creatorId;
    List<Language> languages;
    Level level;
    List<String> userIds;
    Integer limit;

    public Group(String id, String topicName, String creatorId, List<Language> languages, Level level,
            List<String> userIds, Integer limit) {
        this.id = id;
        this.topicName = topicName;
        this.creatorId = creatorId;
        this.languages = languages;
        this.level = level;
        this.userIds = userIds;
        this.limit = limit;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public List<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(List<Language> languages) {
        this.languages = languages;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public List<String> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<String> userIds) {
        this.userIds = userIds;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }
}
