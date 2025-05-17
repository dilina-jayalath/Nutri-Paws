package com.assingment.todo.Cart.service;

import com.assingment.todo.Cart.DAO.CartDAO;
import com.assingment.todo.Cart.entity.Cart;
import com.assingment.todo.Cart.repository.CartRepository;
import com.assingment.todo.Customer.entity.Customer;
import com.assingment.todo.Item.DAO.ItemDAO;
import com.assingment.todo.Item.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;

    // SELECT - FUNCTION OF SELECT AL CARTS
    public List<Cart> getAllCart() throws Exception{
        return cartRepository.findAll();
    }

    // INSERT - FUNCTION OF INSERT CART
    public Cart insertCart(Cart cart) throws Exception{
        return cartRepository.save(cart);
    }

    // SELECT - FUNCTION OF SELECT CART BY ID
    public Optional<Cart> getCartById(int id ) throws Exception{
        return cartRepository.findById(id);
    }

    // UPDATE - FUNCTION OF UPDATE CART BY ID
    public Cart updateCart(Cart cart) throws Exception{
        return cartRepository.save(cart);
    }

    // DELETE - FUNCTION OF DELETE CART BY ID
    public void deleteCart(int id) throws Exception{
        cartRepository.deleteById(id);
    }


    public List<CartDAO> getCartByCustomerId(int customer) {
        try {

            List<Cart> carts = cartRepository.findByCustomerId(customer);
            List<CartDAO> cartDAO = new ArrayList<>();

            for (Cart cart : carts) {
                CartDAO dto = new CartDAO(
                        cart.getCart_id(),
                        cart.getCustomerId()

                );
                cartDAO.add(dto);
            }
            return cartDAO;
        } catch (Exception e) {
            e.printStackTrace(); // Or use a logging framework like SLF4J
            throw new RuntimeException("Error fetching cart items for customer ID: " + customer, e);
        }
    }


}
