import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Guitar } from 'src/app/model/Guitar';
import { GuitarsComponent } from '../guitars.component';
import { HttpClientService } from 'src/app/service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addguitar',
  templateUrl: './addguitar.component.html',
  styleUrls: ['./addguitar.component.css']
})
export class AddguitarComponent implements OnInit {

  @Input()
  guitar: Guitar;

  @Output()
  guitarAddedEvent = new EventEmitter();
  
  private selectedFile;
  imgURL: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit() {
  }
/*
  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }
*/

saveGuitar() {
/*
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;

    this.httpClient.post('http://localhost:8080/guitars/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) { */
          this.httpClientService.addGuitar(this.guitar).subscribe(
            (guitar) => {
              this.guitarAddedEvent.emit();
              this.router.navigate(['admin', 'guitars']);
            }
          );
/*
          console.log('Image uploaded successfully');
        } else {
          console.log('Image not uploaded successfully');
        }

      }
      );
      */
     
    }

}
