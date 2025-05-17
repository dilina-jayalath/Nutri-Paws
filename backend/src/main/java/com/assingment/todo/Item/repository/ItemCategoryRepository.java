package com.assingment.todo.Item.repository;

import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.Category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ItemCategoryRepository extends JpaRepository<Item, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO item_category (item_id, category_id) VALUES (:itemId, :categoryId)", nativeQuery = true)
    void insertItemCategory(@Param("itemId") int itemId, @Param("categoryId") int categoryId);
}