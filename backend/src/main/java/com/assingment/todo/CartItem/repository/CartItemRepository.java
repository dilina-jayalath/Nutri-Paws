package com.assingment.todo.CartItem.repository;

import com.assingment.todo.CartItem.entity.CartItem;
import com.assingment.todo.CartItem.entity.CartItemStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    @Query(value = "SELECT item.*, cart_item.quantity AS quantity,cart_item.cart_item_id AS cart_id FROM item JOIN cart_item ON cart_item.item_id = item.item_id JOIN cart ON cart.cart_id=cart_item.cart_id WHERE cart_item.status='Active' AND  cart.customer_id = :customerId",
            nativeQuery = true)
    List<ItemProjection> findCarItemsByUserId(@Param("customerId") int customerId);
    // Custom query to update status

    @Modifying
    @Transactional
    @Query(value = "UPDATE cart_item SET status = :status WHERE cart_item_id = :id", nativeQuery = true)
    void updateStatus(@Param("id") int id, @Param("status") String status);

}
