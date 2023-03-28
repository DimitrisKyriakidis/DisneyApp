import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';

import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [AngularMaterialModule, CommonModule, ChartModule],
  exports: [NavbarComponent, FooterComponent],
  providers: [],
})
export class SharedModule {}
