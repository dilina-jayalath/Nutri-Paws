package com.assingment.todo.SuplplierItem.entity;

import com.assingment.todo.Category.entity.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "supplier_item")
@AllArgsConstructor
@Setter
@Getter
public class SupplierItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int supplierItemId;

    @Column(nullable = false, length = 150)
    private String itemName;

    private String description;

    private int supId;

    private int categoryId;
    @Column(nullable = false)
    private float price;

    @Column(nullable = false)
    private int stock;

    private String emgUrl;

    @CreationTimestamp
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    // Many-to-Many relationship with Category (mapped by the 'supplierItems' field in Category)
    @ManyToMany(mappedBy = "supplierItems") // Reference the 'supplierItems' field in the Category entity
    private Set<Category> categories = new HashSet<>();

    public SupplierItem(){}

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public SupplierItem(String itemName, String description, float price, int stock, String emgUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.itemName=itemName;
        this.description=description;
        this.price=price;
        this.stock=stock;
        this.emgUrl=emgUrl;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
    }

    public SupplierItem(String itemName, String description, float price, int stock, String emgUrl) {
        this.itemName=itemName;
        this.description=description;
        this.price=price;
        this.stock=stock;
        this.emgUrl=emgUrl;

    }

    public SupplierItem(String itemName, String description, float price, int stock, String emgUrl,int categoryId, int supId) {
        this.itemName=itemName;
        this.description=description;
        this.price=price;
        this.stock=stock;
        this.emgUrl=emgUrl;
        this.categoryId=categoryId;
        this.supId=supId;

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

    public void setPrice(float price) {
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


}
