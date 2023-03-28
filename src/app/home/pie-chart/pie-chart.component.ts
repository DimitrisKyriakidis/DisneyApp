import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import * as Highcharts from 'highcharts';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent implements OnInit, OnChanges {
  public options: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: true,
      type: 'pie',
      with: 400,
      height: 450,
      backgroundColor: '#e8edee',
    },
    title: {
      text: 'Details of the characters',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      formatter: function () {
        return (
          '<b>' +
          this.point.name +
          '</b>: ' +
          this.point.y +
          '%' +
          '<br/>' +
          this.point.films
        );
      },
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} % ',
        },
      },
    },
    series: [{}],
  };
  @Input() allCharacters$: Observable<any[]>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    changes['allCharacters$'].currentValue.subscribe((value) => {
      //create the series data of the chart

      let characterInfo = [];
      const newValue = [...value];

      const totalFilms = newValue.reduce((acc, element) => {
        return acc + element.films.length;
      }, 0);

      newValue.forEach((val) => {
        const percentageOfFilms = (val.films.length * 100) / totalFilms;
        characterInfo.push({
          name: val.name,
          y: percentageOfFilms,
          films: val.films.length > 0 ? val.films : 0,
        });
      });

      this.options.series = [
        ...this.options.series,
        { name: 'Films', colorByPoint: true, data: characterInfo },
      ];

      this.options.series.splice(0, 1);

      Highcharts.chart('container', this.options);
    });
  }
  ngOnInit(): void {}

  exportData() {
    // Get the data from the chart
    const chartData = Highcharts.charts
      .find((chart) => chart !== undefined)
      .series[0].data.map((point) => {
        return {
          name: point.name,
          y: point.y,
          films: point['films'].toString(),
        };
      });

    // Define the headers for the xlsx file
    const headers = ['Name', 'Percentage', 'Films'];
    const data = [
      headers,
      ...chartData.map((point) => [point.name, point.y, point.films]),
    ];

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Determine the maximum width of the 'Films' column
    const maxFilmsLength = Math.max(
      ...chartData.map((point) => point.films.length)
    );

    // Set column widths
    const columnWidths = [
      { wch: 20 },
      { wch: 15, alignment: { horizontal: 'left' } },
      { wch: maxFilmsLength + 2 },
    ];

    worksheet['!cols'] = columnWidths;

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pie Chart Data');

    // Save the workbook as a xlsx file
    XLSX.writeFile(workbook, 'pie-chart-data.xlsx');
  }
}
