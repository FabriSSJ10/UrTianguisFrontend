import { Component } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PagoService } from '../../../services/pago.service';
import { Cantidad_pagos_por_tipo_pago_y_mesDTO } from '../../../models/Cantidad_pagos_por_tipo_pago_y_mesDTO';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);
@Component({
  selector: 'app-reportecantidadpagossegunmetodopagopormes',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reportecantidadpagossegunmetodopagopormes.component.html',
  styleUrl: './reportecantidadpagossegunmetodopagopormes.component.css'
})
export class ReportecantidadpagossegunmetodopagopormesComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Meses' } },
      y: { title: { display: true, text: 'Cantidad de Pagos' }, beginAtZero: true }
    },
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  
  // Datos para la tabla
  tableData: Cantidad_pagos_por_tipo_pago_y_mesDTO[] = [];

  constructor(private paS: PagoService) {}

  ngOnInit(): void {
    this.paS.obtenerCantidadPagosXTipoPagoXMes().subscribe((data) => {
      const uniqueMeses = Array.from(new Set(data.map((item) => this.getMonthName(item.mes_cancelado))));
      const uniqueMetodos = Array.from(new Set(data.map((item) => item.metodo_pago)));

      this.barChartLabels = uniqueMeses;
      this.barChartData = uniqueMetodos.map((metodo) => {
        const dataByMonth = uniqueMeses.map((mes) => {
          const item = data.find((d) => this.getMonthName(d.mes_cancelado) === mes && d.metodo_pago === metodo);
          return item ? item.cantidad_de_pagos : 0;
        });
        return {
          data: dataByMonth,
          label: metodo,
          backgroundColor: ['#5A9A68', '#8BBF8A', '#A9D4A7'],
          borderColor: ['#405A44', '#405A44', '#405A44'],
          borderWidth: 1
        };
      });

      // Asignar datos para la tabla
      this.tableData = data;
    });
  }

  public getMonthName(date: string): string {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const monthNumber = new Date(date).getMonth();
    return months[monthNumber];
  }
}
