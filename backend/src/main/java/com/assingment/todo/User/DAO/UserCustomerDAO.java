package com.assingment.todo.User.DAO;

import com.assingment.todo.Customer.entity.Customer;
import com.assingment.todo.User.entity.User;

public class UserCustomerDAO {
    private User user;
    private Customer customer;

    public UserCustomerDAO(User user, Customer customer) {
        this.user = user;
        this.customer = customer;
    }

    // Getters and Setters
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
}
