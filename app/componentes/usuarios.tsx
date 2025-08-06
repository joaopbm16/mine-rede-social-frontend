'use client'

import { useEffect, useState } from "react"
import { usuarioFindAll } from "../lib/api/usuarios"

const Usuarios = ()=> {
    const [usuarios, setUsuarios] = useState<any[]>([])

    useEffect(()=> {
        const fetchBuscaUsuario = async() => {
            const response  = await usuarioFindAll();
            if (response) {
               console.log(response);
            }else{ 
                return[];
            }

        };

        fetchBuscaUsuario
    },[]);

    return (
        'Usuarios'
    )
}

export default Usuarios