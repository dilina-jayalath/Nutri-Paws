package com.assingment.todo.Customer.service;

import com.assingment.todo.Customer.entity.Customer;
import com.assingment.todo.Customer.repository.CustomerRepository;
import com.assingment.todo.User.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    //  SELECT - FUNCTION OF SELECT ALL CUSTOMERS
    public List<Customer> getAllCustomers(){
        try{
            return customerRepository.findAll();

        }catch(Exception e){
            throw new RuntimeException("Error select all customers ",e);
        }
    }

    //  INSERT - FUNCTION OF insert CUSTOMERS
    public Customer setCustomer(Customer customer){
        try{
            return customerRepository.save(customer);
        }catch(Exception e){
            throw new RuntimeException("Error insert customers ",e);
        }
    }

    //  SELECT - FUNCTION OF SELECT CUSTOMERS BY ID
    public Optional<Customer> findCustomerById(int id){
        try{

            return customerRepository.findById(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert customers ",e);
        }
    }

    //  SELECT - FUNCTION OF SELECT CUSTOMERS BY ID
    public Optional<Customer> findByCustomerByUserId(User user){
        try{

            return customerRepository.findByUserId(user);
        }catch(Exception e){
            throw new RuntimeException("Error insert customers ",e);
        }
    }

    //  DELETE - FUNCTION OF DELETE CUSTOMERS BY ID
    public void deletecustomer(int id){
        try{
            customerRepository.deleteById(id);
        }catch(Exception e){
            throw new RuntimeException("Error Delete customers ",e);
        }
    }
}
