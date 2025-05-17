package com.assingment.todo.Customer.repository;

import com.assingment.todo.Customer.entity.Customer;
import com.assingment.todo.User.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Integer> {
    Optional<Customer> findByUserId(User user);
}
