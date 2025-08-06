
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