/**
 * @fileoverview Definições de tipos TypeScript para o sistema de empreendimentos
 * @module types/empreendimento
 * @description Este módulo contém todas as definições de tipos, interfaces e constantes
 * relacionadas aos empreendimentos do sistema.
 */

/**
 * Segmentos de atuação disponíveis para empreendimentos
 * 
 * @typedef {('TECNOLOGIA' | 'COMERCIO' | 'INDUSTRIA' | 'SERVICOS' | 'AGRONEGOCIO')} Segmento
 */
export type Segmento = 'TECNOLOGIA' | 'COMERCIO' | 'INDUSTRIA' | 'SERVICOS' | 'AGRONEGOCIO'

/**
 * Status de operação do empreendimento
 * 
 * @typedef {('ATIVO' | 'INATIVO')} Status
 */
export type Status = 'ATIVO' | 'INATIVO'

/**
 * Interface que representa um empreendimento completo no sistema
 * 
 * @interface Empreendimento
 * @property {string} id - Identificador único do empreendimento (CUID)
 * @property {string} nomeEmpreendimento - Nome do empreendimento
 * @property {string} nomeEmpreendedor - Nome do responsável pelo empreendimento
 * @property {string} municipio - Município de Santa Catarina onde está localizado
 * @property {Segmento} segmento - Segmento de atuação do empreendimento
 * @property {string} email - E-mail de contato (obrigatório)
 * @property {string} [telefone] - Telefone de contato no formato (XX) XXXXX-XXXX (opcional)
 * @property {Status} status - Status atual do empreendimento (ativo ou inativo)
 * @property {string} createdAt - Data e hora de criação (ISO 8601)
 * @property {string} updatedAt - Data e hora da última atualização (ISO 8601)
 */
export interface Empreendimento {
  id: string
  nomeEmpreendimento: string
  nomeEmpreendedor: string
  municipio: string
  segmento: Segmento
  email: string
  telefone?: string | null
  status: Status
  createdAt: string
  updatedAt: string
}

/**
 * Interface para dados do formulário de criação/edição de empreendimento
 * 
 * @interface EmpreendimentoFormData
 * @property {string} nomeEmpreendimento - Nome do empreendimento (obrigatório)
 * @property {string} nomeEmpreendedor - Nome do responsável (obrigatório)
 * @property {string} municipio - Município de Santa Catarina (obrigatório)
 * @property {Segmento} segmento - Segmento de atuação (obrigatório)
 * @property {string} email - E-mail de contato (obrigatório, validado)
 * @property {string} [telefone] - Telefone de contato no formato (XX) XXXXX-XXXX (opcional, validado)
 * @property {Status} status - Status do empreendimento
 */
export interface EmpreendimentoFormData {
  nomeEmpreendimento: string
  nomeEmpreendedor: string
  municipio: string
  segmento: Segmento
  email: string
  telefone?: string
  status: Status
}

/**
 * Opções de segmentos disponíveis para seleção em formulários
 * 
 * @constant {readonly Array<{value: Segmento, label: string}>}
 * @example
 * ```typescript
 * SEGMENTOS.forEach(seg => {
 *   console.log(`${seg.value}: ${seg.label}`)
 * })
 * ```
 */
export const SEGMENTOS = [
  { value: 'TECNOLOGIA', label: 'Tecnologia' },
  { value: 'COMERCIO', label: 'Comércio' },
  { value: 'INDUSTRIA', label: 'Indústria' },
  { value: 'SERVICOS', label: 'Serviços' },
  { value: 'AGRONEGOCIO', label: 'Agronegócio' },
] as const

/**
 * Opções de status disponíveis para seleção em formulários
 * 
 * @constant {readonly Array<{value: Status, label: string}>}
 */
export const STATUS_OPTIONS = [
  { value: 'ATIVO', label: 'Ativo' },
  { value: 'INATIVO', label: 'Inativo' },
] as const
