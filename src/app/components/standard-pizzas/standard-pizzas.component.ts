import {Component, OnInit} from '@angular/core';
import {IPizza} from '../../models/IPizza';
import {HttpClient} from '@angular/common/http';
import {PizzaService} from '../../services/PizzaService';

@Component({
  selector: 'app-standard-pizzas',
  templateUrl: './standard-pizzas.component.html',
  styleUrls: ['./standard-pizzas.component.css']
})
export class StandardPizzasComponent implements OnInit {

  allPizzas: IPizza[];

  errorMessage;
  orderedPizzas: number[] = [null, 0, 0, 0, 0];

  constructor(private http: HttpClient,
              private pizzaService: PizzaService) {
  }

  ngOnInit() {
    this.pizzaService.getAllPizzas().subscribe(
      allPizzas => {
        // this.allPizzas = this.allPizzasMock;
        this.allPizzas = allPizzas;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  addPizzas() {
    console.log('TODO'); // TODO
  }

}
