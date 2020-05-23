import { Documento } from './Documento';
import { Paso } from './Paso';
import { Tipo } from './Tipo';
import { PuntoAtencion } from './PuntoAtencion';

export class GuiaDeTramite {
    constructor(
        public id: string,
        public titulo: string,
        public descripcion: string,
        public anexo: Documento,
        public pasos: Paso[],
        public tipo: Tipo,
        public soporteLegal: string,
        public puntosDeAtencion: PuntoAtencion[]
    ) { }
}
