import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-http-test',
    templateUrl: './http-test.component.html',
    styleUrls: ['./http-test.component.scss']
})
export class HttpTestComponent implements OnInit {

    tulos = 'Moro';
    apitulos = 'Moro taas';
    apiosoite = 'http://media.mw.metropolia.fi/wbma';
    junaosoite = 'https://rata.digitraffic.fi/api/v1';
    junatulos: any;
    kuvaosoite = 'http://media.mw.metropolia.fi/wbma/uploads/';
    constructor(private http: HttpClient) {
    }

    getJson() {
        interface Myinterface {
            license: string;
        }

        this.http.get<Myinterface>('assets/package.json').subscribe(data => {
            console.log(data);
            this.tulos = data.license;
        });
    }

    getFromApi() {
        this.http.get(this.apiosoite + '/media').subscribe(data => {
            console.log(data[0].filename);
            this.apitulos = this.kuvaosoite + data[0].filename;
        });

    }

    getJuna() {
        this.http.get(this.junaosoite + '/trains/2018-01-18').subscribe(data => {
            console.log(data);
            this.junatulos = data;
        });
    }

    ngOnInit() {
        this.getJuna();
        this.getJson();
        this.getFromApi();
    }

}
