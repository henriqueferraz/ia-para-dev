/**
 * @fileoverview Configuração e instância singleton do Prisma Client
 * @module lib/prisma
 * @description Este módulo exporta uma instância única do Prisma Client,
 * garantindo que apenas uma conexão seja criada durante o ciclo de vida da aplicação.
 * Utiliza um padrão singleton para evitar múltiplas instâncias em desenvolvimento.
 */

import { PrismaClient } from '@prisma/client'

/**
 * Tipo auxiliar para armazenar a instância do Prisma Client no escopo global
 * durante o desenvolvimento para evitar múltiplas conexões durante hot-reload
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Instância singleton do Prisma Client
 * 
 * @description Esta instância é compartilhada em toda a aplicação.
 * Em desenvolvimento, a instância é armazenada no escopo global para evitar
 * múltiplas conexões durante o hot-reload do Next.js.
 * 
 * @example
 * ```typescript
 * import { prisma } from '@/lib/prisma'
 * 
 * const empreendimentos = await prisma.empreendimento.findMany()
 * ```
 * 
 * @type {PrismaClient}
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// Armazena a instância no escopo global apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
