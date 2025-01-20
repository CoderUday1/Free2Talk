package com.example.demo.Repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Model.Group;

public interface GroupRepositoryMongo extends MongoRepository<Group, String> {
    List<Group> findByTopicName(String topicName);
    List<Group> findAllByOrderByCreatedAtDesc();
}

