import { typePostagem } from "@/app/types/types"

export async function postagensFindAll(): Promise<typePostagem[] | undefined> {
    try {
        const response = await fetch('http://localhost:3000/postagens', {
            method: 'GET',
            headers: { 'Accept': '*/*' }
        }
        )

        if (response.ok) {
            const data: typePostagem[] = await response.json()
            return data
        }

    } catch {
        alert('Erro ao consultar mensagens')
        return []
    }
}

export async function postagensCreate(body: typePostagem): Promise<typePostagem | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/postagens/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }
        )

        if (response.ok) {
            const data: typePostagem = await response.json()
            return data
        }

    } catch {
        alert('Erro ao postar mensagem')
        return
    }
}