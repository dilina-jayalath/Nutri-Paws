package com.assingment.todo.Payment.controller;

import com.assingment.todo.Payment.DTO.PaymentReportProjection;
import com.assingment.todo.Payment.entity.Payment;
import com.assingment.todo.Payment.service.PaymentService;
import com.assingment.todo.SupplierOrders.entity.SupplierOrders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @GetMapping("/getAllPayment")
    public ResponseEntity<Object> getAllPayments(){
        try{
                List<Payment> paymentList = paymentService.getAllPayments();

            if(!paymentList.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(paymentList);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            e.printStackTrace(); // Add this to see the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getAllPaymentByType/{type}")
    public ResponseEntity<Object> getAllPaymentsByType(@PathVariable String type){
        try{
            List<Payment> paymentList = paymentService.getAllPaymentsByType(type);

            if(!paymentList.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(paymentList);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            e.printStackTrace(); // Add this to see the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getAllPaymentByStatusType/{type}/{status}")
    public ResponseEntity<Object> getAllPaymentByStatusType(@PathVariable String type,@PathVariable String status){
        try{
            List<Payment> paymentList = paymentService.getAllPaymentsByStatusType(type,status);

            if(!paymentList.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(paymentList);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            e.printStackTrace(); // Add this to see the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
    @PostMapping("/setPayment")
    public ResponseEntity<Payment> setPayment(@RequestBody Payment payment){

        try{
            Payment pymnt=paymentService.setPayment(payment);
            return ResponseEntity.status(HttpStatus.CREATED).body(pymnt);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getAllPaymentByTypeReport/{type}")
    public ResponseEntity<Object> getAllPaymentsByTypeReport(@PathVariable int type){
        try{
            List<PaymentReportProjection> paymentList = paymentService.getAllPaymentsByTypeNew(type);

            if(!paymentList.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(paymentList);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            e.printStackTrace(); // Add this to see the actual error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    // PUT - FUNCTION OF PUT CATEGORY
    @PutMapping("/updatePyments/{id}")
    public ResponseEntity<Object> updateOrders(@PathVariable int id, @RequestBody Payment supplierOrders) {
        try {
            Optional<Payment> itemOpt = paymentService.findPymentById(id);

            if (itemOpt.isPresent()) {
                Payment existingItem = itemOpt.get();
                existingItem.setStatus(supplierOrders.getStatus());
//                user1.setUserRolId(user.getUserRolId());
                Payment user2=paymentService.editOrder(existingItem);
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

}
