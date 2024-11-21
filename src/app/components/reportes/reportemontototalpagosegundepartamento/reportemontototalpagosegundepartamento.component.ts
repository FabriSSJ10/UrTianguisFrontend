import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { PagoService } from '../../../services/pago.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportemontototalpagosegundepartamento',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reportemontototalpagosegundepartamento.component.html',
  styleUrl: './reportemontototalpagosegundepartamento.component.css'
})
export class ReportemontototalpagosegundepartamentoComponent implements OnInit{
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
  tablaDatos: any[] = [];  

  constructor(private pS: PagoService) {}

  ngOnInit(): void {
    this.pS.obtenerMontoTotalXDepartamento().subscribe((data) => {
      this.barChartLabels = data.map(item => item.departmento);
      this.barChartData = [
        {
          data: data.map(item => item.monto_total),
          label: 'Monto Total de Pagos',
          backgroundColor: ['#5A9A68', '#8BBF8A', '#A9D4A7'],
          borderColor: ['#405A44', '#405A44', '#405A44'],
          borderWidth: 1
        }
      ];

      // Preparar datos para la tabla
      this.tablaDatos = data.map(item => ({
        departamento: item.departmento,
        monto_total: item.monto_total
      }));
    });
  }
}
