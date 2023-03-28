import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainService } from '../services/main.service';
import { CharactersTableComponent } from './characters-table/characters-table.component';
import { CharacterModalComponent } from './character-modal/character-modal.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AngularMaterialModule } from '../shared/modules/angular-material.module';
import { SharedModule } from '../shared/modules/shared.module';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'characters-table', component: CharactersTableComponent },
  { path: 'characters-modal', component: CharacterModalComponent },
  { path: 'pie-chart', component: PieChartComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    CharactersTableComponent,
    CharacterModalComponent,
    PieChartComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [MainService],
})
export class HomeModule {}
