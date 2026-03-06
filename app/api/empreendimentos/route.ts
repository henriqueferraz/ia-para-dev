/**
 * @fileoverview Rotas da API para operações CRUD de empreendimentos
 * @module app/api/empreendimentos/route
 * @description Este módulo contém os handlers HTTP para listar e criar empreendimentos.
 * Implementa os métodos GET (listar todos) e POST (criar novo).
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Segmento, Status } from '@/types/empreendimento'
import { MUNICIPIOS_SC } from '@/types/municipios-sc'

/**
 * Handler GET para listar todos os empreendimentos cadastrados
 * 
 * @description Retorna uma lista de todos os empreendimentos ordenados por data de criação (mais recentes primeiro).
 * 
 * @route GET /api/empreendimentos
 * @returns {Promise<NextResponse>} Resposta JSON com array de empreendimentos ou erro
 * 
 * @example
 * ```typescript
 * // Requisição
 * GET /api/empreendimentos
 * 
 * // Resposta de sucesso (200)
 * [
 *   {
 *     id: "clx...",
 *     nomeEmpreendimento: "Tech Startup",
 *     nomeEmpreendedor: "João Silva",
 *     // ...
 *   }
 * ]
 * 
 * // Resposta de erro (500)
 * { error: "Erro ao buscar empreendimentos" }
 * ```
 */
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

/**
 * Handler POST para criar um novo empreendimento
 * 
 * @description Cria um novo empreendimento no banco de dados após validar todos os campos obrigatórios.
 * Valida os campos obrigatórios, segmento e status antes de criar o registro.
 * 
 * @route POST /api/empreendimentos
 * @param {NextRequest} request - Objeto de requisição contendo os dados do empreendimento no body
 * @returns {Promise<NextResponse>} Resposta JSON com o empreendimento criado ou erro
 * 
 * @example
 * ```typescript
 * // Requisição
 * POST /api/empreendimentos
 * Content-Type: application/json
 * 
 * {
 *   "nomeEmpreendimento": "Tech Startup",
 *   "nomeEmpreendedor": "João Silva",
 *   "municipio": "Florianópolis",
 *   "segmento": "TECNOLOGIA",
 *   "email": "contato@techstartup.com",
 *   "status": "ATIVO"
 * }
 * 
 * // Resposta de sucesso (201)
 * {
 *   id: "clx...",
 *   nomeEmpreendimento: "Tech Startup",
 *   // ...
 * }
 * 
 * // Resposta de erro - campos obrigatórios (400)
 * { error: "Todos os campos obrigatórios devem ser preenchidos" }
 * 
 * // Resposta de erro - segmento inválido (400)
 * { error: "Segmento inválido" }
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      nomeEmpreendimento,
      nomeEmpreendedor,
      municipio,
      segmento,
      email,
      telefone,
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

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido' },
        { status: 400 }
      )
    }

    // Validação do telefone (se fornecido)
    let telefoneValidado = null
    if (telefone && telefone.trim()) {
      const telefoneNumbers = telefone.replace(/\D/g, '')
      if (telefoneNumbers.length < 10 || telefoneNumbers.length > 11) {
        return NextResponse.json(
          { error: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX' },
          { status: 400 }
        )
      }
      telefoneValidado = telefone.trim()
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
        telefone: telefoneValidado,
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
