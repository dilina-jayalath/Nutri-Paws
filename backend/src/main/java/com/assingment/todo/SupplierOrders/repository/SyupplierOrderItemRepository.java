package com.assingment.todo.SupplierOrders.repository;

import com.assingment.todo.CustomerOrders.entity.OrderItems;
import com.assingment.todo.SuplplierItem.entity.SupplierItem;
import com.assingment.todo.SupplierOrders.entity.SupplierOrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SyupplierOrderItemRepository extends JpaRepository<SupplierOrderItems,Integer> {

    @Query(value = "SELECT i.* FROM supplier_order_items i WHERE i.order_id = :orderId", nativeQuery = true)
    List<SupplierOrderItems> findByOrderId(@Param("orderId") int orderId);


    @Query(value = "SELECT i.* FROM supplier_order_items i WHERE i.order_id = :orderId", nativeQuery = true)
    List<SupplierOrderItems> findAllByOrderId(@Param("orderId") int orderId);
}
