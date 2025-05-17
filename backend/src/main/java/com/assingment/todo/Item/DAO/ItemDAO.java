package com.assingment.todo.Item.DAO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@NoArgsConstructor
@Data
public class ItemDAO {

    private int itemId;
    private int cartId;
    private String itemName;

    public ItemDAO(int itemId, String itemName, String description, float price, int stock, String emgUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.emgUrl = emgUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public ItemDAO(int itemId, String itemName, String description, float price, int stock, int quantity, String emgUrl, int cartId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.quantity = quantity;
        this.emgUrl = emgUrl;
        this.cartId = cartId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    private String description;
    private float price;

    private String emgUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
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

    private int stock;

    private int quantity;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getCartId() {
        return cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

}
