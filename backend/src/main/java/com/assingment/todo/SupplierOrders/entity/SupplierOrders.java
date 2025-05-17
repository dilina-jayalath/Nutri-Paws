package com.assingment.todo.SupplierOrders.entity;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_orders")
public class SupplierOrders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    private double price;

    private int itemCount;

    private String address;

    private String mobile_no;

    @Enumerated(EnumType.STRING) // Stores enum as a string in DB
    @Column(nullable = false)
    private SupplierOrderStatus status;

    @CreationTimestamp
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    public SupplierOrders() {
    }

    public SupplierOrders(int orderId, double price, int itemCount, String address, String mobile_no, SupplierOrderStatus status, LocalDateTime createdAt) {
        this.orderId = orderId;
        this.price = price;
        this.itemCount = itemCount;
        this.address = address;
        this.mobile_no = mobile_no;
        this.status = status;
        this.createdAt = createdAt;
    }

    public SupplierOrders(double price, int itemCount, String address, String mobile_no){

        this.price=price;
        this.itemCount=itemCount;
        this.address=address;
        this.mobile_no=mobile_no;
        this.status = SupplierOrderStatus.Place;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobile_no() {
        return mobile_no;
    }

    public void setMobile_no(String mobile_no) {
        this.mobile_no = mobile_no;
    }

    public SupplierOrderStatus getStatus() {
        return status;
    }

    public void setStatus(SupplierOrderStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
