package com.assingment.todo.Cart.controller;

import com.assingment.todo.Cart.DAO.CartDAO;
import com.assingment.todo.Cart.entity.Cart;
import com.assingment.todo.Cart.service.CartService;
import com.assingment.todo.Category.entity.Category;
import com.assingment.todo.Customer.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/cart")
public class CartController {

    @Autowired
    CartService cartService;

    // GET - FUNCTION OF GET ALL CACRTS
    @GetMapping("/getAllCart")
    public ResponseEntity<Object> getAllcart(){
        try{
            List<Cart> cartlist=cartService.getAllCart();
            if(!cartlist.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(cartlist);
            }else{
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // POST - FUNCTION OF INSERT CART
    @PostMapping("/insertCart")
    public ResponseEntity<Object> insertCart(@RequestBody Cart cart){
        try{
            Cart re_cart= cartService.insertCart(cart);
            return ResponseEntity.status(HttpStatus.OK).body(cart);

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PUT - FUNCTION OF UPDATE CART
    @PutMapping("/updateCart/{id}")
    public ResponseEntity<Object> updateCart(@PathVariable int id, @RequestBody Cart cart){
        try{
            String name="shan";
            Optional<Cart> res_cart=cartService.getCartById(id);

            if(res_cart.isPresent()){
                Cart cart1=res_cart.get();
                cart1.setCustomerId(cart.getCustomerId());

                Cart re_cart= cartService.insertCart(cart1);
                return ResponseEntity.status(HttpStatus.OK).body(re_cart);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE- FUNCTION OF DELETE CART
    @DeleteMapping("/deleteCart/{id}")
    public ResponseEntity<Object> deleteCart(@PathVariable int id){
        try{
            Optional<Cart> res_cart=cartService.getCartById(id);
            if(res_cart.isPresent()){
                cartService.deleteCart(id);
                return ResponseEntity.status(HttpStatus.OK).body("Cart "+id+" delete successfully");
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getCartByCustomerId/{customerId}")
    public ResponseEntity<Object> getCartByCustomerId(@PathVariable int customerId) {
        try {
            List<CartDAO> list=cartService.getCartByCustomerId(customerId);
            if(!list.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(list);
            }else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching cart for customer with ID: " + customerId);
        }
    }

}
