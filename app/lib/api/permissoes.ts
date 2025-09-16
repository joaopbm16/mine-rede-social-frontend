import { typePermissoes } from "@/app/types/types"

export async function permissoesFindAll(): Promise<typePermissoes[] | undefined> {
    try {
        const response = await fetch('http://localhost:3000/crud', {
            method: 'GET',
            headers: { 'Accept': '*/*' }
        }
        )

        if (response.ok) {
            const data: typePermissoes[] = await response.json()
            return data
        }

    } catch {
        alert('Erro ao consultar permissões')
        return []
    }
}

export async function permissoesCreate(body: typePermissoes): Promise<typePermissoes | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/crud/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }
        )

        if (response.ok) {
            const data: typePermissoes = await response.json()
            return data
        }

    } catch {
        alert('Erro ao criar permissões')
        return
    }
}

export async function permissoesUpdate(id: number, body: typePermissoes): Promise<typePermissoes | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/crud/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }
        )

        if (response.ok) {
            const data: typePermissoes = await response.json()
            return data
        }

    } catch {
        alert('Erro ao alterar permissões')
        return undefined
    }
}

export async function permissoesDelete(id: number): Promise<typePermissoes | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/crud/${id}`, {
            method: 'DELETE',
        }
        )

        if (response.ok) {
            const data: typePermissoes = await response.json()
            return data
        }

    } catch {
        alert('Erro ao excluir permissões')
        return
    }
}