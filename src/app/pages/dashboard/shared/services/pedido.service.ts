import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from "@angular/core";
import { Observable } from 'rxjs';

import { Pedido } from './../models/pedido.model';
import { PagedResults } from '../models/pagedResults.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  protected apiPath: string = 'https://localhost:44382/api/v1/pedidos';
  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBUElCYWNrRW5kIn0.gc0aw02SqbVNnKqSZGbNHokU4Mvew0lKAAKxID256uE';
  protected http: HttpClient;

  constructor(private injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  public obterPedidos(pageNumber: number, pageSize: number): Observable<PagedResults<Pedido>> {

    const url = `${this.apiPath}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<PagedResults<Pedido>>(url + `?pageNumber=${pageNumber}&pageSize=${pageSize}`, { headers: headers });
  }

}

