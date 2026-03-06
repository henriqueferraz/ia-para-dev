/**
 * @fileoverview Componente de card para exibição de empreendimento
 * @module components/EmpreendimentoCard
 * @description Componente React que renderiza um card visual com as informações
 * de um empreendimento, incluindo ações de edição e exclusão.
 */

'use client'

import { Empreendimento } from '@/types/empreendimento'
import { SEGMENTOS, STATUS_OPTIONS } from '@/types/empreendimento'

/**
 * Propriedades do componente EmpreendimentoCard
 * 
 * @interface EmpreendimentoCardProps
 * @property {Empreendimento} empreendimento - Dados do empreendimento a ser exibido
 * @property {(empreendimento: Empreendimento) => void} onEdit - Callback executado ao clicar em editar
 * @property {(id: string) => void} onDelete - Callback executado ao clicar em excluir
 */
interface EmpreendimentoCardProps {
  empreendimento: Empreendimento
  onEdit: (empreendimento: Empreendimento) => void
  onDelete: (id: string) => void
}

/**
 * Componente de card para exibição de empreendimento
 * 
 * @description Renderiza um card visual com todas as informações do empreendimento,
 * incluindo nome, empreendedor, município, segmento, contato e status. Possui botões
 * para edição e exclusão com confirmação.
 * 
 * @param {EmpreendimentoCardProps} props - Propriedades do componente
 * @returns {JSX.Element} Card HTML com informações do empreendimento
 * 
 * @example
 * ```tsx
 * <EmpreendimentoCard
 *   empreendimento={empreendimento}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 * ```
 */
export default function EmpreendimentoCard({
  empreendimento,
  onEdit,
  onDelete,
}: EmpreendimentoCardProps) {
  const segmentoLabel =
    SEGMENTOS.find((s) => s.value === empreendimento.segmento)?.label ||
    empreendimento.segmento

  const statusLabel =
    STATUS_OPTIONS.find((s) => s.value === empreendimento.status)?.label ||
    empreendimento.status

  const statusColor =
    empreendimento.status === 'ATIVO'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {empreendimento.nomeEmpreendimento}
          </h3>
          <p className="text-gray-600 text-sm">
            Empreendedor: <span className="font-medium">{empreendimento.nomeEmpreendedor}</span>
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Município:</span>
          {empreendimento.municipio}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Segmento:</span>
          {segmentoLabel}
        </div>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">E-mail:</span>
            <a
              href={`mailto:${empreendimento.email}`}
              className="text-blue-600 hover:underline"
            >
              {empreendimento.email}
            </a>
          </div>
          {empreendimento.telefone && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-2">Telefone:</span>
              <a
                href={`tel:${empreendimento.telefone.replace(/\D/g, '')}`}
                className="text-blue-600 hover:underline"
              >
                {empreendimento.telefone}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(empreendimento)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
        >
          Editar
        </button>
        <button
          onClick={() => {
            if (confirm('Tem certeza que deseja excluir este empreendimento?')) {
              onDelete(empreendimento.id)
            }
          }}
          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
        >
          Excluir
        </button>
      </div>
    </div>
  )
}
