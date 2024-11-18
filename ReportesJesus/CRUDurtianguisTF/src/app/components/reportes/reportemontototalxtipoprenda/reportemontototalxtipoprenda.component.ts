import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { DetpedidoService } from '../../../services/detpedido.service';
import { PagoService } from '../../../services/pago.service';
Chart.register(...registerables);

@Component({
  selector: 'app-reportemontototalxtipoprenda',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportemontototalxtipoprenda.component.html',
  styleUrl: './reportemontototalxtipoprenda.component.css'
})
export class ReportemontototalxtipoprendaComponent implements OnInit {
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
  barCharType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private dS: DetpedidoService) {}

  ngOnInit(): void {
    this.dS.montototalxtipoprenda().subscribe((data) => {
      this.barChartLabels = data.map(item => item.tipo_prenda);
      this.barChartData = [
        {
          data: data.map(item => item.total_recaudado),
          label: 'Monto Total de Pagos',
          backgroundColor: ['#5A9A68', '#8BBF8A', '#A9D4A7'], 
          borderColor: ['#405A44', '#405A44', '#405A44'],    
          borderWidth: 1
        }
      ];
    });
  }
}
