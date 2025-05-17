package com.assingment.todo.SuplplierItem.service;

import com.assingment.todo.Item.DAO.ItemDAO;
import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.SuplplierItem.DAO.SupplierItemDAO;
import com.assingment.todo.SuplplierItem.entity.SupplierItem;
import com.assingment.todo.SuplplierItem.repository.SupplierItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SupplierItemService {


    @Autowired
    SupplierItemRepository supplierItemRepository;

    //      SELECT - FUNCTION OF SELECT ALL ITEM
    public List<SupplierItemDAO> getAllSupplierItem() {
        try {
            return supplierItemRepository.findAll().stream()
                    .map(supplierItem -> new SupplierItemDAO(
                            supplierItem.getSupplierItemId(),
                            supplierItem.getItemName(),
                            supplierItem.getDescription(),
                            supplierItem.getPrice(),
                            supplierItem.getStock(),
                            supplierItem.getEmgUrl(),
                            supplierItem.getSupId(),
                            supplierItem.getCreatedAt(),
                            supplierItem.getUpdatedAt()
                    ))
                    .collect(Collectors.toList());
        } catch(Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching all Supplier Items", e);
        }
    }

    //  INSERT - FUNCTION OF insert ITEM
    public SupplierItem setSupplierItem(SupplierItemDAO supplierItemDAO){
        try{
            SupplierItem supplierItem=new SupplierItem(
                    supplierItemDAO.getItemName(),
                    supplierItemDAO.getDescription(),
                    supplierItemDAO.getPrice(),
                    supplierItemDAO.getStock(),
                    supplierItemDAO.getEmgUrl(),
                    supplierItemDAO.getCategoryId(),
                    supplierItemDAO.getSupId()

                    );
            return supplierItemRepository.save(supplierItem);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    public SupplierItem setSupplierItemNew(SupplierItem supplierItemDAO){
        try{
            return supplierItemRepository.save(supplierItemDAO);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    public Optional<SupplierItem> findItemById(int id){
        try{

            return supplierItemRepository.findById(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    public void deleteItem(int id){
        try{
            supplierItemRepository.deleteById(id);
        }catch(Exception e){
            throw new RuntimeException("Error Delete Item ",e);
        }
    }

    public List<SupplierItemDAO> getAllSupplierItemBySupId(int supId) {
        try {
            List<SupplierItem> items = supplierItemRepository.findAllByCusId(supId);
            List<SupplierItemDAO> itemDTOs = new ArrayList<>();

            for (SupplierItem supplierItem : items) {
                SupplierItemDAO dto = new SupplierItemDAO(
                            supplierItem.getSupplierItemId(),
                            supplierItem.getItemName(),
                            supplierItem.getDescription(),
                            supplierItem.getPrice(),
                            supplierItem.getStock(),
                            supplierItem.getEmgUrl(),
                            supplierItem.getSupId(),
                            supplierItem.getCreatedAt(),
                            supplierItem.getUpdatedAt()
                );
                itemDTOs.add(dto);
            }
            return itemDTOs;

        } catch(Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching all Supplier Items", e);
        }
    }

}
