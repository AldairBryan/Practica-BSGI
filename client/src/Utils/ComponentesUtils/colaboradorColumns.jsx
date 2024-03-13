import { useMemo } from 'react';
import { SelectColumnFilter } from '../../components/Tabla/SelectColumnFilter';


export default function colaboradorColumns() {
    const columns = useMemo(
        () => [
            {
                Header: "Nombres",
                accessor: "colnom",     
            },
            {
                Header: "Apellidos",
                accessor: "colape",     
            },
            {
                Header: "Empresa",
                accessor: "pagopeemp",
                Filter: SelectColumnFilter,
                filter: 'includes',                   
            },
            {
                Header: "Cant. Dias",
                accessor: "pagopecandia",                
            },
            {
                Header: "Costo Dia",
                accessor: "pagopecosdia",
                Cell: ({ row }) => `S/.${row.values.pagopecosdia}`                 
            },
            {
                Header: "Fecha Inicio",
                accessor: "pagopeperini",                
            },
            {
                Header: "Fecha Fin",
                accessor: "pagopeperfin",                
            },
            {
                Header: "Neto Pago",
                accessor: "pagopenetpag",
                Cell: ({ row }) => `S/.${row.values.pagopenetpag}`
            },
            {
                Header: "Fecha Pago",
                accessor: "pagopefec",                
            },
            {
                Header: "Estado",
                accessor: "pagopeestpagope.estpagopedes",
                Filter: SelectColumnFilter,
                filter: 'includes',                
            },
        ],
        []
    );
    return columns;
}
