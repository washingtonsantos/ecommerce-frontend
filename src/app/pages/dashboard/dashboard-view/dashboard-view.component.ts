import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { PedidoService } from './../shared/services/pedido.service';
import { Pedido } from './../shared/models/pedido.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-view',
  styleUrls: ['./dashboard-view.component.css'],
  templateUrl: './dashboard-view.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardViewComponent implements AfterViewInit {

  pedidos: Pedido[] = [];
  displayedColumns: string[] = ['id', 'dataCriacao', 'dataEntrega', 'endereco', 'detalhes' ];
  dataSource = new MatTableDataSource<Pedido>();
  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent;
  currentPage = 0;
  // Expand Row In Table
  expandedElement: Pedido | null = null;

  // Gráfico
  lineChartData: ChartDataSets[] = [];
  lineChartOptions: ChartOptions[] = [];
  lineChartLabels: Label[] = [];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType =  'bar';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private pedidoService: PedidoService){}

  ngAfterViewInit() {
    if(this.paginator)
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.obterPedidos(0, 20);
  }

  handlePageEvent(page: PageEvent) {
    this.obterPedidos( page.pageIndex + 1, page.pageSize);
  }

  obterPedidos(pageIndex: number, pageSize: number) {
    this.pedidoService.obterPedidos(pageIndex, pageSize).
       subscribe(data =>
        {
          if(data){
            this.dataSource = new MatTableDataSource(data.items);
            this.setPagination(+data.totalCount, pageSize, pageIndex);
            this.preencherGraficoPedidos(data.items);
          }
        });
  }

  private setPagination(totalCount: number, pageSize: number, pageIndex: number) {
    this.pageEvent.length = this.paginator.length = totalCount;
    this.pageEvent.pageSize = pageSize;
    this.pageEvent.pageIndex = this.currentPage = pageIndex;
  }

  private preencherGraficoPedidos(pedidos: Pedido[]) {

    this.lineChartLabels = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    this.lineChartOptions = [
      { responsive: true }
    ];

    this.lineChartData = [
      {
        "label": "Pedidos",
        "data":
        [
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '1').length,
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '2').length,
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '3').length,
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '4').length,
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '5').length,
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '6').length,
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '7').length,
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '8').length,
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '9').length,
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '10').length,
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '11').length,
          pedidos.filter(f => f.dataCriacao.toString().split('-')[1] == '12').length,
        ]
      },
    ];

  }

}




