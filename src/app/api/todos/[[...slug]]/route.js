import { NextResponse } from 'next/server';

// A URL do seu back-end, usando o IP PRIVADO.
// O ideal é usar uma variável de ambiente para isso!
const BACKEND_URL = 'http://10.0.2.15:25000/api/todos';

// Função genérica para repassar a requisição
async function forwardRequest(request, slug) {
    const url = slug ? `${BACKEND_URL}/${slug.join('/')}` : BACKEND_URL;

    const options = {
        method: request.method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Só adiciona o body se não for GET ou DELETE
    if (request.method !== 'GET' && request.method !== 'DELETE') {
        const body = await request.json();
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error forwarding request to backend' },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    return forwardRequest(request, params.slug);
}

export async function POST(request, { params }) {
    return forwardRequest(request, params.slug);
}

export async function PUT(request, { params }) {
    return forwardRequest(request, params.slug);
}

export async function DELETE(request, { params }) {
    return forwardRequest(request, params.slug);
}