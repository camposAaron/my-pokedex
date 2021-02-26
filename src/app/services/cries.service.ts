import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CriesService {

  criesPath = environment.criesPath;

  constructor() { 
    
  }

  getCryAudio(id:number){
    let audio = new Audio(`../../assets/cries/pokemon/firstGenerationCries/${id}.ogg`);
    audio.play();
  }
}
