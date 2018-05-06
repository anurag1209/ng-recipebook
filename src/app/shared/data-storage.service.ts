import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService{

    constructor(private http: Http, private recipeService: RecipeService,
                private authService: AuthService){}

    storeRecipes(){
        return this.http.put('https://angular-recipebook-d026e.firebaseio.com/recipes.json', 
                this.recipeService.getRecipes());
    }

    // fetchData(){
    //     return this.http.get('https://angular-recipebook-d026e.firebaseio.com/recipes.json')
    //         .subscribe(
    //             (response: Response) => {
    //                 const recipes: Recipe[] = response.json();
    //                 this.recipeService.setRecipes(recipes);
    //             }
    //         );
    // }

    fetchData(){
        
        const token = this.authService.getToken();

        return this.http.get('https://angular-recipebook-d026e.firebaseio.com/recipes.json?auth='+token)
            .map(
                (response: Response)=> {
                    const recipes: Recipe[] = response.json();
                    for ( let recipe of recipes )
                    {
                        if( !recipe['ingredients'] )
                        {
                            console.log(recipe);
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }

}