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

  // Calculator inputs with default values
  monthlyIncome: number = 0;
  monthlyExpenses: number = 0;
  existingEMI: number = 0;
  eligibilityinterestRate: number = 8.5;
  eligibilityloanTenure: number = 20;

  // Calculator outputs
  maxLoanAmount: string = '₹0';
  maxEMICapacity: string = '₹0';
  netIncome: string = '₹0';
ngOnInit() {
  this.calculateEMI();
  this.calculateEligibility();
}

calculateEligibility() {
  // Calculate net monthly income

  // Calculate disposable income (56% of net income)
  const netIncome = this.monthlyIncome - this.monthlyExpenses - this.existingEMI;
  const maxEMIAllowed = netIncome * 0.56;
  

  // Calculate maximum loan amount using EMI formula
  // P = EMI * [1 - (1 + r)^(-n)] / r
  const monthlyRate = (this.eligibilityinterestRate / 12) / 100;
  const months = this.eligibilityloanTenure * 12;
  
  const maxLoanAmount = maxEMIAllowed * 
    (1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate;

  // Format and set the outputs
  if(Math.round(maxLoanAmount)<=0){
    this.maxLoanAmount = '₹0';
    this.maxEMICapacity = '₹0';
  }
  else{
  this.maxLoanAmount = this.formatCurrency(Math.round(maxLoanAmount));
  this.maxEMICapacity = this.formatCurrency(Math.round(maxEMIAllowed));
  }

  
  this.netIncome = this.formatCurrency(Math.round(netIncome));
}

onInputEChange(event: Event, type: 'income' | 'expenses' | 'emi' | 'rate' | 'tenure') {
  const value = (event.target as HTMLInputElement).value;
  
  switch(type) {
    case 'income':
      this.monthlyIncome = this.clamp(Number(value), 0, 1000000);
      break;
    case 'expenses':
      this.monthlyExpenses = this.clamp(Number(value), 0, 500000);
      break;
    case 'emi':
      this.existingEMI = this.clamp(Number(value), 0, 300000);
      break;
    case 'rate':
      this.interestRate = this.clamp(Number(value), 7, 15);
      break;
    case 'tenure':
      this.loanTenure = this.clamp(Number(value), 1, 30);
      break;
  }
  
  this.calculateEligibility();
}

private formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(amount);
}

private clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
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
