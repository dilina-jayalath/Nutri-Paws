package com.assingment.todo.CustomerOrders.services;

import com.assingment.todo.CustomerOrders.DTO.MonthlyOrderSummary;
import com.assingment.todo.CustomerOrders.DTO.OrderRequest;
import com.assingment.todo.CustomerOrders.entity.CustomerOrders;
import com.assingment.todo.CustomerOrders.entity.OrderItems;
import com.assingment.todo.CustomerOrders.entity.OrderStatus;
import com.assingment.todo.CustomerOrders.repository.CustomerOrderItemRepository;
import com.assingment.todo.CustomerOrders.repository.CustomerOrdersRepository;
import com.assingment.todo.Item.DAO.ItemDAO;
import com.assingment.todo.Item.entity.Item;
import com.assingment.todo.User.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerOrdersService {

    @Autowired
    private CustomerOrdersRepository ordersRepository;

    @Autowired
    private CustomerOrderItemRepository orderItemRepository;

    public CustomerOrders setOrder(CustomerOrders request) {
        // Step 1: Save Order
        return ordersRepository.save(request);

    }

    public OrderItems saveItems(OrderItems orderItem){
        return orderItemRepository.save(orderItem);
    }

    @Transactional(readOnly = true)
    public List<CustomerOrders> getAllOrders() {
        return ordersRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<MonthlyOrderSummary> getMonthlyOrders() {
        return ordersRepository.getMonthlyOrders();
    }

    @Transactional(readOnly = true)
    public List<OrderItems> getAllitemsByOrder(int orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    public Optional<CustomerOrders> findItemById(int id){
        try{

            return ordersRepository.findById(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    @Transactional(readOnly = true)
    public List<CustomerOrders> findOrderByCustomeId(int id){
        try{

            return ordersRepository.findyCustomeId(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    // UPDATE - FUNCTION OF UPDATE USER BY ID
    public CustomerOrders editOrder(CustomerOrders customerOrders){
        try{
            return this.setOrder(customerOrders);
        }catch(Exception e){
            throw new RuntimeException("Error update user roll by id",e);
        }
    }

    @Transactional(readOnly = true)
    public List<CustomerOrders> findPendingOrderByCustomeId(int id){
        try{

            return ordersRepository.getPendingOrdersByCusId(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    @Transactional(readOnly = true)
    public List<CustomerOrders> findDeleverdOrdersByCustomeId(int id){
        try{

            return ordersRepository.getDeleverdOrdersByCusId(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }
}
