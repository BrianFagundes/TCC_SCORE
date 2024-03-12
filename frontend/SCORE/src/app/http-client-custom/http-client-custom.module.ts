// http-client.module.ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule] // Torna o HttpClientModule disponível para outros módulos
})
export class HttpClientCustomModule {}