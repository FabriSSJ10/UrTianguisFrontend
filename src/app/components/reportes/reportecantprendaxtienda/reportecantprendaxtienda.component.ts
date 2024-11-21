import { Component, OnInit } from '@angular/core';
import { PrendaService } from '../../../services/prenda.service';
import {
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../../node_modules/chart.js/dist/types/index.d';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);
@Component({
  selector: 'app-reportecantprendaxtienda',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reportecantprendaxtienda.component.html',
  styleUrl: './reportecantprendaxtienda.component.css'
})
export class ReportecantprendaxtiendaComponent implements OnInit {
  barCharOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#405A44',  
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#405A44', 
        titleColor: '#90B7A1',
        bodyColor: '#ffffff',
        borderColor: '#B3A284',
        borderWidth: 1
      }
    }
  };

  barChartLabels: string[] = [];
  barCharType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  tablaDatos: any[] = [];  // Array para almacenar los datos de la tabla

  constructor(private pS: PrendaService) {}

  ngOnInit(): void {
    this.pS.cantprendaxtienda().subscribe((data) => {
      this.barChartLabels = data.map(item => item.tienda);
      this.barChartData = [
        {
          data: data.map(item => item.cantidad_prendas),
          label: 'Cantidad de Prendas',
          backgroundColor: ['#5A9A68', '#8BBF8A', '#A9D4A7'],
          borderColor: ['#405A44', '#405A44', '#405A44'],
          borderWidth: 1
        }
      ];

      // Preparar datos para la tabla
      this.tablaDatos = data.map(item => ({
        tienda: item.tienda,
        cantidad_prendas: item.cantidad_prendas
      }));
    });
  }
}
