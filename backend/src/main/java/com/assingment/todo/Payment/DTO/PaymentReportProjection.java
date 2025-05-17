package com.assingment.todo.Payment.DTO;

public interface PaymentReportProjection {

    Integer getPaymentId();
    Integer getOrderId();
    String getAddress();
    String getMobile();
    Double getPrice();
    String getStatus(); // Or OrderType if it maps directly
}
