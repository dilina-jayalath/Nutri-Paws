package com.assingment.todo.CartItem.repository;

import java.time.LocalDateTime;

public interface ItemProjection {
    int getItemId();
    int getCartId();
    String getItemName();
    String getDescription();
    float getPrice();
    int getStock();
    int getQuantity();
    String getEmgUrl();
    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();
}
