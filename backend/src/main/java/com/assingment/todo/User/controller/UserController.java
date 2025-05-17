package com.assingment.todo.User.controller;

import com.assingment.todo.User.DAO.UserCustomerDAO;
import com.assingment.todo.User.entity.User;
import com.assingment.todo.User.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    UserService userService;

    // GET - FUNCTION OF GET ALL USERS
    @GetMapping("/getAllUsers")
    public ResponseEntity<Object> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            if (users.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(users);
            }
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST - FUNCTION OF ADD USER
    @PostMapping("/setUser")
    public ResponseEntity<User> setUser(@RequestBody User user) {
        try {
            User userRes = userService.addUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(userRes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PUT - FUNCTION OF EDIT USER
    @PutMapping("/editUser/{id}")
    public ResponseEntity<Object> editUser(@PathVariable int id, @RequestBody User user) {
        try {
            Optional<User> isUserExist = userService.getUserById(id);
            if (isUserExist.isPresent()) {
                User user1 = isUserExist.get();
                user1.setEmail(user.getEmail());
                if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                    user1.setPassword(user.getPassword()); // Password will be encoded in UserService
                }
                user1.setUserName(user.getUserName());
                User user2 = userService.editUser(user1);
                return ResponseEntity.status(HttpStatus.OK).body(user2);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE - FUNCTION OF DELETE USER
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Object> deleteUserById(@PathVariable int id) {
        try {
            Optional<User> isUserExist = userService.getUserById(id);
            if (isUserExist.isPresent()) {
                userService.deleteUserById(id);
                return ResponseEntity.status(HttpStatus.OK).body(isUserExist);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST - FUNCTION OF GET USER BY USERNAME OR EMAIL
    @PostMapping("/loginUser")
    public ResponseEntity<Object> doLoginUser(@RequestBody User user) {
        try {
            Optional<Object> existingUser = userService.findByUserNameOrEmail(user.getUserName(), user.getEmail());
            if (existingUser.isPresent()) {
                UserCustomerDAO userResponse = (UserCustomerDAO) existingUser.get();
                User dbUser = userResponse.getUser();
                if (userService.verifyPassword(user.getPassword(), dbUser.getPassword())) {
                    return ResponseEntity.status(HttpStatus.OK).body(userResponse);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
}