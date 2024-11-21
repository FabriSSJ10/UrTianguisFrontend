import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { PagoService } from '../../../services/pago.service';
import { Cantidad_pagos_por_tipo_pagoDTO } from '../../../models/Cantidad_pagos_por_tipo_pagoDTO';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
Chart.register(...registerables);

@Component({
  selector: 'app-reportecantidadpagossegunmetodopago',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatCardModule],
  templateUrl: './reportecantidadpagossegunmetodopago.component.html',
  styleUrl: './reportecantidadpagossegunmetodopago.component.css'
})
export class ReportecantidadpagossegunmetodopagoComponent {
  barCharOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barCharType: ChartType = 'pie'; // Tipo de gráfico, puedes cambiar a 'bar' para barras
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  // Datos para la tabla
  datosPagos: Cantidad_pagos_por_tipo_pagoDTO[] = [];

  constructor(private paS: PagoService) {}

  ngOnInit(): void {
    this.paS.obtenerCantidadPagosXTipoPago().subscribe((data) => {
      this.datosPagos = data; // Guardamos los datos para mostrarlos en la tabla

      this.barChartLabels = data.map((item) => item.tipo_pago);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_pagos),
          label: 'Cantidad de pagos',
          backgroundColor: ['#5A9A68', '#8BBF8A', '#A9D4A7'],
          borderColor: ['#405A44', '#405A44', '#405A44'],
          borderWidth: 1
        },
      ];
    });
  }
}