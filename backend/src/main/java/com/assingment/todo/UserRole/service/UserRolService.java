package com.assingment.todo.UserRole.service;


import com.assingment.todo.UserRole.entity.UserRol;
import com.assingment.todo.UserRole.repository.UserRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserRolService {

    @Autowired
    private UserRolRepository userRolRepository;

    // SELECT - FUNCTION OF SELECT ALL USER-ROLES
    public List<UserRol> getAllUserRole() {
        return userRolRepository.findAll();
    }

    // SAVE - FUNCTION OF SAVE USER-ROLE
    public UserRol setUserRole(UserRol userRol){
        try{
            return userRolRepository.save(userRol);
        }catch(Exception e){
            throw  new RuntimeException("Error saving user roll ",e);
        }
    }

    // UPDATE - FUNCTION OF UPDATE USER ROLE BY ID
    public Optional<UserRol> getUserRollById(int id){
        try{
            return userRolRepository.findById(id);
        }catch (Exception e){
            throw new RuntimeException("Error find user-roll by id",e);
        }
    }

    // SELECT - FUNCTION OF SELECT USER ROLL BY ID
    public UserRol editUserRole(UserRol userRol){
        try{
            return this.setUserRole(userRol);
        }catch(Exception e){
           throw new RuntimeException("Error update user roll by id",e);
        }
    }

    // DELETE - FUNCTION OF DELETE USER ROLL BY ID
    public void deleteUserRollById( int id){
        try{
            userRolRepository.deleteById(id);
        }catch (Exception e){
            throw new RuntimeException("Error delete user roll by id",e);
        }
    }
}
