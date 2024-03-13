import React, { useEffect, forwardRef, useRef } from "react";


// Componente IndeterminateCheckbox: Un componente de casilla de verificación con estado indeterminado.
// Props:
//   - indeterminate: Indica si la casilla de verificación debe estar en un estado indeterminado.
//   - ref: Referencia al elemento de entrada (opcional).
//   - rest: Resto de las propiedades del componente de entrada.
const IndeterminateCheckbox = forwardRef(

  ({ indeterminate, ...rest }, ref) => {
    
    // Crear una referencia por defecto si no se proporciona una.
    const defaultRef = useRef();
    
    // Utilizar la referencia proporcionada o la referencia por defecto.
    const resolvedRef = ref || defaultRef;

    // Actualizar el estado indeterminado del elemento de entrada.
    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
  
    // Renderizar un componente de entrada de tipo checkbox.
    return (
      <input type="checkbox" ref={resolvedRef} {...rest} />      
    );
  }
);

export { IndeterminateCheckbox };