import { useMemo } from 'react';
import { SelectColumnFilter } from '../../components/Tabla/SelectColumnFilter';


export default function horarioColumns() {
    const columns = useMemo(
        () => [
            {
                Header: "Dia",
                accessor: "hordia",
                Filter: SelectColumnFilter,
                filter: 'includes',            
            },
            {
                Header: "Hora de Inicio",
                accessor: "horini",     
            },
            {
                Header: "Hora de Fin",
                accessor: "horfin",            
            },
            {
                Header: "Colaboradores",
                accessor: "horcolcod",
                Cell: ({ row }) => {
                    const colaboradores = row.values.horcolcod.map(colaborador => `${colaborador.colnom} ${colaborador.colape}`).join(", ");
                    return colaboradores;
                },  
            }
        ],
        []
    );
    return columns;
}