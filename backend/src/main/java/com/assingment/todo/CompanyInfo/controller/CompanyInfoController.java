package com.assingment.todo.CompanyInfo.controller;

import com.assingment.todo.CompanyInfo.entity.CompanyInfoEntity;
import com.assingment.todo.CompanyInfo.service.CompanyInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/companyinfor")
public class CompanyInfoController {

    @Autowired
    CompanyInfoService companyInfoService;

    // GET - FUNCTION OF GET ALL COMPANY DETAILS
    @GetMapping("/getCompanyDeatails")
    public Optional<CompanyInfoEntity> getCompanyDetails(){
        return companyInfoService.getCompanyAllInfo();
    }


}
