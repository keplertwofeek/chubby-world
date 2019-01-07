import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeightDataService } from './services/weight-data.service';
import { data } from '../../sample-data';
import { Chart } from 'chart.js';
import { clone, uniq } from 'lodash';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'app';
	chart;
	alive = true;
	data = [];
	boys = ['Wafeek', 'Nico', 'Ville', 'Jose'];
	private weightDataSubscription: Subscription;


	constructor( private weightDataService: WeightDataService) {
	}

	ngOnInit() {
		this.weightDataSubscription = this.weightDataService.getData().subscribe((res) => {
			this.data = res.Items;
				this.boys.forEach(boy => {
					this.initiateChart(boy);
				});
		});
	}

	ngOnDestroy() {
		if (this.weightDataSubscription) { this.weightDataSubscription.unsubscribe(); }
	}

	async initiateChart(name) {
		const canvas = document.getElementById(name);
		this.chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: [1, 2, 3, 4, 5, 6],
				datasets: [
					{
					data: clone(this.data).filter(chubby => chubby.boy === name).map(chubby => chubby.weight),
					borderColor: 'rgba(255, 99, 132, 0.2)',
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					fill: true
				}
			]
		},
		options: {
			legend: {
				display: false,
			},
			scales: {
				xAxes: [{
					display: true
				}],
				yAxes: [{
					display: true
				}]
			}
		}
		});
	}
}
