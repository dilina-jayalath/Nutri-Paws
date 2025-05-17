package com.assingment.todo.Category.service;

import com.assingment.todo.Category.DAO.CategoryDAO;
import com.assingment.todo.Category.entity.Category;
import com.assingment.todo.Category.repository.CategoryRepository;

import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.Item.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ItemRepository itemRepository;

        //  SELECT - FUNCTION OF SELECT ALL CATEGORIES
    //    public List<Category> getAllCategory(){
    //        try{
    //            return categoryRepository.findAll();
    //
    //        }catch(Exception e){
    //            throw new RuntimeException("Error select all Item ",e);
    //        }
    //    }

    //  SELECT - FUNCTION OF SELECT ALL CATEGORIES
    public List<CategoryDAO> getAllCategory() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDAO> categoryDTOs = new ArrayList<>();
        for (Category category : categories) {
            CategoryDAO dto = new CategoryDAO(
                    category.getCategoryId(),
                    category.getName(),
                    category.getCreatedAt(),
                    category.getUpdatedAt()
            );
            categoryDTOs.add(dto);
        }
        return categoryDTOs;
    }

    //  INSERT - FUNCTION OF insert CATEGORY
    public Category setCategory(Category category){
        try{
            return categoryRepository.save(category);
        }catch(Exception e){
            throw new RuntimeException("Error insert category ",e);
        }
    }

    //  SELECT - FUNCTION OF SELECT CATEGORY BY ID
    public Optional<Category> findCategoryById(int id){
        try{

            return categoryRepository.findById(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert category ",e);
        }
    }

    //  DELETE - FUNCTION OF DELETE CATEGORY BY ID
    public void deleteCategory(int id){
        try{
            categoryRepository.deleteById(id);
        }catch(Exception e){
            throw new RuntimeException("Error Delete category ",e);
        }
    }

    //  SELECT - FUNCTION OF SELECT ALL CATEGORIES with items

        public List<Map<String, Object>> getAllCategoryWithItems() {
            try {
                List<Item> items = itemRepository.findAll();  // Fetch all items
                List<Map<String, Object>> result = new ArrayList<>();

                // Using a map to group items by category
                Map<Integer, Map<String, Object>> categoryMap = new HashMap<>();

                for (Item item : items) {
                    for (Category category : item.getCategories()) {
                        int categoryId = category.getCategoryId();

                        // If the category is not in the map, initialize it
                        if (!categoryMap.containsKey(categoryId)) {
                            Map<String, Object> categoryData = new HashMap<>();
                            categoryData.put("categoryId", categoryId);
                            categoryData.put("name", category.getName());
                            categoryData.put("createdAt", category.getCreatedAt());
                            categoryData.put("updatedAt", category.getUpdatedAt());
                            categoryData.put("items", new ArrayList<Map<String, Object>>());

                            categoryMap.put(categoryId, categoryData);
                        }

                        // Prepare item data
                        Map<String, Object> itemData = new HashMap<>();
                        itemData.put("itemId", item.getItemId());
                        itemData.put("itemName", item.getItemName());
                        itemData.put("description", item.getDescription());
                        itemData.put("price", item.getPrice());
                        itemData.put("stock", item.getStock());
                        itemData.put("emgUrl", item.getEmgUrl());
                        itemData.put("createdAt", item.getCreatedAt());

                        // Add item to its respective category's list
                        ((List<Map<String, Object>>) categoryMap.get(categoryId).get("items")).add(itemData);
                    }
                }

                // Convert map values to list format
                result.addAll(categoryMap.values());

                return result;
            } catch (Exception e) {
                throw new RuntimeException("Error fetching items grouped by category", e);
            }
        }
}
