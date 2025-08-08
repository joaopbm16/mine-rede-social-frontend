
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
            method: 'PATCH'
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