import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Segmento, Status } from '@/types/empreendimento'

// GET - Buscar um empreendimento específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const empreendimento = await prisma.empreendimento.findUnique({
      where: { id },
    })

    if (!empreendimento) {
      return NextResponse.json(
        { error: 'Empreendimento não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(empreendimento)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar empreendimento' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar um empreendimento
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
    if (status && !statusValidos.includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      )
    }

    const empreendimento = await prisma.empreendimento.update({
      where: { id },
      data: {
        nomeEmpreendimento,
        nomeEmpreendedor,
        municipio,
        segmento,
        email,
        status: status || ('ATIVO' as Status),
      },
    })

    return NextResponse.json(empreendimento)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar empreendimento' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar um empreendimento
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.empreendimento.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Empreendimento deletado com sucesso' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar empreendimento' },
      { status: 500 }
    )
  }
}
