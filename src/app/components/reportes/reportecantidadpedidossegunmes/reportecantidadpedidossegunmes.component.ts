import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PedidoService } from '../../../services/pedido.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportecantidadpedidossegunmes',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reportecantidadpedidossegunmes.component.html',
  styleUrl: './reportecantidadpedidossegunmes.component.css'
})
export class ReportecantidadpedidossegunmesComponent implements OnInit{
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
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mes',
          color: '#405A44',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad de Pedidos',
          color: '#405A44',
        },
      },
    },
  };

  barChartLabels: string[] = []; 
  barCharType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  tablaDatos: any[] = [];  // Datos para la tabla

  constructor(private pS: PedidoService) {}

  ngOnInit(): void {
    this.pS.obtenerCantidadPedidoXMes().subscribe((data) => {
      const anios = [...new Set(data.map(item => item.anio))];

      // Series para el gráfico
      const series: ChartDataset[] = anios.map((anio) => {
        return {
          label: `Pedidos ${anio}`,
          data: data.filter(item => item.anio === anio).map(item => item.cantidad_pedidos),
          backgroundColor: '#5A9A68', 
          borderColor: '#405A44',
          borderWidth: 1,
        };
      });

      // Etiquetas de los meses (1-12 a nombres)
      const mesesFormateados = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      this.barChartLabels = data
        .filter((item, index, self) => self.findIndex(d => d.mes === item.mes) === index)
        .map(item => mesesFormateados[parseInt(item.mes) - 1]);


      this.barChartData = series;

      // Preparar datos para la tabla
      this.tablaDatos = data.map((item) => ({
        mes: mesesFormateados[parseInt(item.mes) - 1],
        anio: item.anio,
        cantidad_pedidos: item.cantidad_pedidos
      }));
    });
  }
}
