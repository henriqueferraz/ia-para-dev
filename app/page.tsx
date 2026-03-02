'use client'

import { useState, useEffect } from 'react'
import { Empreendimento, EmpreendimentoFormData } from '@/types/empreendimento'
import EmpreendimentoForm from '@/components/EmpreendimentoForm'
import EmpreendimentoList from '@/components/EmpreendimentoList'

export default function Home() {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEmpreendimento, setEditingEmpreendimento] =
    useState<Empreendimento | null>(null)

  // Carregar empreendimentos
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

  // Criar novo empreendimento
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

  // Atualizar empreendimento
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

  // Deletar empreendimento
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

  // Editar empreendimento
  const handleEdit = (empreendimento: Empreendimento) => {
    setEditingEmpreendimento(empreendimento)
    setShowForm(true)
  }

  const handleFormSubmit = async (data: EmpreendimentoFormData) => {
    if (editingEmpreendimento) {
      await handleUpdate(data)
    } else {
      await handleCreate(data)
    }
  }

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
