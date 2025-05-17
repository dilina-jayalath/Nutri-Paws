package com.assingment.todo.UserRole.controller;


import com.assingment.todo.UserRole.entity.UserRol;
import com.assingment.todo.UserRole.service.UserRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/userrol")
public class UserRolController {

    @Autowired
    private UserRolService userRolService;

    // GET - FUNCTION OF GET ALL USER-ROLES
    @GetMapping("/getAllUserRole")
    public ResponseEntity<Object> get0AllUserRole(){
        try{
            List<UserRol> userRolleList= userRolService.getAllUserRole();
            if(userRolleList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(userRolleList);
            }
            return ResponseEntity.ok(userRolleList);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST - FUNCTION OF ADD USER-ROLE
    @PostMapping("/setUserRole")
    public ResponseEntity<Object> setUserRole(@RequestBody UserRol userRole){
        try{
            UserRol saveUserRol=userRolService.setUserRole(userRole);
            return ResponseEntity.status(HttpStatus.CREATED).body(saveUserRol);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PUT - FUNCTION OF EDIT USER-ROLL
    @PutMapping("/editUserRole/{id}")
    public ResponseEntity<Object> editUserRole(@PathVariable int id, @RequestBody UserRol userRol){
        try{
            // check if the user roll with given id
            Optional<UserRol> isUserRollExist= userRolService.getUserRollById(id);
            if(isUserRollExist.isPresent()){
                UserRol userRole=isUserRollExist.get();
                userRole.setRoleId(id);
                userRole.setRoleName(userRol.getRoleName());
                UserRol userRol1=userRolService.setUserRole(userRole);
                return ResponseEntity.status(HttpStatus.OK).body(userRol1);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User-Roll not find with id "+ id);
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE - FUNCTION OF DELETE USER-ROLL
    @DeleteMapping("/deleteUserRole/{id}")
    public ResponseEntity<Object> deleteUserRollById(@PathVariable int id){
        try{
            Optional<UserRol> isUserRollExist= userRolService.getUserRollById(id);
            if(isUserRollExist.isPresent()){
                userRolService.deleteUserRollById(id);
                return ResponseEntity.status(HttpStatus.OK).body("User-Roll "+id+" delete successfully");
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User-Roll not find with id " + id);
            }
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
