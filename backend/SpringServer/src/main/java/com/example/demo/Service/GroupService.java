package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Group;
import com.example.demo.Repository.GroupRepository;

@Service
public class GroupService {
    
    @Autowired
    GroupRepository repository;

    public List<Group> getAllGroups() {
        return repository.getAllGroups();
    }

    public List<Group> createGroup(Group group) {
        repository.createGroup(group);
        return repository.getAllGroups();
    }

    Group getGroupById(String id) {
        return repository.getGroupByID(id);
    }
}
