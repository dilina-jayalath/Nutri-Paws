package com.assingment.todo.Payment.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "payment")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;

    private int orderId;

    @Enumerated(EnumType.STRING) // Stores enum as a string in DB
    @Column(nullable = false)
    private OrderType type = OrderType.CustomerOrder;

    private double price;

    @Enumerated(EnumType.STRING) // Stores enum as a string in DB
    @Column(nullable = false)
    private OrderStatus status =OrderStatus.Paid;

    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public OrderType getType() {
        return type;
    }

    public void setType(OrderType type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
