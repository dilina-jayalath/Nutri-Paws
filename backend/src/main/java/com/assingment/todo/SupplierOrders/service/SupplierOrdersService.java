package com.assingment.todo.SupplierOrders.service;

import com.assingment.todo.CustomerOrders.entity.CustomerOrders;
import com.assingment.todo.CustomerOrders.entity.OrderItems;
import com.assingment.todo.CustomerOrders.repository.CustomerOrderItemRepository;
import com.assingment.todo.CustomerOrders.repository.CustomerOrdersRepository;
import com.assingment.todo.SuplplierItem.DAO.SupplierItemDAO;
import com.assingment.todo.SuplplierItem.entity.SupplierItem;
import com.assingment.todo.SupplierOrders.entity.SupplierOrderItems;
import com.assingment.todo.SupplierOrders.entity.SupplierOrders;
import com.assingment.todo.SupplierOrders.repository.SupplierOrdersRepository;
import com.assingment.todo.SupplierOrders.repository.SyupplierOrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SupplierOrdersService {

    @Autowired
    private SupplierOrdersRepository supplierOrdersRepository;

    @Autowired
    private SyupplierOrderItemRepository syupplierOrderItemRepository;

    public SupplierOrders setOrder(SupplierOrders request) {
        // Step 1: Save Order
        return supplierOrdersRepository.save(request);

    }

    public SupplierOrderItems saveItems(SupplierOrderItems orderItem){
        return syupplierOrderItemRepository.save(orderItem);
    }

    public SupplierOrders setSupplierOrders(SupplierOrders orderItem){
        return supplierOrdersRepository.save(orderItem);
    }

    public SupplierOrderItems setSupplierOrdersItems(SupplierOrderItems orderItem){
        return syupplierOrderItemRepository.save(orderItem);
    }


    @Transactional(readOnly = true)
    public List<SupplierOrders> getAllOrders() {
        return supplierOrdersRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<SupplierOrderItems> getAllitemsByOrder(int orderId) {
        return syupplierOrderItemRepository.findByOrderId(orderId);
    }

    @Transactional(readOnly = true)
    public List<SupplierOrders> findOrderBySupIdStatus(int orderId,String status) {
        return supplierOrdersRepository.getReturndOrdersBySupId(orderId,status);
    }

    public Optional<SupplierOrders> findItemById(int id){
        try{

            return supplierOrdersRepository.findById(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    // UPDATE - FUNCTION OF UPDATE USER BY ID
    public SupplierOrders editOrder(SupplierOrders customerOrders){
        try{
            return this.setOrder(customerOrders);
        }catch(Exception e){
            throw new RuntimeException("Error update user roll by id",e);
        }
    }
    @Transactional(readOnly = true)
    public List<SupplierOrders> findOrderBySupId(int id){
        try{

            return supplierOrdersRepository.findyCustomeId(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    @Transactional(readOnly = true)
    public List<SupplierOrderItems> getAllSupplierItemByOrderId(int orderId) {
        try {
            return syupplierOrderItemRepository.findAllByOrderId(orderId);

        } catch(Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching all Supplier Items", e);
        }
    }

    @Transactional(readOnly = true)
    public List<SupplierOrders> pendingPendingOrderByCusId(int id,String status){
        try{

            return supplierOrdersRepository.getReturndOrdersBySupId(id,status);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }
}
