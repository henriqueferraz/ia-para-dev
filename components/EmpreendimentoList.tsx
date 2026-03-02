/**
 * @fileoverview Componente de listagem de empreendimentos
 * @module components/EmpreendimentoList
 * @description Componente React que renderiza uma grade responsiva de cards de empreendimentos.
 * Exibe uma mensagem quando não há empreendimentos cadastrados.
 */

'use client'

import { Empreendimento } from '@/types/empreendimento'
import EmpreendimentoCard from './EmpreendimentoCard'

/**
 * Propriedades do componente EmpreendimentoList
 * 
 * @interface EmpreendimentoListProps
 * @property {Empreendimento[]} empreendimentos - Array de empreendimentos a serem exibidos
 * @property {(empreendimento: Empreendimento) => void} onEdit - Callback executado ao editar um empreendimento
 * @property {(id: string) => void} onDelete - Callback executado ao deletar um empreendimento
 */
interface EmpreendimentoListProps {
  empreendimentos: Empreendimento[]
  onEdit: (empreendimento: Empreendimento) => void
  onDelete: (id: string) => void
}

/**
 * Componente de listagem de empreendimentos
 * 
 * @description Renderiza uma grade responsiva de cards de empreendimentos usando CSS Grid.
 * Adapta-se a diferentes tamanhos de tela (1 coluna em mobile, 2 em tablet, 3 em desktop).
 * Exibe uma mensagem amigável quando não há empreendimentos cadastrados.
 * 
 * @param {EmpreendimentoListProps} props - Propriedades do componente
 * @returns {JSX.Element} Grade de cards ou mensagem de lista vazia
 * 
 * @example
 * ```tsx
 * <EmpreendimentoList
 *   empreendimentos={empreendimentos}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 * ```
 */
export default function EmpreendimentoList({
  empreendimentos,
  onEdit,
  onDelete,
}: EmpreendimentoListProps) {
  if (empreendimentos.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
        <p className="text-gray-500 text-lg">
          Nenhum empreendimento cadastrado ainda.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Comece cadastrando seu primeiro empreendimento!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {empreendimentos.map((empreendimento) => (
        <EmpreendimentoCard
          key={empreendimento.id}
          empreendimento={empreendimento}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
