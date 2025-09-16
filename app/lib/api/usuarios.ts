import { typeUsuarios } from "@/app/types/types"

export async function usuarioFindAll(): Promise<typeUsuarios[] | undefined> {
    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'GET',
            headers: { 'Accept': '*/*' }
        }
        )

        if (response.ok) {
            const data: typeUsuarios[] = await response.json()
            return data
        }

    } catch {
        alert('Erro ao consultar usuário')
        return []
    }
}

export async function usuarioFindOneByEmailPass(
    email: string,
    pass: string
): Promise<typeUsuarios | undefined> {
    try {
        const response = await fetch(
            `http://localhost:3000/usuarios/${email}/${pass}`,
            {
                method: "GET",
            }
        );

        if (response.ok) {
            const data: typeUsuarios = await response.json();
            return data;
        }
    } catch {
        return;
    }
}

export async function usuarioCreate(body: typeUsuarios): Promise<typeUsuarios | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }
        )

        if (response.ok) {
            const data: typeUsuarios = await response.json()
            return data
        }

    } catch {
        alert('Erro ao criar o usuário')
        return
    }
}

export async function usuarioUpdate(id: number, body: typeUsuarios): Promise<typeUsuarios | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }
        )

        if (response.ok) {
            const data: typeUsuarios = await response.json()
            return data
        }

    } catch {
        alert('Erro ao alterar o usuário')
        return undefined
    }
}

export async function usuarioDelete(id: number): Promise<typeUsuarios | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'DELETE',
        }
        )

        if (response.ok) {
            const data: typeUsuarios = await response.json()
            return data
        }

    } catch {
        alert('Erro ao excluir o usuário')
        return
    }
}