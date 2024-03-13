import { useMemo } from 'react';
import { SelectColumnFilter } from '../../components/Tabla/SelectColumnFilter';


export default function contratoColumns() {
    const columns = useMemo(
        () => [
            {
                Header: "Fecha de Inicio",
                accessor: "contrfecini",     
            },
            {
                Header: "Fecha de Fin",
                accessor: "contrfecfin",     
            },
            {
                Header: "EPS",
                accessor: "contreps",              
            },
            {
                Header: "Seguro",
                accessor: "contrseg",                
            },
            {
                Header: "Colaborador",
                accessor: "contrcolcod",
                Filter: SelectColumnFilter,
                filter: 'includes',                   
            },
        ],
        []
    );
    return columns;
}