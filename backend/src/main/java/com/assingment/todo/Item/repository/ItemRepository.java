package com.assingment.todo.Item.repository;

import com.assingment.todo.Item.entity.Item;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item,Integer> {

    // Method to find items by category ID
    @Query(value = "SELECT i.* FROM item i JOIN item_category c ON c.item_id = i.item_id WHERE c.category_id = :categoryId", nativeQuery = true)
    List<Item> findItemsByCategoryIdJpql(@Param("categoryId") int categoryId);

    @Query(value = "SELECT i.* FROM item i WHERE i.stock < :stock", nativeQuery = true)
    List<Item> findItemLessThanAll(@Param("stock") int stock);
    @Modifying
    @Transactional
    @Query(value = "UPDATE item SET stock = stock - :qty WHERE item_id = :item_id", nativeQuery = true)
    void decreaseStock(@Param("item_id") int item_id, @Param("qty") int qty);




}
