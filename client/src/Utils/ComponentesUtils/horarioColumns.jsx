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
        ],
        []
    );
    return columns;
}