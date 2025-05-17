package com.assingment.todo.Item.service;


import com.assingment.todo.Category.DAO.CategoryDAO;
import com.assingment.todo.Category.entity.Category;
import com.assingment.todo.Item.DAO.ItemDAO;
import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.Item.repository.ItemCategoryRepository;
import com.assingment.todo.Item.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ItemService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemCategoryRepository itemCategoryRepository;

    //  SELECT - FUNCTION OF SELECT ALL ITEM
    public List<ItemDAO> getAllItem(){
        try{
            List<Item> items = itemRepository.findAll();
            List<ItemDAO> itemDTOs = new ArrayList<>();

            for (Item item : items) {
                ItemDAO dto = new ItemDAO(
                        item.getItemId(),
                        item.getItemName(),
                        item.getDescription(),
                        item.getPrice(),
                        item.getStock(),
                        item.getEmgUrl(),
                        item.getCreatedAt(),
                        item.getUpdatedAt()
                );
                itemDTOs.add(dto);
            }
            return itemDTOs;

        }catch(Exception e){
            throw new RuntimeException("Error select all Item ",e);
        }
    }

    // GET - FUNCTION OF GET ITEMS BY CATEGORY ID
    public List<ItemDAO> getItemsByCategory(int categoryId){
        try{
            List<Item> items = itemRepository.findItemsByCategoryIdJpql(categoryId);
            List<ItemDAO> itemDTOs = new ArrayList<>();
            for (Item item : items) {
                ItemDAO dto = new ItemDAO(
                        item.getItemId(),
                        item.getItemName(),
                        item.getDescription(),
                        item.getPrice(),
                        item.getStock(),
                        item.getEmgUrl(),
                        item.getCreatedAt(),
                        item.getUpdatedAt()
                );
                itemDTOs.add(dto);
            }
            return itemDTOs;
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    //  INSERT - FUNCTION OF insert ITEM
    public Item setItem(Item item){
        try{
            return itemRepository.save(item);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    public Item setItemWithImg(Item item){
        try{
            return itemRepository.save(item);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    public void updateQty(int id,int qty){
        try{
            itemRepository.decreaseStock(id,qty);
        }catch(Exception e){
            throw new RuntimeException("Error update Item QTY",e);
        }
    }

    //  SELECT - FUNCTION OF SELECT ITEM BY ID
    public Optional<Item> findItemById(int id){
        try{

            return itemRepository.findById(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    //  DELETE - FUNCTION OF DELETE ITEM BY ID
    public void deleteItem(int id){
        try{
            itemRepository.deleteById(id);
        }catch(Exception e){
            throw new RuntimeException("Error Delete Item ",e);
        }
    }

    public List<ItemDAO> getItemLessThan(){
        try{
            List<Item> items = itemRepository.findItemLessThanAll(50);
            List<ItemDAO> itemDTOs = new ArrayList<>();

            for (Item item : items) {
                ItemDAO dto = new ItemDAO(
                        item.getItemId(),
                        item.getItemName(),
                        item.getDescription(),
                        item.getPrice(),
                        item.getStock(),
                        item.getEmgUrl(),
                        item.getCreatedAt(),
                        item.getUpdatedAt()
                );
                itemDTOs.add(dto);
            }
            return itemDTOs;

        }catch(Exception e){
            throw new RuntimeException("Error select all Item ",e);
        }
    }

    public void setCatItem(int itemId, int categoryId) {
        itemCategoryRepository.insertItemCategory(itemId, categoryId);
    }
    public String storeFile(MultipartFile file) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        // Save file
        Files.copy(file.getInputStream(), filePath);

        return fileName;
    }
}
