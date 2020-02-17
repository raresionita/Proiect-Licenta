
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import NavBarComponent from './nav-bar.component';


@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: NavBarComponent}
		])
	],
	exports: [
		RouterModule
	]
})
export class FileUploadRoutingModule {}
