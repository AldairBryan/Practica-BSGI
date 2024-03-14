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
                Header: "Colaborador (Nombres y apellidos)",
                accessor: "contrcolcod",
                Cell: ({ row }) => `${row.values.contrcolcod.colnom} ${row.values.contrcolcod.colape}`,      
            },
        ],
        []
    );
    return columns;
}