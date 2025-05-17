package com.assingment.todo.Customer.controller;

import com.assingment.todo.Customer.entity.Customer;
import com.assingment.todo.Customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequestMapping("/api/v1/customer")
@RestController
public class CustomerController {

    @Autowired
    CustomerService customerService;

    // GET - FUNCTION OF GET ALL CUSTOMERS
    @GetMapping("/getAllcustomers")
    public ResponseEntity<Object> getAllCustomers(){
        try{
            List<Customer> customers= customerService.getAllCustomers();

            if(!customers.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(customers);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST - FUNCTION OF POST CUSTOMER
    @PostMapping("/setCustomer")
    public ResponseEntity<Object> setCustomer(@RequestBody Customer customer){
        try{
            Customer customer1=customerService.setCustomer(customer);
            return ResponseEntity.status(HttpStatus.CREATED).body(customer1);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PUT - FUNCTION OF PUT CUSTOMERS
    @PutMapping("/updateCustomer/{id}")
    public ResponseEntity<Object> updateCustomer(@PathVariable int id, @RequestBody Customer customer){
        try{
            Optional<Customer> customer1=customerService.findCustomerById(id);
            if(customer1.isPresent()){
                Customer upcus=customer1.get();
                upcus.setAddress(customer.getAddress());
                upcus.setContactNo(customer.getContactNo());
//                upcus.setUserId(customer.getUserId());

                Customer resultCus=customerService.setCustomer(upcus);
                return ResponseEntity.status(HttpStatus.OK).body(resultCus);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PUT - FUNCTION OF PUT CUSTOMERS
    @GetMapping("/getCustomerByCusId/{id}")
    public ResponseEntity<Object> updateCustomer(@PathVariable int id){
        try{
            Optional<Customer> customer1=customerService.findCustomerById(id);
            if(customer1.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(customer1);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE - FUNCTION OF DELETE CUSTOMERS
    @DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity<Object> deleteCustomerById(@PathVariable int id){
        try{
            Optional<Customer> customer1=customerService.findCustomerById(id);
            if(customer1.isPresent()){
                customerService.deletecustomer(id);
                return ResponseEntity.status(HttpStatus.OK).body(customer1);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
