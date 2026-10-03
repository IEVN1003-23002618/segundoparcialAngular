import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})
export class ZodiacoComponent {
  // Variables del formulario
  nombre: string = '';
  apaterno: string = '';
  amaterno: string = '';
  dia: number | null = null;
  mes: number | null = null;
  anio: number | null = null;
  sexo: string = '';

  // Variables de resultados
  resultadoNombre: string = '';
  edad: number | null = null;
  signo: string = '';
  imagenSigno: string = '';
  mostrarResultado: boolean = false;

  imprimir(): void {
    if (!this.nombre || !this.apaterno || !this.amaterno || !this.anio) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    this.resultadoNombre = `${this.nombre} ${this.apaterno} ${this.amaterno}`;

    // Cálculo dinámico de la edad
    const hoy = new Date();
    let edadCalc = hoy.getFullYear() - this.anio;
    if (this.mes && this.dia) {
      const mesActual = hoy.getMonth() + 1;
      const diaActual = hoy.getDate();
      if (mesActual < this.mes || (mesActual === this.mes && diaActual < this.dia)) {
        edadCalc--;
      }
    }
    this.edad = edadCalc;

    // Cálculo del signo chino y asignación de imagen directa
    const residuo = this.anio % 12;

    if (residuo === 4) {
      this.signo = 'Rata';
      this.imagenSigno = 'https://clinicanido.es/wp-content/uploads/2017/06/P1020209-1.jpg';
    } else if (residuo === 5) {
      this.signo = 'Buey';
      this.imagenSigno = 'https://www.terrabuey.es/que-es-la-trazabilidad-de-la-carne-de-buey/';
    } else if (residuo === 6) {
      this.signo = 'Tigre';
      this.imagenSigno = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Sumatratiger-004.jpg/500px-Sumatratiger-004.jpg';
    } else if (residuo === 7) {
      this.signo = 'Conejo';
      this.imagenSigno = 'https://www.veterinarioexoticos.com/wp-content/uploads/2017/07/widderkaninchen.jpg';
    } else if (residuo === 8) {
      this.signo = 'Dragón';
      this.imagenSigno = 'https://media.wired.com/photos/6307febeba2a66af641b11df/1:1/w_863,h_863,c_limit/House-of-the-Dragon-CGI-Culture.jpg';
    } else if (residuo === 9) {
      this.signo = 'Serpiente';
      this.imagenSigno = 'https://media.es.wired.com/photos/6902a01ba2f65595b0b57b0f/master/w_2560,c_limit/1424991709';
    } else if (residuo === 10) {
      this.signo = 'Caballo';
      this.imagenSigno = 'https://image.jimcdn.com/app/cms/image/transf/dimension=origxorig:format=jpg/path/s39db3e970c57208e/image/i33304646518fd4e8/version/1365553501/image.jpg';
    } else if (residuo === 11) {
      this.signo = 'Cabra';
      this.imagenSigno = 'https://www.google.com/imgres?q=cabra&imgurl=https%3A%2F%2Fwww.serpar.gob.pe%2Fwp-content%2Fuploads%2F2024%2F04%2FCABRA.jpg&imgrefurl=https%3A%2F%2Fwww.serpar.gob.pe%2Fmundo-animal%2Fcabra-01%2F&docid=6GbdRqSvAhGSnM&tbnid=3oFq9QNF3FRqZM&vet=12ahUKEwi4hrauqJ6XAxXVI0QIHZGYIfQQnPAOegUIkwEQAA..i&w=770&h=433&hcb=2&ved=2ahUKEwi4hrauqJ6XAxXVI0QIHZGYIfQQnPAOegUIkwEQAA';
    } else if (residuo === 0) {
      this.signo = 'Mono';
      this.imagenSigno = 'https://media.cnn.com/api/v1/images/stellar/prod/cnne-212344-monkey-selfie.jpeg?c=16x9&q=h_833,w_1480,c_fill';
    } else if (residuo === 1) {
      this.signo = 'Gallo';
      this.imagenSigno = 'https://avesexoticas.org/wp-content/uploads/2017/09/gallo-bankiva-1-e1497661020141-1024x729.jpg';
    } else if (residuo === 2) {
      this.signo = 'Perro';
      this.imagenSigno = 'https://www.bunko.pet/img/2022/05/16/perro-pitbull-blue.jpg';
    } else if (residuo === 3) {
      this.signo = 'Cerdo';
      this.imagenSigno = 'https://i.blogs.es/576cff/cerdo0133e1/450_1000.webp';
    }

    this.mostrarResultado = true;
  }
}