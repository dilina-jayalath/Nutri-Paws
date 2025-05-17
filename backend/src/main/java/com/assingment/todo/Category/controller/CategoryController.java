package com.assingment.todo.Category.controller;

import com.assingment.todo.Category.DAO.CategoryDAO;
import com.assingment.todo.Category.entity.Category;
import com.assingment.todo.Category.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    // GET - FUNCTION OF GET ALL CATEGORY
    //    @GetMapping("/getAllCategory")
    //    public ResponseEntity<Object> getAllCategory(){
    //        try{
    //            List<Category> item= categoryService.getAllCategory();
    //
    //            if(!item.isEmpty()){
    //                return ResponseEntity.status(HttpStatus.OK).body(item);
    //            }
    //            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    //        }catch(Exception e){
    //            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    //        }
    //    }

    // GET - FUNCTION OF GET ALL CATEGORY
    @GetMapping("/getAllCategory")
    public ResponseEntity<Object> getAllCategory() {
        try {
            List<CategoryDAO> categories = categoryService.getAllCategory();
            if (!categories.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(categories);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST - FUNCTION OF POST CATEGORY
    @PostMapping("/setCategory")
    public ResponseEntity<Object> setCategory(@RequestBody Category category){
        try{
            Category category1=categoryService.setCategory(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(category1);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PUT - FUNCTION OF PUT CATEGORY
    @PutMapping("/updateCategory/{id}")
    public ResponseEntity<Object> updateCategory(@PathVariable int id, @RequestBody Category category){
        try{
            Optional<Category> category1=categoryService.findCategoryById(id);
            if(category1.isPresent()){
                Category upcus=category1.get();
                upcus.setName(category.getName());
                Category resuCategory=categoryService.setCategory(upcus);
                return ResponseEntity.status(HttpStatus.OK).body(resuCategory);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE - FUNCTION OF DELETE CATEGORY
    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity<Object> deleteCategoryById(@PathVariable int id){
        try{
            Optional<Category> category=categoryService.findCategoryById(id);
            if(category.isPresent()){
                categoryService.deleteCategory(id);
                return ResponseEntity.status(HttpStatus.OK).body("Category "+id+" delete successfully");
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET - FUNCTION OF GET ALL ITEMS BY CATEGORY
    @GetMapping("/getAllItemsByCategory")
    public ResponseEntity<Object> getAllItemsByCategory(){
        try{
            List<Map<String, Object>> item= categoryService.getAllCategoryWithItems();

            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
