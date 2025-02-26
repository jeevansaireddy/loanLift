import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PartnerComponent } from './partner/partner.component';
import { PartnerloginComponent } from './partnerlogin/partnerlogin.component';
import { PartnerdashboardComponent } from './partner/partnerdashboard/partnerdashboard.component';
import { PartnermyaccountComponent } from './partner/partnermyaccount/partnermyaccount.component';
import { CustomerComponent } from './customer/customer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddleadsComponent } from './partner/addleads/addleads.component';
import { EditleadsComponent } from './partner/editleads/editleads.component';
import { AdminComponent } from './admin/admin.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminmyaccountComponent } from './admin/adminmyaccount/adminmyaccount.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ViewleadComponent } from './admin/viewlead/viewlead.component';
import { AdminaddleadComponent } from './admin/adminaddlead/adminaddlead.component';
import { CustomerloginComponent } from './customerlogin/customerlogin.component';
import { CustomeraddleadsComponent } from './customer/customeraddleads/customeraddleads.component';
import { CustomereditleadsComponent } from './customer/customereditleads/customereditleads.component';
import { CustomerdashboardComponent } from './customer/customerdashboard/customerdashboard.component';
import { CustomermyaccountComponent } from './customer/customermyaccount/customermyaccount.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomepageComponent },
    { path: 'partner/login', component: PartnerloginComponent },
    { path: 'admin/login', component: AdminloginComponent },
    { path: 'customer/login', component: CustomerloginComponent },
    { path: 'partner', component: PartnerComponent,
        children: [
            { path: '', redirectTo: 'partner/login', pathMatch: 'full' },
            { path: 'addlead', component: AddleadsComponent },
            { path: 'editlead/:id', component: EditleadsComponent },
            { path: 'dashboard', component: PartnerdashboardComponent },
            { path: 'myaccount', component: PartnermyaccountComponent },
            { path: '**', redirectTo: 'login' }
        ]
     },
    { path: 'customer', component: CustomerComponent,
        children: [
            { path: '', redirectTo: 'customer/login', pathMatch: 'full' },
            { path: 'addlead', component: CustomeraddleadsComponent },
            { path: 'editlead/:id', component: CustomereditleadsComponent },
            { path: 'dashboard', component: CustomerdashboardComponent },
            { path: 'myaccount', component: CustomermyaccountComponent },
            { path: '**', redirectTo: 'login' }
        ]

    },
    { path: 'admin' , component: AdminComponent,
        children: [
            { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
            { path: 'viewlead/:id', component: ViewleadComponent },
            {
                path: 'viewlead/:id/edit',
                component: ViewleadComponent,
                data: { mode: 'edit' }
              },
            { path: 'dashboard', component: AdmindashboardComponent },
            { path: 'addlead', component: AdminaddleadComponent},
            { path: 'myaccount', component: AdminmyaccountComponent},
            { path: '**', redirectTo: 'login' }
        ]
    },
    { path: '**', redirectTo: 'home' }
];
