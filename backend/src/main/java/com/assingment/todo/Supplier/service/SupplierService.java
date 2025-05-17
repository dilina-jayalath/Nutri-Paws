package com.assingment.todo.Supplier.service;

import com.assingment.todo.Customer.entity.Customer;
import com.assingment.todo.Customer.repository.CustomerRepository;
import com.assingment.todo.Supplier.entity.Supplier;
import com.assingment.todo.Supplier.repository.SupplierRepository;
import com.assingment.todo.User.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {

    @Autowired
    SupplierRepository supplierRepository;

    //  SELECT - FUNCTION OF SELECT ALL Supplier
    public List<Supplier> getAllSupplier(){
        try{
            return supplierRepository.findAll();

        }catch(Exception e){
            throw new RuntimeException("Error select all customers ",e);
        }
    }

    //  INSERT - FUNCTION OF insert Supplier
    public Supplier setSupplier(Supplier customer){
        try{
            return supplierRepository.save(customer);
        }catch(Exception e){
            throw new RuntimeException("Error insert customers ",e);
        }
    }

    //  SELECT - FUNCTION OF SELECT Supplier BY ID
    public Optional<Supplier> findSupplierById(int id){
        try{

            return supplierRepository.findById(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert customers ",e);
        }
    }

    public List<Supplier> findSupplierByUserId(int userId){
        try{
            return supplierRepository.findByUserIdNew(userId);
        }catch(Exception e){
            throw new RuntimeException("Error insert customers ",e);
        }
    }

    //  SELECT - FUNCTION OF SELECT Supplier BY ID
    public Optional<Supplier> findBySupplierByUserId(User user){
        try{

            return supplierRepository.findByUserId(user);
        }catch(Exception e){
            throw new RuntimeException("Error insert customers ",e);
        }
    }

    //  DELETE - FUNCTION OF DELETE Supplier BY ID
    public void deleteSupplier(int id){
        try{
            supplierRepository.deleteById(id);
        }catch(Exception e){
            throw new RuntimeException("Error Delete customers ",e);
        }
    }
}
