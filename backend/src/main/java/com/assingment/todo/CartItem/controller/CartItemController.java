package com.assingment.todo.CartItem.controller;

import com.assingment.todo.Cart.entity.Cart;
import com.assingment.todo.Cart.repository.CartRepository;
import com.assingment.todo.CartItem.DTO.CartItemRequest;
import com.assingment.todo.CartItem.entity.CartItem;
import com.assingment.todo.CartItem.entity.CartItemStatus;
import com.assingment.todo.CartItem.service.CartItemService;
import com.assingment.todo.Category.entity.Category;
import com.assingment.todo.Category.service.CategoryService;
import com.assingment.todo.Item.DAO.ItemDAO;
import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.Item.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/cartitem")
public class CartItemController {
    @Autowired
    CartItemService cartItemService;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ItemRepository itemRepository;
    // GET - FUNCTION OF GET ALL CartItem
    @GetMapping("/getAllCartItem")
    public ResponseEntity<Object> getAllCategory(){
        try{
            List<CartItem> cartItem= cartItemService.getAllCartItem();

            if(!cartItem.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(cartItem);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //GET - FUNCTION OF GET CART ITEM BY CUTOMER ID
    @GetMapping("/getAllcartItemByCustomerId/{id}")
    public ResponseEntity<Object> getAllCartItemByCusId(@PathVariable int id){
        try{


            List<ItemDAO> category = cartItemService.getcartItemByUserId(id);
            if (!category.isEmpty()) {

                return ResponseEntity.status(HttpStatus.OK).body(category);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST - FUNCTION OF POST CartItem
    @PostMapping("/setCartItem")
    public ResponseEntity<Object> setCategory(@RequestBody CartItemRequest cartItemRequest) {
        try {
            Cart cart = cartRepository.findById(cartItemRequest.getCartId())
                    .orElseThrow(() -> new RuntimeException("Cart not found"));

            Item item = itemRepository.findById(cartItemRequest.getItemId())
                    .orElseThrow(() -> new RuntimeException("Item not found"));

            CartItem cartItem = new CartItem();
            cartItem.setCartId(cart);
            cartItem.setItemId(item);
            cartItem.setQuantity(cartItemRequest.getQuantity());
            cartItem.setStatus(CartItemStatus.Active);

            CartItem cartItemSaved = cartItemService.setCartItem(cartItem);

            // ✅ Return a success message
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Item added to cart successfully");
            response.put("cartItemId", cartItemSaved.getCartItemId());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            e.printStackTrace(); // (good for debugging)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Internal Server Error"));
        }
    }


    // PUT - FUNCTION OF PUT CartItem
    @PutMapping("/updateCartItem/{id}")
    public ResponseEntity<Object> updateCategory(@PathVariable int id, @RequestBody CartItem cartItem){
        try{
            Optional<CartItem> cartItem1=cartItemService.findCartItemById(id);
            if(cartItem1.isPresent()){
                CartItem upcus=cartItem1.get();
                upcus.setCartId(cartItem.getCartId());
                upcus.setItemId(cartItem.getItemId());
                upcus.setQuantity(cartItem.getQuantity());
                CartItem resCartItem=cartItemService.setCartItem(upcus);
                return ResponseEntity.status(HttpStatus.OK).body(resCartItem);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE - FUNCTION OF DELETE CartItem
    @DeleteMapping("/deleteCartItem/{id}")
    public ResponseEntity<Object> deleteCategoryById(@PathVariable int id){
        try{
            Optional<CartItem> cartItem1=cartItemService.findCartItemById(id);
            if(cartItem1.isPresent()){
                cartItemService.deleteCartItem(id);
                return ResponseEntity.status(HttpStatus.OK).body("CartItem "+id+" delete successfully");
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
