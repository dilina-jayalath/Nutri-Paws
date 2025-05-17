package com.assingment.todo.SuplplierItem.DAO;

import com.assingment.todo.Category.entity.Category;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@JsonIgnoreProperties(ignoreUnknown = true)
public class SupplierItemDAO {

    private int supplierItemId;
    private String itemName;
    private String description;
    private Float price;

    private int supId;
    private int stock;

    private int categoryId;
    private String emgUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Set<Category> categories;

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public int getSupId() {
        return supId;
    }

    public void setSupId(int supId) {
        this.supId = supId;
    }

    public int getSupplierItemId() {
        return supplierItemId;
    }

    public void setSupplierItemId(int supplierItemId) {
        this.supplierItemId = supplierItemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getEmgUrl() {
        return emgUrl;
    }

    public void setEmgUrl(String emgUrl) {
        this.emgUrl = emgUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    // Constructor without categories (for cases where categories are not needed)
    public SupplierItemDAO(int supplierItemId, String itemName, String description, Float price, int stock, String emgUrl,int supId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.supplierItemId = supplierItemId;
        this.itemName = itemName;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.emgUrl = emgUrl;
        this.supId=supId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
