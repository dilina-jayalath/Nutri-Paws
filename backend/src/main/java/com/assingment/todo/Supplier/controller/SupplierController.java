package com.assingment.todo.Supplier.controller;

import com.assingment.todo.Customer.entity.Customer;
import com.assingment.todo.Customer.service.CustomerService;
import com.assingment.todo.Supplier.entity.Supplier;
import com.assingment.todo.Supplier.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequestMapping("/api/v1/supplier")
@RestController
public class SupplierController {

    @Autowired
    SupplierService supplierService;

    // GET - FUNCTION OF GET ALL CUSTOMERS
    @GetMapping("/getAllSuppliers")
    public ResponseEntity<Object> getAllCustomers(){
        try{
            List<Supplier> suppliers= supplierService.getAllSupplier();

            if(!suppliers.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(suppliers);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST - FUNCTION OF POST CUSTOMER
    @PostMapping("/setSuppliers")
    public ResponseEntity<Object> setCustomer(@RequestBody Supplier supplier){
        try{
            Supplier supplier1=supplierService.setSupplier(supplier);
            return ResponseEntity.status(HttpStatus.CREATED).body(supplier1);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PUT - FUNCTION OF PUT CUSTOMERS
    @PutMapping("/updateSuppliers/{id}")
    public ResponseEntity<Object> updateCustomer(@PathVariable int id, @RequestBody Supplier supplier){
        try{
            Optional<Supplier> supplier1=supplierService.findSupplierById(id);
            if(supplier1.isPresent()){
                Supplier upcus=supplier1.get();
                upcus.setAddress(supplier.getAddress());
                upcus.setContactNo(supplier.getContactNo());
                upcus.setfName(supplier.getfName());
                upcus.setlName(supplier.getlName());
                upcus.setCompanyName(supplier.getCompanyName());
                upcus.setEmail(supplier.getEmail());
                upcus.setAddress(supplier.getAddress());
//                upcus.setUserId(customer.getUserId());

                Supplier resultCus=supplierService.setSupplier(upcus);
                return ResponseEntity.status(HttpStatus.OK).body(resultCus);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PUT - FUNCTION OF PUT CUSTOMERS by id
    @GetMapping("/getSuppliersByCusId/{id}")
    public ResponseEntity<Object> updateCustomer(@PathVariable int id){
        try{
            Optional<Supplier> supplier1=supplierService.findSupplierById(id);
            if(supplier1.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(supplier1);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getSuppliersByUserId/{id}")
    public ResponseEntity<Object> findCustomerByUserId(@PathVariable int id){
        try{
            List<Supplier> supplier1=supplierService.findSupplierByUserId(id);
            if(!supplier1.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(supplier1);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE - FUNCTION OF DELETE CUSTOMERS
    @DeleteMapping("/deleteSuppliers/{id}")
    public ResponseEntity<Object> deleteCustomerById(@PathVariable int id){
        try{
            Optional<Supplier> supplier1=supplierService.findSupplierById(id);
            if(supplier1.isPresent()){
                supplierService.deleteSupplier(id);
                return ResponseEntity.status(HttpStatus.OK).body(supplier1);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
