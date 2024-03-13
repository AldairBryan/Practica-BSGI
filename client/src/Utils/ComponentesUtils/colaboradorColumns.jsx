import { useMemo } from 'react';
import { SelectColumnFilter } from '../../components/Tabla/SelectColumnFilter';


export default function colaboradorColumns() {
    const columns = useMemo(
        () => [
            {
                Header: "Nombres",
                accessor: "colnom",
                Filter: SelectColumnFilter,
                filter: 'includes',            
            },
            {
                Header: "Apellidos",
                accessor: "colape",     
            },
            {
                Header: "Fecha de Nacimiento",
                accessor: "colfecnac",            
            },
            {
                Header: "Posicion",
                accessor: "colpos",                
            },
        ],
        []
    );
    return columns;
}