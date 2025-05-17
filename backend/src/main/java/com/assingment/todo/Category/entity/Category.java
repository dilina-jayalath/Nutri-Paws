package com.assingment.todo.Category.entity;

import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.SuplplierItem.entity.SupplierItem;
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
@Table(name = "category")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int categoryId;

    @Column(nullable = false)
    private String name;

    @CreationTimestamp
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    // Many-to-Many relationship with Item
    @ManyToMany
    @JoinTable(
            name = "item_category", // The name of the join table
            joinColumns = @JoinColumn(name = "category_id"), // Foreign key referring to the Category
            inverseJoinColumns = @JoinColumn(name = "item_id") // Foreign key referring to the Item
    )
    private Set<Item> items = new HashSet<>();

    // Many-to-Many relationship with SupplierItem
    @ManyToMany
    @JoinTable(
            name = "supplier_item_category", // The name of the join table for SupplierItem and Category
            joinColumns = @JoinColumn(name = "category_id"), // Foreign key referring to the Category
            inverseJoinColumns = @JoinColumn(name = "supplier_item_id") // Foreign key referring to the SupplierItem
    )
    private Set<SupplierItem> supplierItems = new HashSet<>();

    // Getters and setters (auto-generated via Lombok)

}
