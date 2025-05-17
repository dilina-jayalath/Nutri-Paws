package com.assingment.todo.CompanyInfo.service;

import com.assingment.todo.CompanyInfo.entity.CompanyInfoEntity;
import com.assingment.todo.CompanyInfo.repository.CompanyInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyInfoService{
    @Autowired
    CompanyInfoRepository companyInfoRepository;

    // GET - FUNCTION OF GET ALL COMPANY DETAILS
    public Optional<CompanyInfoEntity> getCompanyAllInfo(){
        try{
            return companyInfoRepository.findById(1);
        }catch(Exception e){
            throw new RuntimeException("Error select company details ",e);
        }
    }
}
