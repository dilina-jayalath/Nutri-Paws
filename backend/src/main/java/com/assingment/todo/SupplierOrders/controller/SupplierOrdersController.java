package com.assingment.todo.SupplierOrders.controller;


import com.assingment.todo.Customer.entity.Customer;
import com.assingment.todo.CustomerOrders.entity.CustomerOrders;
//import com.assingment.todo.SupplierOrders.DTO.SupplierOrderRequest;
import com.assingment.todo.Payment.entity.OrderStatus;
import com.assingment.todo.Payment.entity.OrderType;
import com.assingment.todo.Payment.entity.Payment;
import com.assingment.todo.Payment.service.PaymentService;
import com.assingment.todo.SuplplierItem.DAO.SupplierItemDAO;
import com.assingment.todo.SupplierOrders.DTO.SupOrder;
import com.assingment.todo.SupplierOrders.entity.SupplierOrderItems;
import com.assingment.todo.SupplierOrders.entity.SupplierOrderStatus;
import com.assingment.todo.SupplierOrders.entity.SupplierOrders;
import com.assingment.todo.SupplierOrders.service.SupplierOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/supplierorders")
public class SupplierOrdersController {

    @Autowired
    SupplierOrdersService supplierOrdersService;

    @Autowired
    PaymentService paymentService;

//    @Autowired
//    CartItemService cartItemService;

//    @Autowired
//    ItemService itemService;

    // GET - FUNCTION OF GET ALL ORDERS
    @GetMapping("/getAllOrders")
    public ResponseEntity<Object> getAllOrders(){
        try{
            List<SupplierOrders> item= supplierOrdersService.getAllOrders();
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
            List<SupplierOrderItems> item= supplierOrdersService.getAllitemsByOrder(id);
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
    public ResponseEntity<Object> updateOrders(@PathVariable int id, @RequestBody SupplierOrders supplierOrders) {
        try {
            Optional<SupplierOrders> itemOpt = supplierOrdersService.findItemById(id);

            if (itemOpt.isPresent()) {
                SupplierOrders existingItem = itemOpt.get();
                existingItem.setStatus(supplierOrders.getStatus());
//                user1.setUserRolId(user.getUserRolId());
                SupplierOrders user2=supplierOrdersService.editOrder(existingItem);
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

    @GetMapping("/getOrdersBySupId/{id}")
    public ResponseEntity<Object> getOrderByCusId(@PathVariable int id){
        try{
            List<SupplierOrders> item= supplierOrdersService.findOrderBySupId(id);
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

    @GetMapping("/getOrdersBySupIdWisthSt/{id}")
    public ResponseEntity<Object> getOrderByCusIdStatus(@PathVariable int id){
        try{
            List<SupplierOrders> item= supplierOrdersService.findOrderBySupIdStatus(id,"Place");
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

    //     GET - FUNCTION OF GET ALL supplier items by supplier id
    @GetMapping("/getAllSupplierItemByOrderId/{id}")
    public ResponseEntity<Object> getAllSupplietrItemsByOrderId(@PathVariable int id){
        try{
            List<SupplierOrderItems> item= supplierOrdersService.getAllSupplierItemByOrderId(id);

            if(!item.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(item);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/setSupOrders")
    public ResponseEntity<Object> setSupOrders(@RequestBody SupOrder supplierOrdersNew){
        try{

            SupplierOrders supplierOrders=new SupplierOrders();
            supplierOrders.setStatus(SupplierOrderStatus.Place);
            supplierOrders.setAddress(supplierOrdersNew.getAddress());
            supplierOrders.setItemCount(supplierOrdersNew.getItemCount());
            supplierOrders.setMobile_no(supplierOrdersNew.getMobile_no());
            supplierOrders.setPrice(supplierOrdersNew.getPrice()*supplierOrdersNew.getItemCount());
            SupplierOrders customer1=supplierOrdersService.setSupplierOrders(supplierOrders);
            if (customer1 != null) {
                SupplierOrderItems supplierOrderItems=new SupplierOrderItems();
                supplierOrderItems.setItemId(supplierOrdersNew.getItem_id());
                supplierOrderItems.setOrderId(customer1.getOrderId());
                supplierOrderItems.setPrice(customer1.getPrice());
                supplierOrderItems.setQty(customer1.getItemCount());
                supplierOrderItems.setSupplierId(supplierOrdersNew.getSupplier_id());

                SupplierOrderItems supplierOrderItems1=supplierOrdersService.setSupplierOrdersItems(supplierOrderItems);

                if (supplierOrderItems1 != null) {
                    Payment payment=new Payment();
                    payment.setOrderId(customer1.getOrderId());
                    payment.setStatus(OrderStatus.Paid);
                    payment.setType(OrderType.SupplierOrder);
                    payment.setPrice(customer1.getPrice());

                    Payment pymnt=paymentService.setPayment(payment);
                }
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(customer1);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    //  PLACE CUSTOMER ORDERS
//    @PostMapping("/createorder")
//    public ResponseEntity<Object> setCustomerOrder(@RequestBody SupplierOrderRequest orderRequest) {
//        try {
//            int itemCount=0;
//            for (OrderItem item : orderRequest.getOrderItems()) {
//                itemCount+=1;
//            }
//
//            CustomerOrders customerOrders=new CustomerOrders(orderRequest.getCustomerId(),orderRequest.getTotalAmount(),itemCount,orderRequest.getCustomerAddress(),orderRequest.getCustomerMobile());
//            CustomerOrders outCustomerOrders = customerOrdersService.setOrder(customerOrders);
//
//            // Process items if they exist
//            if (outCustomerOrders != null) {
//                int placeOrderId=outCustomerOrders.getOrderId();
//                for (OrderItem item : orderRequest.getOrderItems()) {
//                    OrderItems orderItem=new OrderItems(placeOrderId,item.getItemId(),(item.getPrice()*item.getQuantity()),item.getQuantity());
//                    OrderItems outOrderItem=customerOrdersService.saveItems(orderItem);
//                    itemService.updateQty(item.getItemId(),item.getQuantity());
//                    cartItemService.updateCartItemStatus(item.getCartItemId(),"Inactive");
//                }
//            }
//
//            return ResponseEntity.status(HttpStatus.CREATED).body(outCustomerOrders);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Failed to create order: " + e.getMessage());
//        }
//    }

    // GET - FUNCTION OF GET RETURN ORDERS
    @GetMapping("/getReturnOrdersBySupId/{id}/{status}")
    public ResponseEntity<Object> getPendingOrderByCusId(@PathVariable int id,@PathVariable String status){
        try{
            List<SupplierOrders> item= supplierOrdersService.pendingPendingOrderByCusId(id,status);
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
