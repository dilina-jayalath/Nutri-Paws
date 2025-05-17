package com.assingment.todo.Supplier.repository;

import com.assingment.todo.Customer.entity.Customer;
import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.Supplier.entity.Supplier;
import com.assingment.todo.User.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier,Integer> {
    Optional<Supplier> findByUserId(User user);

    @Query(value = "SELECT i.* FROM supplier i WHERE i.user_id = :userId", nativeQuery = true)
    List<Supplier> findByUserIdNew(@Param("userId") int userId);

}
