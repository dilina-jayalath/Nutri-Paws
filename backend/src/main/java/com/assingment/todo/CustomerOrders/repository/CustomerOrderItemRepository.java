package com.assingment.todo.CustomerOrders.repository;

import com.assingment.todo.CustomerOrders.entity.OrderItems;
import com.assingment.todo.Item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerOrderItemRepository extends JpaRepository<OrderItems,Integer> {

    @Query(value = "SELECT i.* FROM order_items i WHERE i.order_id = :orderId", nativeQuery = true)
    List<OrderItems> findByOrderId(@Param("orderId") int orderId);

}
