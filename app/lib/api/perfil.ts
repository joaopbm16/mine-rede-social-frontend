import { typePerfil } from "@/app/types/types";

export async function perfilFindAll(): Promise<typePerfil[] | undefined> {
    try {
        const response = await fetch('http://localhost:3000/perfil', {
            method: 'GET',
            headers: { 'Accept': '*/*' }
        }
        )

        if (response.ok) {
            const data: typePerfil[] = await response.json()
            return data
        }

    } catch {
        alert('Erro ao consultar perfil')
        return []
    }
}

export async function perfilCreate(body: typePerfil): Promise<typePerfil | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/perfil/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }
        )

        if (response.ok) {
            const data: typePerfil = await response.json()
            return data
        }

    } catch {
        alert('Erro ao criar o perfil')
        return
    }
}

export async function perfilUpdate(id: number, body: typePerfil): Promise<typePerfil | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/perfil/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }
        )

        if (response.ok) {
            const data: typePerfil = await response.json()
            return data
        }

    } catch {
        alert('Erro ao alterar o perfil')
        return undefined
    }
}

export async function perfilDelete(id: number): Promise<typePerfil | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/perfil/${id}`, {
            method: 'DELETE',
        }
        )

        if (response.ok) {
            const data: typePerfil = await response.json()
            return data
        }

    } catch {
        alert('Erro ao excluir o perfil')
        return
    }
}