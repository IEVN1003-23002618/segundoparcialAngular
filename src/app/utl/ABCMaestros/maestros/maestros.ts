import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaestrosUTL } from '../maestrosUTL';
import { MaestrosapiService } from '../maestrosapi.service';
import { MaestroFilterPipe } from '../maestros-filter.pipe';

@Component({
  selector: 'app-maestros',
  standalone: true,
  imports: [FormsModule, RouterLink, MaestroFilterPipe, CommonModule],
  templateUrl: './maestros.html'
})
export class Maestros implements OnInit {
  listFilter: string = '';
  dataSource: MaestrosUTL[] = [];

  constructor(public maestrosUTL: MaestrosapiService, private router: Router) {}

  ngOnInit(): void {
    this.cargarMaestros();
  }

  cargarMaestros(): void {
    this.maestrosUTL.getMaestros().subscribe({
      next: (response: MaestrosUTL[]) => {
        this.dataSource = response;
      },
      error: (error) => {
        console.error('Error al cargar maestros:', error);
      }
    });
  }
}