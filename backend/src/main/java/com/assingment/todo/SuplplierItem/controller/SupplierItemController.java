package com.assingment.todo.SuplplierItem.controller;


import com.assingment.todo.Category.entity.Category;
import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.SuplplierItem.DAO.SupplierItemDAO;
import com.assingment.todo.SuplplierItem.entity.SupplierItem;
import com.assingment.todo.SuplplierItem.service.SupplierItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/supplieritem")
public class SupplierItemController {


    @Autowired
    SupplierItemService supplierItemService;

    //     GET - FUNCTION OF GET ALL CATEGORY
    @GetMapping("/getAllSupplierItem")
    public ResponseEntity<Object> getAllSupplietrItems(){
        try{
            List<SupplierItemDAO> item= supplierItemService.getAllSupplierItem();

            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST - FUNCTION OF POST CATEGORY
    @PostMapping("/setSupplierItem")
    public ResponseEntity<Object> setCustomer(@RequestBody SupplierItemDAO supplierItemDAO){
        try{
            SupplierItem item1=supplierItemService.setSupplierItem(supplierItemDAO);
            return ResponseEntity.status(HttpStatus.CREATED).body(item1);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/setSupplierItemNew")
    public ResponseEntity<Object> setCustomerNew(@RequestBody SupplierItem supplierItem){
        try{
            SupplierItem item1=supplierItemService.setSupplierItemNew(supplierItem);
            return ResponseEntity.status(HttpStatus.CREATED).body(item1);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //     GET - FUNCTION OF GET ALL supplier items by supplier id
    @PostMapping("/getAllSupplierItemBySupId/{id}")
    public ResponseEntity<Object> getAllSupplietrItemsBySupId(@PathVariable int id){
        try{
            List<SupplierItemDAO> item= supplierItemService.getAllSupplierItemBySupId(id);

            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/deleteSupplier/{id}")
    public ResponseEntity<Object> deleteCustomerById(@PathVariable int id){
        try{
            Optional<SupplierItem> item=supplierItemService.findItemById(id);
            if(item.isPresent()){
                 supplierItemService.deleteItem(id);
                // return ResponseEntity.status(HttpStatus.OK).body("Item "+id+" delete successfully");

                // return ResponseEntity.status(HttpStatus.OK).body("Item "+id+" delete successfully");
                // ✅ Return a success message
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Delete successfully");
                response.put("deleteItemId", id);

                return ResponseEntity.status(HttpStatus.OK).body(response);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/updateSupplier/{id}")
    public ResponseEntity<Object> updateSupplier(@PathVariable int id, @RequestBody SupplierItem supplierItem) {
        try {
            Optional<SupplierItem> itemOpt = supplierItemService.findItemById(id);

            if (itemOpt.isPresent()) {
                SupplierItem existingItem = itemOpt.get();

                        existingItem.setItemName(supplierItem.getItemName());
                        existingItem.setDescription(supplierItem.getDescription());
                        existingItem.setPrice(supplierItem.getPrice());
                        existingItem.setStock(supplierItem.getStock());
                        existingItem.setEmgUrl(supplierItem.getEmgUrl());
                        existingItem.setSupId(supplierItem.getSupId());

                SupplierItem savedItem = supplierItemService.setSupplierItemNew(existingItem);
                return ResponseEntity.status(HttpStatus.OK).body(savedItem);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the item.");
        }
    }



}
