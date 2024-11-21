import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { DepartamentoService } from '../../../services/departamento.service';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-reportecantusuariosxdepartamento',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reportecantusuariosxdepartamento.component.html',
  styleUrl: './reportecantusuariosxdepartamento.component.css'
})
export class ReportecantusuariosxdepartamentoComponent implements OnInit {
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

  constructor(private dS: DepartamentoService) {}

  ngOnInit(): void {
    this.dS.cantusuariosxdepartamento().subscribe((data) => {
      this.barChartLabels = data.map(item => item.departamento);
      this.barChartData = [
        {
          data: data.map(item => item.cantidad_usuarios),
          label: 'Cantidad de Usuarios',
          backgroundColor: ['#5A9A68', '#8BBF8A', '#A9D4A7'],
          borderColor: ['#405A44', '#405A44', '#405A44'],
          borderWidth: 1
        }
      ];

      // Preparar datos para la tabla
      this.tablaDatos = data.map(item => ({
        departamento: item.departamento,
        cantidad_usuarios: item.cantidad_usuarios
      }));
    });
  }
}
