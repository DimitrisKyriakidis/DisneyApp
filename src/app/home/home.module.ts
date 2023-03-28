import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/shared/modules/angular-material.module';
import { SharedModule } from 'src/shared/modules/shared.module';
import { HomeComponent } from './home.component';
import { MainService } from '../services/main.service';
import { CharactersTableComponent } from './characters-table/characters-table.component';
import { CharacterModalComponent } from './character-modal/character-modal.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

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
