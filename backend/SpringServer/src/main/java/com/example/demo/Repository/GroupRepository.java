package com.example.demo.Repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.demo.Model.Group;

@Repository
public class GroupRepository {
    List<Group> groups;
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public GroupRepository() {
        groups = new ArrayList();
    }

    public void createGroup(Group group) {
        groups.add(group);
    }

    public List<Group> getAllGroups() {
        return groups;
    }
    
    public Group getGroupByID(String id) {
        for(Group group: groups) {
            if(group.getId().equals(id)) {
                return group;
            }
        }
        return null;
    }
}
