package com.assingment.todo.Cart.repository;

import com.assingment.todo.Cart.entity.Cart;
import com.assingment.todo.Customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Integer> {

    @Query(value = "SELECT * FROM cart WHERE customer_id = :customerId", nativeQuery = true)
    List<Cart> findByCustomerId(@Param("customerId") int customerId);

}
