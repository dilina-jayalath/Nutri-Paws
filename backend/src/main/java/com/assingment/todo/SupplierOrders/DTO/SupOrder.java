package com.assingment.todo.SupplierOrders.DTO;

import com.assingment.todo.SupplierOrders.entity.SupplierOrderStatus;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class SupOrder {

    private int orderId;

    private double price;

    private int itemCount;

    private int item_id;

    private int supplier_id;

    private String address;

    private String mobile_no;

    @Enumerated(EnumType.STRING) // Stores enum as a string in DB
    @Column(nullable = false)
    private SupplierOrderStatus status;

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

    public int getItem_id() {
        return item_id;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    public int getSupplier_id() {
        return supplier_id;
    }

    public void setSupplier_id(int supplier_id) {
        this.supplier_id = supplier_id;
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
}
