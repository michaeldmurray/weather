import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { weatherBit } from '../../environments/environment';
import { CityDetails } from '../models/city-details';
import { WeatherForecast } from '../models/weather-forecast';

@Component({
  selector: 'app-weather-forecast-list',
  templateUrl: './weather-forecast-list.component.html',
  styleUrls: ['./weather-forecast-list.component.css']
})
export class WeatherForecastListComponent implements OnInit {
  weatherBitUrl: string;
  weatherForecasts: WeatherForecast[];
  @Input() searchText: string;
  cityDetails: CityDetails;
  constructor(private http: HttpClient) {
    this.cityDetails = new CityDetails();
    this.weatherForecasts = [];
    this.weatherBitUrl = ``;
  }

  getWeather() {
    this.weatherForecasts = [];
    this.weatherBitUrl = `${weatherBit.urlBase}?city=${this.searchText}&key=${weatherBit.apiKey}`;
    this.http.get(this.weatherBitUrl).subscribe((results: any) => {
      console.log('WEATHER FORECASTS....');
      console.log(results);
      console.log('WEATHER FORECASTS....');
      this.cityDetails = new CityDetails(results['city_name'], results['state_code']);
      results.data.forEach(result => {
        this.weatherForecasts.push(
          new WeatherForecast(result['datetime'], result['max_temp'], result['min_temp']));
      });
    });

  }

  ngOnInit() {
  }

}
