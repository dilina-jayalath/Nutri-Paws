package com.assingment.todo.Item.controller;


import com.assingment.todo.Category.entity.Category;
import com.assingment.todo.Category.repository.CategoryRepository;
import com.assingment.todo.Item.DAO.ItemDAO;
import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.Item.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/item")
public class ItemController {


    @Autowired
    ItemService itemService;
    @Autowired
    CategoryRepository categoryRepository;

    // GET - FUNCTION OF GET ALL CATEGORY
    @GetMapping("/getAllItem")
    public ResponseEntity<Object> getAllCustomers(){
        try{
            List<ItemDAO> item= itemService.getAllItem();

            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET - FUNCTION OF GET ITEMS BY CATEGORY ID
    @GetMapping("/byCategory/{categoryId}")
    public ResponseEntity<Object> getItemsByCategory(@PathVariable int categoryId) {
        try {

//            Optional<Category> category = categoryRepository.findById(categoryId);
            List<ItemDAO> category = itemService.getItemsByCategory(categoryId);
            if (!category.isEmpty()) {

                return ResponseEntity.status(HttpStatus.OK).body(category);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching items for category: " + e.getMessage());
        }
    }

    // POST - FUNCTION OF POST CATEGORY
    @PostMapping("/setItem")
    public ResponseEntity<Object> setCustomer(@RequestBody Item item){
        try{
            Item item1=itemService.setItem(item);
            int itemId=item1.getItemId();
            for (Category category:item.getCategories()) {
                int catid=category.getCategoryId();
                itemService.setCatItem(itemId,catid);
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(item1);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST - FUNCTION OF POST CATEGORY
    @PostMapping("/setItemwithimg")
    public ResponseEntity<Object> setItem(@RequestBody Item item,@RequestParam("image") MultipartFile image){
        try{
            // Store the file and get the path
            String imagePath = itemService.storeFile(image);
            Item itemData=new Item(item.getItemId(),item.getItemName(),item.getDescription(),item.getPrice(),item.getStock(),imagePath);
            Item item1=itemService.setItemWithImg(itemData);
            return ResponseEntity.status(HttpStatus.CREATED).body(item1);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // PUT - FUNCTION OF PUT CATEGORY
    @PutMapping("/updateItem/{id}")
    public ResponseEntity<Object> updateItem(@PathVariable int id, @RequestBody Item updatedItem) {
        try {
            Optional<Item> itemOpt = itemService.findItemById(id);

            if (itemOpt.isPresent()) {
                Item existingItem = itemOpt.get();

                // Check if categories exist in the DB before setting them
                Set<Category> categories = updatedItem.getCategories();
                if (categories != null) {
                    for (Category category : categories) {
                        if (categoryRepository.findById(category.getCategoryId()).isEmpty()) {
                            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                    .body("Category ID " + category.getCategoryId() + " does not exist.");
                        }
                    }
                    existingItem.setCategories(categories);
                }

                existingItem.setItemName(updatedItem.getItemName());
                existingItem.setDescription(updatedItem.getDescription());
                existingItem.setPrice(updatedItem.getPrice());
                existingItem.setStock(updatedItem.getStock());
                existingItem.setEmgUrl(updatedItem.getEmgUrl());

                Item savedItem = itemService.setItem(existingItem);
                return ResponseEntity.status(HttpStatus.OK).body(savedItem);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the item.");
        }
    }



    // DELETE - FUNCTION OF DELETE CATEGORY
    @DeleteMapping("/deleteItem/{id}")
    public ResponseEntity<Object> deleteCustomerById(@PathVariable int id){
        try{
            Optional<Item> item=itemService.findItemById(id);
            if(item.isPresent()){
                itemService.deleteItem(id);
//                return ResponseEntity.status(HttpStatus.OK).body("Item "+id+" delete successfully");
                // ✅ Return a success message
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Item Delete successfully");
                response.put("deleteItemId", id);

                return ResponseEntity.status(HttpStatus.OK).body(response);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET - FUNCTION OF GET ITEMS LESS THAN 50
    @GetMapping("/getItemAlert")
    public ResponseEntity<Object> getItemLessThan(){
        try{
            List<ItemDAO> item= itemService.getItemLessThan();

            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
