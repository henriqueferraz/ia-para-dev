import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Segmento, Status } from '@/types/empreendimento'

// GET - Listar todos os empreendimentos
export async function GET() {
  try {
    const empreendimentos = await prisma.empreendimento.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(empreendimentos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar empreendimentos' },
      { status: 500 }
    )
  }
}

// POST - Criar novo empreendimento
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      nomeEmpreendimento,
      nomeEmpreendedor,
      municipio,
      segmento,
      email,
      status,
    } = body

    // Validação dos campos obrigatórios
    if (
      !nomeEmpreendimento ||
      !nomeEmpreendedor ||
      !municipio ||
      !segmento ||
      !email
    ) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    // Validação do enum Segmento
    const segmentosValidos: Segmento[] = ['TECNOLOGIA', 'COMERCIO', 'INDUSTRIA', 'SERVICOS', 'AGRONEGOCIO']
    if (!segmentosValidos.includes(segmento)) {
      return NextResponse.json(
        { error: 'Segmento inválido' },
        { status: 400 }
      )
    }

    // Validação do enum Status
    const statusValidos: Status[] = ['ATIVO', 'INATIVO']
    const statusFinal = status && statusValidos.includes(status) 
      ? status 
      : 'ATIVO' as Status

    const empreendimento = await prisma.empreendimento.create({
      data: {
        nomeEmpreendimento,
        nomeEmpreendedor,
        municipio,
        segmento,
        email,
        status: statusFinal,
      },
    })

    return NextResponse.json(empreendimento, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar empreendimento' },
      { status: 500 }
    )
  }
}
