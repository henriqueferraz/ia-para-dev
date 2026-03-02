'use client'

import { Empreendimento } from '@/types/empreendimento'
import EmpreendimentoCard from './EmpreendimentoCard'

interface EmpreendimentoListProps {
  empreendimentos: Empreendimento[]
  onEdit: (empreendimento: Empreendimento) => void
  onDelete: (id: string) => void
}

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
