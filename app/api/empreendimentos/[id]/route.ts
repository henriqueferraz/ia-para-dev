/**
 * @fileoverview Rotas da API para operações em empreendimentos específicos
 * @module app/api/empreendimentos/[id]/route
 * @description Este módulo contém os handlers HTTP para buscar, atualizar e deletar
 * um empreendimento específico identificado por seu ID.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Segmento, Status } from '@/types/empreendimento'
import { MUNICIPIOS_SC } from '@/types/municipios-sc'

/**
 * Handler GET para buscar um empreendimento específico por ID
 * 
 * @description Retorna os dados de um empreendimento específico identificado pelo parâmetro de rota.
 * 
 * @route GET /api/empreendimentos/[id]
 * @param {NextRequest} request - Objeto de requisição HTTP
 * @param {Object} context - Contexto da rota contendo os parâmetros dinâmicos
 * @param {Promise<{id: string}>} context.params - Parâmetros da rota dinâmica
 * @returns {Promise<NextResponse>} Resposta JSON com o empreendimento ou erro
 * 
 * @example
 * ```typescript
 * // Requisição
 * GET /api/empreendimentos/clx1234567890
 * 
 * // Resposta de sucesso (200)
 * {
 *   id: "clx1234567890",
 *   nomeEmpreendimento: "Tech Startup",
 *   // ...
 * }
 * 
 * // Resposta de erro - não encontrado (404)
 * { error: "Empreendimento não encontrado" }
 * ```
 */
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

/**
 * Handler PUT para atualizar um empreendimento existente
 * 
 * @description Atualiza os dados de um empreendimento existente identificado pelo ID.
 * Valida todos os campos obrigatórios e os valores de segmento e status antes de atualizar.
 * 
 * @route PUT /api/empreendimentos/[id]
 * @param {NextRequest} request - Objeto de requisição contendo os dados atualizados no body
 * @param {Object} context - Contexto da rota contendo os parâmetros dinâmicos
 * @param {Promise<{id: string}>} context.params - Parâmetros da rota dinâmica
 * @returns {Promise<NextResponse>} Resposta JSON com o empreendimento atualizado ou erro
 * 
 * @example
 * ```typescript
 * // Requisição
 * PUT /api/empreendimentos/clx1234567890
 * Content-Type: application/json
 * 
 * {
 *   "nomeEmpreendimento": "Tech Startup Atualizado",
 *   "nomeEmpreendedor": "João Silva",
 *   "municipio": "Florianópolis",
 *   "segmento": "TECNOLOGIA",
 *   "email": "novo@techstartup.com",
 *   "status": "ATIVO"
 * }
 * 
 * // Resposta de sucesso (200)
 * {
 *   id: "clx1234567890",
 *   nomeEmpreendimento: "Tech Startup Atualizado",
 *   // ...
 * }
 * ```
 */
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

    // Validação do município
    if (!MUNICIPIOS_SC.includes(municipio as any)) {
      return NextResponse.json(
        { error: 'Município inválido. Selecione um município válido de Santa Catarina.' },
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

/**
 * Handler DELETE para remover um empreendimento
 * 
 * @description Remove permanentemente um empreendimento do banco de dados identificado pelo ID.
 * 
 * @route DELETE /api/empreendimentos/[id]
 * @param {NextRequest} request - Objeto de requisição HTTP
 * @param {Object} context - Contexto da rota contendo os parâmetros dinâmicos
 * @param {Promise<{id: string}>} context.params - Parâmetros da rota dinâmica
 * @returns {Promise<NextResponse>} Resposta JSON com mensagem de sucesso ou erro
 * 
 * @example
 * ```typescript
 * // Requisição
 * DELETE /api/empreendimentos/clx1234567890
 * 
 * // Resposta de sucesso (200)
 * { message: "Empreendimento deletado com sucesso" }
 * 
 * // Resposta de erro (500)
 * { error: "Erro ao deletar empreendimento" }
 * ```
 */
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
