import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
  list?: string[];
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
project: any;
settings: any;

loanAmount: number = 2500000;
interestRate: number = 8.5;
loanTenure: number = 20;
monthlyEMI: string = '₹0';
totalInterest: string = '₹0';
totalAmount: string = '₹0';
private chart: any;

ngOnInit() {
  this.calculateEMI();
}

calculateEMI() {
  const P = this.loanAmount;
  const R = this.interestRate / 12 / 100;
  const N = this.loanTenure * 12;

  const EMI = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
  const totalAmount = EMI * N;
  const totalInterest = totalAmount - P;

  this.monthlyEMI = '₹' + Math.round(EMI).toLocaleString('en-IN');
  this.totalInterest = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
  this.totalAmount = '₹' + Math.round(totalAmount).toLocaleString('en-IN');

}

onInputChange(event: any, type: string) {
  switch(type) {
    case 'amount':
      this.loanAmount = parseFloat(event.target.value);
      break;
    case 'rate':
      this.interestRate = parseFloat(event.target.value);
      break;
    case 'tenure':
      this.loanTenure = parseFloat(event.target.value);
      break;
  }
  this.calculateEMI();
}


faqItems: FAQItem[] = [
  {
    question: 'What documents are required for loan application?',
    answer: 'The basic documents required are:',
    list: [
      'Identity Proof (Aadhaar, PAN)',
      'Address Proof',
      'Income Proof (Salary Slips/IT Returns)',
      'Bank Statements (Last 6 months)',
      'Property Documents (for secured loans)'
    ],
    isOpen: false
  },
  {
    question: 'What is the minimum credit score required?',
    answer: 'We typically require a minimum credit score of 650. However, we evaluate each application on a case-by-case basis considering multiple factors.',
    isOpen: false
  },
  {
    question: 'How long does the loan approval process take?',
    answer: 'The typical approval process takes 24-48 hours once all required documents are submitted. Disbursement usually follows within 2-3 business days after approval.',
    isOpen: false
  },
  {
    question: 'What are the interest rates offered?',
    answer: 'Our interest rates start from 8.5% p.a. and vary based on factors like loan amount, tenure, credit score, and income. Use our EMI calculator to get a better estimate.',
    isOpen: false
  },
  {
    question: 'Is there any prepayment penalty?',
    answer: 'There are no prepayment penalties on floating rate loans. For fixed-rate loans, a nominal charge may apply as per the terms and conditions.',
    isOpen: false
  }
];

toggleFAQ(index: number): void {
  this.faqItems = this.faqItems.map((item, i) => ({
    ...item,
    isOpen: i === index ? !item.isOpen : false
  }));
}







}
