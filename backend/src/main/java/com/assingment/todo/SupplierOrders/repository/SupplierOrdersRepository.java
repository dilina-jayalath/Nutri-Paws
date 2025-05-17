package com.assingment.todo.SupplierOrders.repository;

import com.assingment.todo.CustomerOrders.entity.CustomerOrders;
import com.assingment.todo.SupplierOrders.entity.SupplierOrders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupplierOrdersRepository extends JpaRepository<SupplierOrders,Integer>{

    @Query(value = """
    SELECT 
        supplier_orders.*
    FROM supplier_orders
    LEFT JOIN supplier_order_items ON supplier_order_items.order_id=supplier_orders.order_id
    WHERE supplier_order_items.supplier_id = :customerId
    GROUP BY supplier_orders.order_id
""", nativeQuery = true)
    List<SupplierOrders> findyCustomeId(@Param("customerId") int customerId);

    @Query(value = """
    SELECT 
        supplier_orders.*
    FROM supplier_orders
    LEFT JOIN supplier_order_items ON supplier_order_items.order_id=supplier_orders.order_id
    WHERE status= :status AND supplier_order_items.supplier_id = :customerId
    ORDER BY supplier_orders.created_at DESC
""", nativeQuery = true)
    List<SupplierOrders> getReturndOrdersBySupId(@Param("customerId") int customerId,@Param("status") String status);



}