package com.assingment.todo.CartItem.service;

import com.assingment.todo.CartItem.entity.CartItem;
import com.assingment.todo.CartItem.entity.CartItemStatus;
import com.assingment.todo.CartItem.repository.CartItemRepository;
import com.assingment.todo.CartItem.repository.ItemProjection;
import com.assingment.todo.Item.DAO.ItemDAO;
import com.assingment.todo.Item.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    CartItemRepository cartItemRepository;

    //  SELECT - FUNCTION OF SELECT ALL CartItem
    public List<CartItem> getAllCartItem(){
        try{
            return cartItemRepository.findAll();

        }catch(Exception e){
            throw new RuntimeException("Error select all CartItem ",e);
        }
    }

    //  INSERT - FUNCTION OF insert CartItem
    public CartItem setCartItem(CartItem cartItem){
        try{
            return cartItemRepository.save(cartItem);
        }catch(Exception e){
            throw new RuntimeException("Error insert CartItem ",e);
        }
    }

    //  SELECT - FUNCTION OF SELECT CartItem BY ID
    public Optional<CartItem> findCartItemById(int id){
        try{

            return cartItemRepository.findById(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert CartItem ",e);
        }
    }

    //  DELETE - FUNCTION OF DELETE CartItem BY ID
    public void deleteCartItem(int id){
        try{
            cartItemRepository.deleteById(id);
        }catch(Exception e){
            throw new RuntimeException("Error Delete CartItem ",e);
        }
    }

    public List<ItemDAO> getcartItemByUserId(int userId){
    try{
        List<ItemProjection> items = cartItemRepository.findCarItemsByUserId(userId);
        List<ItemDAO> itemDTOs = new ArrayList<>();
        for (ItemProjection item : items) {
            ItemDAO dto = new ItemDAO(
                    item.getItemId(),
                    item.getItemName(),
                    item.getDescription(),
                    item.getPrice(),
                    item.getStock(),
                    item.getQuantity(),
                    item.getEmgUrl(),
                    item.getCartId(),
                    item.getCreatedAt(),
                    item.getUpdatedAt()
            );
            itemDTOs.add(dto);
        }
        return itemDTOs;
    }catch(Exception e){
        throw new RuntimeException("Error find cart item by user id",e);
    }
    }

    // UPDATE - FUNCTION OF UPDATE CART ITEMS
    public void updateCartItemStatus(int id, String status) {
        try {
//            CartItemStatus newStatus = CartItemStatus.valueOf(status);
            cartItemRepository.updateStatus(id, status);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status value: " + status);
        }
    }
}
