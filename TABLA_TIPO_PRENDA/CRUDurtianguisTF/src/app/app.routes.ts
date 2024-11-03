import { Routes } from '@angular/router';
import { TipoPrendaComponent } from './components/tipo_prenda/tipo_prenda.component';
import { CreareditartipoprendaComponent } from './components/tipo_prenda/creareditartipoprenda/creareditartipoprenda.component';

export const routes: Routes = [
    {
        path:'tipo_prenda',component:TipoPrendaComponent,
        children:[
            {
                path:'nuevo',component:CreareditartipoprendaComponent
            },
            {
                path:'ediciones/:id',component:CreareditartipoprendaComponent
            }
        ]
    }
];
