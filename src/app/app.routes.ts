import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PartnerComponent } from './partner/partner.component';
import { PartnerloginComponent } from './partner/partnerlogin/partnerlogin.component';
import { PartnerleaddsComponent } from './partner/partnerleadds/partnerleadds.component';
import { PartnerdashboardComponent } from './partner/partnerdashboard/partnerdashboard.component';
import { PartnermyaccountComponent } from './partner/partnermyaccount/partnermyaccount.component';
import { CustomerloginComponent } from './customer/customerlogin/customerlogin.component';
import { CustomerleadsComponent } from './customer/customerleads/customerleads.component';
import { CustomerdashboardComponent } from './customer/customerdashboard/customerdashboard.component';
import { CustomermyaccountComponent } from './customer/customermyaccount/customermyaccount.component';
import { CustomerComponent } from './customer/customer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddleadsComponent } from './partner/addleads/addleads.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomepageComponent },
    { path: 'partner', component: PartnerComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: PartnerloginComponent },
            { path: 'addlead', component: AddleadsComponent },
            { path: 'leads', component: PartnerleaddsComponent },
            { path: 'dashboard', component: PartnerdashboardComponent },
            { path: 'myaccount', component: PartnermyaccountComponent },
            { path: '**', redirectTo: 'login' }
        ]
     },
    { path: 'customer', component: CustomerComponent, 
        children : [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: CustomerloginComponent },
            { path: 'leads', component: CustomerleadsComponent },
            { path: 'dashboard', component: CustomerdashboardComponent },
            { path: 'myaccount', component: CustomermyaccountComponent },
            { path: '**', redirectTo: 'login' }
        ]
    },
    { path: '**', redirectTo: 'home' }
];
