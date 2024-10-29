import { Routes } from '@angular/router';
import { TipopagoComponent } from './components/tipopago/tipopago.component';
import { CreareditartipopagoComponent } from './components/tipopago/creareditartipopago/creareditartipopago.component';
import { TipoocasionComponent } from './components/tipoocasion/tipoocasion.component';
import { CreareditartipoocasionComponent } from './components/tipoocasion/creareditartipoocasion/creareditartipoocasion.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { CreareditarnotificacionComponent } from './components/notificacion/creareditarnotificacion/creareditarnotificacion.component';

export const routes: Routes = [
    {
        path: 'tipopago',
        component: TipopagoComponent,
        children: [
            {
                path: 'crear', 
                component: CreareditartipopagoComponent
            }
        ]
    },
    {
        path: 'tipoocasion',
        component: TipoocasionComponent,
        children: [
            {
                path: 'crear', 
                component: CreareditartipoocasionComponent
            }
        ]
    },
    {
        path: 'notificaciones',
        component: NotificacionComponent,
        children: [
            {
                path: 'nuevo', 
                component: CreareditarnotificacionComponent
            },
            { 
                path:'ediciones/:id', component:CreareditarnotificacionComponent
            }
        ]
    },
];
