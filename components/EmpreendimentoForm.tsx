/**
 * @fileoverview Componente de formulário para criação e edição de empreendimentos
 * @module components/EmpreendimentoForm
 * @description Componente React que renderiza um formulário completo para cadastrar
 * ou editar empreendimentos, com validação de campos e feedback visual.
 * O campo de município utiliza um select com todos os 295 municípios de Santa Catarina.
 */

'use client'

import { useState, useEffect } from 'react'
import { Empreendimento, EmpreendimentoFormData, SEGMENTOS, STATUS_OPTIONS } from '@/types/empreendimento'
import type { Segmento, Status } from '@/types/empreendimento'
import { MUNICIPIOS_SC } from '@/types/municipios-sc'

/**
 * Propriedades do componente EmpreendimentoForm
 * 
 * @interface EmpreendimentoFormProps
 * @property {Empreendimento} [empreendimento] - Dados do empreendimento para edição (opcional)
 * @property {(data: EmpreendimentoFormData) => Promise<void>} onSubmit - Callback executado ao submeter o formulário
 * @property {() => void} [onCancel] - Callback executado ao cancelar a edição (opcional)
 */
interface EmpreendimentoFormProps {
  empreendimento?: Empreendimento
  onSubmit: (data: EmpreendimentoFormData) => Promise<void>
  onCancel?: () => void
}

/**
 * Componente de formulário para criação e edição de empreendimentos
 * 
 * @description Renderiza um formulário completo com todos os campos necessários para
 * cadastrar ou editar um empreendimento. Gerencia o estado do formulário, validação
 * e submissão dos dados.
 * 
 * @param {EmpreendimentoFormProps} props - Propriedades do componente
 * @returns {JSX.Element} Formulário HTML com campos de entrada
 * 
 * @example
 * ```tsx
 * <EmpreendimentoForm
 *   empreendimento={empreendimentoExistente}
 *   onSubmit={handleSubmit}
 *   onCancel={handleCancel}
 * />
 * ```
 */
export default function EmpreendimentoForm({
  empreendimento,
  onSubmit,
  onCancel,
}: EmpreendimentoFormProps) {
  const [formData, setFormData] = useState<EmpreendimentoFormData>({
    nomeEmpreendimento: empreendimento?.nomeEmpreendimento || '',
    nomeEmpreendedor: empreendimento?.nomeEmpreendedor || '',
    municipio: empreendimento?.municipio || '',
    segmento: empreendimento?.segmento || ('TECNOLOGIA' as Segmento),
    email: empreendimento?.email || '',
    status: empreendimento?.status || ('ATIVO' as Status),
  })
  /** Estado que controla se o formulário está sendo submetido */
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Handler para submissão do formulário
   * 
   * @description Previne o comportamento padrão do formulário, valida os dados,
   * chama a função onSubmit e reseta o formulário se for uma criação.
   * 
   * @param {React.FormEvent} e - Evento de submissão do formulário
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      if (!empreendimento) {
        // Reset form apenas se for criação
        setFormData({
          nomeEmpreendimento: '',
          nomeEmpreendedor: '',
          municipio: '',
          segmento: 'TECNOLOGIA' as Segmento,
          email: '',
          status: 'ATIVO' as Status,
        })
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nomeEmpreendimento" className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Empreendimento *
        </label>
        <input
          type="text"
          id="nomeEmpreendimento"
          required
          value={formData.nomeEmpreendimento}
          onChange={(e) =>
            setFormData({ ...formData, nomeEmpreendimento: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="nomeEmpreendedor" className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Empreendedor *
        </label>
        <input
          type="text"
          id="nomeEmpreendedor"
          required
          value={formData.nomeEmpreendedor}
          onChange={(e) =>
            setFormData({ ...formData, nomeEmpreendedor: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="municipio" className="block text-sm font-medium text-gray-700 mb-1">
          Município de Santa Catarina *
        </label>
        <select
          id="municipio"
          required
          value={formData.municipio}
          onChange={(e) =>
            setFormData({ ...formData, municipio: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione um município</option>
          {MUNICIPIOS_SC.map((municipio) => (
            <option key={municipio} value={municipio}>
              {municipio}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="segmento" className="block text-sm font-medium text-gray-700 mb-1">
          Segmento de Atuação *
        </label>
        <select
          id="segmento"
          required
          value={formData.segmento}
          onChange={(e) =>
            setFormData({ ...formData, segmento: e.target.value as Segmento })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SEGMENTOS.map((seg) => (
            <option key={seg.value} value={seg.value}>
              {seg.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-mail ou Meio de Contato *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status *
        </label>
        <select
          id="status"
          required
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value as Status })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Salvando...' : empreendimento ? 'Atualizar' : 'Cadastrar'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
