package com.assingment.todo.Payment.service;

import com.assingment.todo.Payment.DTO.PaymentReportProjection;
import com.assingment.todo.Payment.entity.Payment;
import com.assingment.todo.Payment.repository.PaymentRepository;
import com.assingment.todo.SupplierOrders.entity.SupplierOrders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    PaymentRepository paymentRepository;
    public List<Payment> getAllPayments(){
        try{
            return paymentRepository.findAll();
        }catch(Exception e){
            throw new RuntimeException("Error Find Payments",e);
        }
    }
    @Transactional(readOnly = true)
    public List<Payment> getAllPaymentsByType(String type){
        try{
            return paymentRepository.findAllByType(type);
        }catch(Exception e){
            throw new RuntimeException("Error Find Payments",e);
        }
    }

    @Transactional(readOnly = true)
    public List<PaymentReportProjection> getAllPaymentsByTypeNew(int type){
        try{
            String ty="";
            if(type== 1){
                ty="SupplierOrder";
                return paymentRepository.findAllBySupplierPayments(ty);
            }else if(type == 0){
                ty="CustomerOrder";
                return paymentRepository.findAllByCustomerPayments(ty);
            }
            return null;
        }catch(Exception e){
            throw new RuntimeException("Error Find Payments",e);
        }
    }

    @Transactional(readOnly = true)
    public List<Payment> getAllPaymentsByStatusType(String type, String status){
        try{
            return paymentRepository.findAllByStatusType(type,status);
        }catch(Exception e){
            throw new RuntimeException("Error Find Payments",e);
        }
    }

    public Payment setPayment(Payment payment){
        try{
            return paymentRepository.save(payment);
        }catch(Exception e){
            throw new RuntimeException("Error save Payments",e);
        }
    }

    public Optional<Payment> findPymentById(int id){
        try{

            return paymentRepository.findById(id);
        }catch(Exception e){
            throw new RuntimeException("Error insert Item ",e);
        }
    }

    public Payment editOrder(Payment customerOrders){
        try{
            return this.setPayment(customerOrders);
        }catch(Exception e){
            throw new RuntimeException("Error update user roll by id",e);
        }
    }

}
