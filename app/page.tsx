/**
 * @fileoverview Página principal da aplicação de gerenciamento de empreendimentos
 * @module app/page
 * @description Componente principal que gerencia o estado da aplicação e coordena
 * todas as operações CRUD através de chamadas à API.
 */

'use client'

import { useState, useEffect } from 'react'
import { Empreendimento, EmpreendimentoFormData } from '@/types/empreendimento'
import EmpreendimentoForm from '@/components/EmpreendimentoForm'
import EmpreendimentoList from '@/components/EmpreendimentoList'

/**
 * Componente da página principal (Home)
 * 
 * @description Gerencia todo o estado da aplicação, incluindo a lista de empreendimentos,
 * controle de exibição do formulário, estado de carregamento e operações CRUD.
 * Coordena a comunicação entre os componentes e a API.
 * 
 * @returns {JSX.Element} Página principal com header, formulário e lista de empreendimentos
 * 
 * @example
 * ```tsx
 * // Este componente é renderizado automaticamente pelo Next.js na rota "/"
 * ```
 */
export default function Home() {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEmpreendimento, setEditingEmpreendimento] =
    useState<Empreendimento | null>(null)

  /**
   * Carrega todos os empreendimentos da API
   * 
   * @description Faz uma requisição GET para a API e atualiza o estado local
   * com os empreendimentos retornados. Gerencia o estado de carregamento.
   * 
   * @returns {Promise<void>}
   * @private
   */
  const fetchEmpreendimentos = async () => {
    try {
      const response = await fetch('/api/empreendimentos')
      if (response.ok) {
        const data = await response.json()
        setEmpreendimentos(data)
      }
    } catch (error) {
      console.error('Erro ao carregar empreendimentos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmpreendimentos()
  }, [])

  /**
   * Cria um novo empreendimento
   * 
   * @description Envia uma requisição POST para a API com os dados do novo empreendimento.
   * Após sucesso, recarrega a lista e oculta o formulário.
   * 
   * @param {EmpreendimentoFormData} data - Dados do empreendimento a ser criado
   * @returns {Promise<void>}
   */
  const handleCreate = async (data: EmpreendimentoFormData) => {
    try {
      const response = await fetch('/api/empreendimentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await fetchEmpreendimentos()
        setShowForm(false)
        alert('Empreendimento cadastrado com sucesso!')
      } else {
        const error = await response.json()
        alert(`Erro: ${error.error}`)
      }
    } catch (error) {
      console.error('Erro ao criar empreendimento:', error)
      alert('Erro ao cadastrar empreendimento')
    }
  }

  /**
   * Atualiza um empreendimento existente
   * 
   * @description Envia uma requisição PUT para a API com os dados atualizados.
   * Após sucesso, recarrega a lista e limpa o estado de edição.
   * 
   * @param {EmpreendimentoFormData} data - Dados atualizados do empreendimento
   * @returns {Promise<void>}
   */
  const handleUpdate = async (data: EmpreendimentoFormData) => {
    if (!editingEmpreendimento) return

    try {
      const response = await fetch(
        `/api/empreendimentos/${editingEmpreendimento.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (response.ok) {
        await fetchEmpreendimentos()
        setEditingEmpreendimento(null)
        setShowForm(false)
        alert('Empreendimento atualizado com sucesso!')
      } else {
        const error = await response.json()
        alert(`Erro: ${error.error}`)
      }
    } catch (error) {
      console.error('Erro ao atualizar empreendimento:', error)
      alert('Erro ao atualizar empreendimento')
    }
  }

  /**
   * Remove um empreendimento
   * 
   * @description Envia uma requisição DELETE para a API. Após sucesso, recarrega a lista.
   * 
   * @param {string} id - ID do empreendimento a ser removido
   * @returns {Promise<void>}
   */
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/empreendimentos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchEmpreendimentos()
        alert('Empreendimento excluído com sucesso!')
      } else {
        const error = await response.json()
        alert(`Erro: ${error.error}`)
      }
    } catch (error) {
      console.error('Erro ao deletar empreendimento:', error)
      alert('Erro ao excluir empreendimento')
    }
  }

  /**
   * Inicia o modo de edição de um empreendimento
   * 
   * @description Define o empreendimento a ser editado e exibe o formulário.
   * 
   * @param {Empreendimento} empreendimento - Empreendimento a ser editado
   */
  const handleEdit = (empreendimento: Empreendimento) => {
    setEditingEmpreendimento(empreendimento)
    setShowForm(true)
  }

  /**
   * Handler unificado para submissão do formulário
   * 
   * @description Decide se deve criar ou atualizar baseado no estado de edição.
   * 
   * @param {EmpreendimentoFormData} data - Dados do formulário
   * @returns {Promise<void>}
   */
  const handleFormSubmit = async (data: EmpreendimentoFormData) => {
    if (editingEmpreendimento) {
      await handleUpdate(data)
    } else {
      await handleCreate(data)
    }
  }

  /**
   * Cancela a edição e oculta o formulário
   * 
   * @description Limpa o estado de edição e oculta o formulário.
   */
  const handleCancel = () => {
    setShowForm(false)
    setEditingEmpreendimento(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Empreendimentos em Santa Catarina
          </h1>
          <p className="text-gray-600">
            Sistema de gerenciamento de empreendimentos catarinenses
          </p>
        </header>

        {/* Botão de adicionar */}
        {!showForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-md"
            >
              + Novo Empreendimento
            </button>
          </div>
        )}

        {/* Formulário */}
        {showForm && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {editingEmpreendimento
                ? 'Editar Empreendimento'
                : 'Cadastrar Novo Empreendimento'}
            </h2>
            <EmpreendimentoForm
              empreendimento={editingEmpreendimento || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Lista de empreendimentos */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Carregando empreendimentos...</p>
          </div>
        ) : (
          <EmpreendimentoList
            empreendimentos={empreendimentos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}
