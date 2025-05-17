package com.assingment.todo.User.repository;


import com.assingment.todo.User.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {

    // FIND - FUNCTION OF FIND USER BY USERNAME OR EMAIL
    Optional<User> findByUserNameOrEmail(String userName, String email);
}
