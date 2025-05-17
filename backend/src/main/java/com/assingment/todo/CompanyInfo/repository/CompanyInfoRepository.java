package com.assingment.todo.CompanyInfo.repository;

import com.assingment.todo.CompanyInfo.entity.CompanyInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyInfoRepository extends JpaRepository<CompanyInfoEntity,Integer> {
}
