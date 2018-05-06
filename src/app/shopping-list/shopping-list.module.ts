import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRouting } from "./shopping-list.routing";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ShoppingListRouting
    ]
})

export class ShoppingListModule{

}