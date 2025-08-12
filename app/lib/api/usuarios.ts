
export async function usuarioFindAll(): Promise<any> {
    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'GET'
        })

        if (response.ok) {
            const data = await response.json();
            return data
        }
    } catch {
        alert('Erro ao buscar usuários')
        return []
    }
}

export async function usuarioUpdate(id: number, body: any): Promise<any> {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data = await response.json();
            return data
        }
    } catch {
        alert('Erro ao buscar usuários')
        return []
    }
}

export async function usuarioDelete(id: number): Promise<any> {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'DELETE',

        });

        if (response.ok) {
            const data = await response.json();
            return data
        }
    } catch {
        alert('Erro ao alterar usuários')
        return []
    }
}

export async function usuarioCreate(body: any): Promise<any> {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const data = await response.json();
            return data
        }
    } catch {
        alert('Erro ao alterar usuários')
        return []
    }
}