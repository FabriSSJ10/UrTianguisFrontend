import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { PedidoService } from '../../../services/pedido.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportecantidadpedidossegundepartamento',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reportecantidadpedidossegundepartamento.component.html',
  styleUrl: './reportecantidadpedidossegundepartamento.component.css'
})
export class ReportecantidadpedidossegundepartamentoComponent implements OnInit{
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
  barChartData: ChartDataset[] = [];
  
  // Datos para la tabla
  tableData: { departamento: string, cantidad_pedidos: number }[] = [];

  constructor(private pS: PedidoService) {}

  ngOnInit(): void {
    this.pS.obtenerCantidadPedidoXDepartamento().subscribe((data) => {
      this.barChartLabels = data.map(item => item.departamento);
      this.barChartData = [
        {
          data: data.map(item => item.cantidad_pedidos),
          label: 'Cantidad de Pedidos',
          backgroundColor: ['#5A9A68', '#8BBF8A', '#A9D4A7'],
          borderColor: ['#405A44', '#405A44', '#405A44'],
          borderWidth: 1
        }
      ];

      // Asignar datos a la tabla
      this.tableData = data.map(item => ({
        departamento: item.departamento,
        cantidad_pedidos: item.cantidad_pedidos
      }));
    });
  }
}
