package com.assingment.todo.SuplplierItem.repository;


import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.SuplplierItem.DAO.SupplierItemDAO;
import com.assingment.todo.SuplplierItem.entity.SupplierItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupplierItemRepository extends JpaRepository<SupplierItem,Integer> {
    @Query(value = "SELECT i.* FROM supplier_item i WHERE i.sup_id = :supId", nativeQuery = true)
    List<SupplierItem> findAllByCusId(@Param("supId") int supId);

}
