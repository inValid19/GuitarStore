import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Guitar } from 'src/app/model/Guitar';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewguitar',
  templateUrl: './viewguitar.component.html',
  styleUrls: ['./viewguitar.component.css']
})
export class ViewguitarComponent implements OnInit {


  @Input()
  guitar: Guitar;

  @Output()
  guitarDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService,private router: Router) { }

  ngOnInit() {
  }

  deleteGuitar() {
    this.httpClientService.deleteGuitar(this.guitar.id).subscribe(
      (guitar) => {
        this.guitarDeletedEvent.emit();
        this.router.navigate(['admin', 'guitars']);
      }
    );
  }
  
  editGuitar() {
    this.router.navigate(['admin', 'guitars'], { queryParams: { action: 'edit', id: this.guitar.id } });
  }
}
