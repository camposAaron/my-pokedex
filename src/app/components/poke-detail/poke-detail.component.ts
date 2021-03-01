
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CriesService } from 'src/app/services/cries.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {
  
  //pokemon selected id
  public id:any;
  //pokemon object
  public pokemon: any;
  //pokemon types
  public pokemonType = [];
  //description
  private description:string
  //colour type for pokemon
  public colorType:Map<string, string>

  private pokemonSprites:string[] = [];
 
  

  constructor(
    private _actRouter:ActivatedRoute,
    private _pokeService: PokemonService,
    private __cryService: CriesService,
    private location:Location,  
  ) { 
        this.pokemon = {
          id:  '',
            img : '',
            name : '',
            height:  '',
            weight: '',
            type : ''        
          }

          /*id of route param */
          this._actRouter.params.subscribe( params =>{
            this.id = params.id;
          });
        
          this.description = '';

          /*color for type of pokemon */
          this.colorType = new Map<string, string>();
          this.colorType.set('flying',' #a89cd7');
          this.colorType.set('ice','#9ac3c5');
          this.colorType.set('ghost','#80739a');
          this.colorType.set('dark' ,'#8a776d');
          this.colorType.set('poison', '#a165a2');
          this.colorType.set('psychic' , '#e57b9a');
          this.colorType.set('fire' ,'#d58e59');
          this.colorType.set('rock','#baaa64');
          this.colorType.set('bug', '#aab351');
          this.colorType.set('dragon', '#1883f1');
          this.colorType.set('steel', '#b4b1c5');
          this.colorType.set('fairy', '#d89fae');
          this.colorType.set('water', '#819cd9');
          this.colorType.set('grass', '#8abf72');
          this.colorType.set('electric' , '#dec65c');
          this.colorType.set('ground', '#d0be82');
          this.colorType.set('normal',  '#acae90');
          this.colorType.set('fighting' , '#e0827b');
    }

  ngOnInit(): void {
     this.playCrySound();
     this.getPokemonCharacterist();
     this.getSelectedPokemon();
    
   
  }

  getSelectedPokemon():void{

      this._pokeService.getPokemons(this.id).subscribe(
        res =>{
         

          this.pokemon = {
            id: res.id,
            img : res.sprites.front_default,
            name : res.name,
            height:  res.height,
            weight: res.weight,
            type : res.types[0].type.name,
            description : this.description
          }

          this.pokemonSprites = [
            res.sprites.front_default,
            res.sprites.back_default, 
          ]

        },
        err =>{
          console.log(<any>err);
        }
      )
  }

  getPokemonCharacterist():void{
     this._pokeService.getPokemonDescription(this.id).subscribe(
      res =>{
          this.description = res.descriptions[0].description;
          console.log(this.description);
      },
      error =>{
        console.log(error);
      }
    )
  }

  playCrySound():void{
     this.__cryService.getCryAudio(this.id);
  }

  changeSprite():void{
     if(this.pokemon.img === this.pokemonSprites[0]) 
        this.pokemon.img = this.pokemonSprites[1];
     else
      this.pokemon.img = this.pokemonSprites[0];
    
  }

  rollback():void{
     this.location.back();
  }
 
  
  
}

