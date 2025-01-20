package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Group;
import com.example.demo.Repository.GroupRepository;
import com.example.demo.Repository.GroupRepositoryMongo;

@Service
public class GroupService {
    
    @Autowired
    GroupRepositoryMongo repository;

    public List<Group> getAllGroups() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public List<Group> createGroup(Group group) {
        group.setId(null);
        repository.save(group);
        return repository.findAllByOrderByCreatedAtDesc();
    }

    Group getGroupById(String id) {
        return repository.findById(id).get();
    }
}
