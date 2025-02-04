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

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomepageComponent },
    { path: 'partner/login', component: PartnerloginComponent },
    { path: 'admin/login', component: AdminloginComponent },
    { path: 'partner', component: PartnerComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'addlead', component: AddleadsComponent },
            { path: 'editlead/:id', component: EditleadsComponent },
            { path: 'dashboard', component: PartnerdashboardComponent },
            { path: 'myaccount', component: PartnermyaccountComponent },
            { path: '**', redirectTo: 'login' }
        ]
     },
    { path: 'customer/login', component: CustomerComponent, 
    },
    { path: 'admin' , component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
