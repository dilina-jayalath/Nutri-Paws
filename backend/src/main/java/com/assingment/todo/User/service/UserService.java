package com.assingment.todo.User.service;

import com.assingment.todo.Customer.entity.Customer;
import com.assingment.todo.Customer.service.CustomerService;
import com.assingment.todo.User.DAO.UserCustomerDAO;
import com.assingment.todo.User.entity.User;
import com.assingment.todo.User.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    // SELECT - FUNCTION OF SELECT ALL USERS
    public List<User> getAllUsers() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error finding users", e);
        }
    }

    // INSERT - FUNCTION OF INSERT USER
    public User addUser(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error adding user", e);
        }
    }

    // SELECT - FUNCTION OF SELECT USER BY ID
    public Optional<User> getUserById(int id) {
        try {
            return userRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error finding user by id", e);
        }
    }

    // UPDATE - FUNCTION OF UPDATE USER
    public User editUser(User user) {
        try {
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error updating user", e);
        }
    }

    // DELETE - FUNCTION OF DELETE USER BY ID
    public void deleteUserById(int id) {
        try {
            userRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user by id", e);
        }
    }

    // SELECT - FUNCTION OF SELECT USERS BY USERNAME OR EMAIL
    public Optional<Object> findByUserNameOrEmail(String userName, String email) {
        try {
            Optional<User> userOptional = userRepository.findByUserNameOrEmail(userName, email);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Optional<Customer> customerOptional = customerService.findByCustomerByUserId(user);
                return Optional.of(new UserCustomerDAO(user, customerOptional.orElse(null)));
            }
            return Optional.empty();
        } catch (Exception e) {
            throw new RuntimeException("Error finding user by username or email", e);
        }
    }

    // Verify password using BCrypt
    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}