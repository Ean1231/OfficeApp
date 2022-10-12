import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfficeViewPageRoutingModule } from './office-view-routing.module';

import { OfficeViewPage } from './office-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfficeViewPageRoutingModule
  ],
  declarations: [OfficeViewPage]
})
export class OfficeViewPageModule {}
