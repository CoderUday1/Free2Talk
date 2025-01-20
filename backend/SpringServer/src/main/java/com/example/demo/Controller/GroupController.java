package com.example.demo.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Group;
import com.example.demo.Service.GroupService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
public class GroupController {
    
    @Autowired
    GroupService groupService;

    @GetMapping("/groups")
    public List<Group> getGroups() {
        return groupService.getAllGroups();
    }

    @PostMapping("/group")
    public List<Group> createGroup(@ModelAttribute Group group) {
        groupService.createGroup(group);
        return groupService.getAllGroups();
    }
}
