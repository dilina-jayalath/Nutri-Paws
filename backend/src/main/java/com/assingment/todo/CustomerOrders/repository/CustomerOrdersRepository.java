package com.assingment.todo.CustomerOrders.repository;

import com.assingment.todo.CustomerOrders.DTO.MonthlyOrderSummary;
import com.assingment.todo.CustomerOrders.entity.CustomerOrders;
import com.assingment.todo.CustomerOrders.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface CustomerOrdersRepository extends JpaRepository<CustomerOrders,Integer>{

    @Query(value = """
    SELECT 
        DATE_FORMAT(created_at, '%Y-%m') AS month,
        SUM(price) AS totalPrice,
        SUM(item_count) AS totalCount
    FROM orders
    GROUP BY DATE_FORMAT(created_at, '%Y-%m')
    ORDER BY month DESC
""", nativeQuery = true)
    List<MonthlyOrderSummary> getMonthlyOrders();

    @Query(value = "SELECT i.* FROM orders i WHERE i.customer_id = :customerId", nativeQuery = true)
    List<CustomerOrders> findyCustomeId(@Param("customerId") int customerId);


    @Query(value = """
    SELECT 
        *
    FROM orders
    WHERE status='Place' AND customer_id = :customerId
    ORDER BY created_at DESC
""", nativeQuery = true)
    List<CustomerOrders> getPendingOrdersByCusId(@Param("customerId") int customerId);

    @Query(value = """
    SELECT 
        *
    FROM orders
    WHERE status='Delivered' AND customer_id = :customerId
    ORDER BY created_at DESC
""", nativeQuery = true)
    List<CustomerOrders> getDeleverdOrdersByCusId(@Param("customerId") int customerId);



}