import { Component, OnInit } from '@angular/core';
import { CompanyInfoService } from '../service/company-info.service';
interface CompanyInfo {
  id: number;
  address: string;
  phone: string;
  email: string;
  copyrightText: string;
  socialMediaLinks: string; // Note: This comes as stringified JSON
}
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  currentYear: number;
  companyInfo: any;
  socialLinks: { key: string; url: string }[] = [];

  constructor(private api: CompanyInfoService) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.getAllCompanyInfo();
  }

  getAllCompanyInfo(): void {
    this.api.getAllItems().subscribe(
      (response: any) => {
        this.companyInfo = response;
        this.parseSocialLinks();
        console.log(this.socialLinks);
      },
      (error) => console.error('Error fetching company info:', error)
    );
  }

  parseSocialLinks(): void {
    try {
      if (this.companyInfo?.socialMediaLinks) {
        const links = JSON.parse(this.companyInfo.socialMediaLinks);
        this.socialLinks = Object.entries(links).map(([key, url]) => ({
          key,
          url: url as string,
        }));
      }
    } catch (e) {
      console.error('Error parsing social media links:', e);
      this.socialLinks = [];
    }
  }
}
