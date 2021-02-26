import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CriesService } from 'src/app/services/cries.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

 displayedColumns: string[] = ['position', 'image', 'name'];
 data:any[] = [];
 dataSource = new MatTableDataSource<any>(this.data);


 @ViewChild(MatPaginator)paginator?: MatPaginator;

  
constructor(
    private pokeService: PokemonService,
    private _cries: CriesService,
    private _router:Router
  ) { 
        
  }

  ngOnInit(): void {
    this.getPokemons();

  } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPokemons():void{
   let pokemonData;
  
    for(let i = 1 ; i <=150 ; i++){
      this.pokeService.getPokemons(i).subscribe(
        res =>{
          pokemonData ={
            position : i,
            image : res.sprites.front_default,
            name :  res.name
          };

          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator =  this.paginator!;
       
        },
        error =>{
          console.log(<any>error);
        }
      );
   }
  }

  getPokemon(pokemon:any){
      this._router.navigateByUrl(`pokeDetail/${pokemon.position}`)
      console.log(pokemon);;

  }

}
