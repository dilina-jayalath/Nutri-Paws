package com.assingment.todo.CustomerOrders.controller;

import com.assingment.todo.CartItem.service.CartItemService;
import com.assingment.todo.Category.entity.Category;
import com.assingment.todo.CustomerOrders.DTO.MonthlyOrderSummary;
import com.assingment.todo.CustomerOrders.DTO.OrderItem;
import com.assingment.todo.CustomerOrders.DTO.OrderRequest;
import com.assingment.todo.CustomerOrders.entity.CustomerOrders;
import com.assingment.todo.CustomerOrders.entity.OrderItems;
import com.assingment.todo.CustomerOrders.services.CustomerOrdersService;
import com.assingment.todo.Item.DAO.ItemDAO;
import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.Item.service.ItemService;
import com.assingment.todo.Payment.entity.OrderStatus;
import com.assingment.todo.Payment.entity.OrderType;
import com.assingment.todo.Payment.entity.Payment;
import com.assingment.todo.Payment.service.PaymentService;
import com.assingment.todo.User.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/orders")
public class CustomerOrdersController {

    @Autowired
    CustomerOrdersService customerOrdersService;

    @Autowired
    CartItemService cartItemService;

    @Autowired
    ItemService itemService;

    @Autowired
    PaymentService paymentService;

    // GET - FUNCTION OF GET ALL ORDERS
    @GetMapping("/getAllOrders")
    public ResponseEntity<Object> getAllOrders(){
        try{
            List<CustomerOrders> item= customerOrdersService.getAllOrders();
            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            e.printStackTrace(); // Add this to see the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    //GET - FUNCTION OF GET ORDER ITEMS BY ORDER ID
    @GetMapping("/getAllItemsByOrder/{id}")
    public ResponseEntity<Object> getAllOrderItemsByOrderId(@PathVariable int id){
        try{
            List<OrderItems> item= customerOrdersService.getAllitemsByOrder(id);
            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            e.printStackTrace(); // Add this to see the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    // PUT - FUNCTION OF PUT CATEGORY
    @PutMapping("/updateOrder/{id}")
    public ResponseEntity<Object> updateOrders(@PathVariable int id, @RequestBody CustomerOrders customerOrders) {
        try {
            Optional<CustomerOrders> itemOpt = customerOrdersService.findItemById(id);

            if (itemOpt.isPresent()) {
                CustomerOrders existingItem = itemOpt.get();
                existingItem.setStatus(customerOrders.getStatus());
//                user1.setUserRolId(user.getUserRolId());
                CustomerOrders user2=customerOrdersService.editOrder(existingItem);
                return ResponseEntity.status(HttpStatus.OK).body(user2);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            e.printStackTrace(); // Add this to see the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    //  PLACE CUSTOMER ORDERS
    @PostMapping("/createorder")
    public ResponseEntity<Object> setCustomerOrder(@RequestBody OrderRequest orderRequest) {
        try {
            int itemCount=0;
            for (OrderItem item : orderRequest.getOrderItems()) {
                itemCount+=1;
            }

            CustomerOrders customerOrders=new CustomerOrders(orderRequest.getCustomerId(),orderRequest.getTotalAmount(),itemCount,orderRequest.getCustomerAddress(),orderRequest.getCustomerMobile());
            CustomerOrders outCustomerOrders = customerOrdersService.setOrder(customerOrders);

            Payment payment=new Payment();
            payment.setOrderId(outCustomerOrders.getOrderId());
            payment.setStatus(OrderStatus.Paid);
            payment.setType(OrderType.CustomerOrder);
            payment.setPrice(outCustomerOrders.getPrice());

            Payment pymnt=paymentService.setPayment(payment);

            // Process items if they exist
            if (outCustomerOrders != null && pymnt!=null) {
                int placeOrderId=outCustomerOrders.getOrderId();
                for (OrderItem item : orderRequest.getOrderItems()) {
                    OrderItems orderItem=new OrderItems(placeOrderId,item.getItemId(),(item.getPrice()*item.getQuantity()),item.getQuantity());
                    OrderItems outOrderItem=customerOrdersService.saveItems(orderItem);
                    itemService.updateQty(item.getItemId(),item.getQuantity());
                    cartItemService.updateCartItemStatus(item.getCartItemId(),"Inactive");
                }
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(outCustomerOrders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create order: " + e.getMessage());
        }
    }


    // GET - FUNCTION OF GET ORDER DETAILS MONTHWISE
    @GetMapping("/getMonthWiseOrders")
    public ResponseEntity<Object> getMonthlyOrders(){
        try{
            List<MonthlyOrderSummary> item= customerOrdersService.getMonthlyOrders();
            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            e.printStackTrace(); // Add this to see the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    // GET ORDERS BY CUSTOMER ID
    @GetMapping("/getOrdersByCusId/{id}")
    public ResponseEntity<Object> getOrderByCusId(@PathVariable int id){
        try{
            List<CustomerOrders> item= customerOrdersService.findOrderByCustomeId(id);
            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            e.printStackTrace(); // Add this to see the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    //GET PENDING ORDERS BY CUSTOMER ID
    @GetMapping("/getPendingOrdersByCusId/{id}")
    public ResponseEntity<Object> getPendingOrderByCusId(@PathVariable int id){
        try{
            List<CustomerOrders> item= customerOrdersService.findPendingOrderByCustomeId(id);
            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            e.printStackTrace(); // Add this to see the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getDeleverdOrdersByCusId/{id}")
    public ResponseEntity<Object> getDeleverdOrdersByCusId(@PathVariable int id){
        try{
            List<CustomerOrders> item= customerOrdersService.findDeleverdOrdersByCustomeId(id);
            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            e.printStackTrace(); // Add this to see the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

}
