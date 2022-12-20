import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponentComponent} from './auth/login/login-component/login-component.component';
import {PostCreateComponent} from './post/post-create/post-create.component'
import {PostDisplayComponent} from './post/post-display/post-display.component'

const routes: Routes = [
    {path:'', component:PostDisplayComponent},
    {path:'add',component:PostCreateComponent},
    {path:'login',component:LoginComponentComponent},
    {path:'signup',component:LoginComponentComponent},
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}