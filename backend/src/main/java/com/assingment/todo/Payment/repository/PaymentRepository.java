package com.assingment.todo.Payment.repository;

import com.assingment.todo.Payment.DTO.PaymentReportProjection;
import com.assingment.todo.Payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment,Integer> {

    @Query(value = """
    SELECT 
        *
    FROM payment
    WHERE type = :type
""", nativeQuery = true)
    List<Payment> findAllByType(@Param("type") String type);


    @Query(value = """
    SELECT 
        *
    FROM payment
    WHERE type = :type AND status=:status
""", nativeQuery = true)
    List<Payment> findAllByStatusType(@Param("type") String type,@Param("status") String status);


    @Query(value = """
    SELECT 
        payment.payment_id as paymentId,
        supplier_orders.order_id as orderId,
        supplier_orders.address as address,
        supplier_orders.mobile_no as mobile,
        supplier_orders.price as price,
        payment.status as status
    FROM payment
    LEFT join supplier_orders ON supplier_orders.order_id=payment.order_id
    WHERE type = :type
""", nativeQuery = true)
    List<PaymentReportProjection> findAllBySupplierPayments(@Param("type") String type);

    @Query(value = """
    SELECT 
        payment.payment_id as paymentId,
        orders.order_id as orderId,
        orders.address as address,
        orders.mobile_no as mobile,
        orders.price as price,
        payment.status as status
    FROM payment
    LEFT join orders ON orders.order_id=payment.order_id
    WHERE type = :type
""", nativeQuery = true)
    List<PaymentReportProjection> findAllByCustomerPayments(@Param("type") String type);

}
