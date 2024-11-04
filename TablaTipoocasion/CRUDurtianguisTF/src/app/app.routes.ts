import { Routes } from '@angular/router';
import { TipoocasionComponent } from './components/tipoocasion/tipoocasion.component';
import { CreareditartipoocasionComponent } from './components/tipoocasion/creareditartipoocasion/creareditartipoocasion.component';

export const routes: Routes = [
    {
        path:'tipos_ocasion',component:TipoocasionComponent,
        children:[
            {
                path:'nuevo',component:CreareditartipoocasionComponent
            },
            {
                path:'ediciones/:id',component:CreareditartipoocasionComponent
            }
        ]
    }
];
