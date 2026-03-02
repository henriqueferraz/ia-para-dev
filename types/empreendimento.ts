export type Segmento = 'TECNOLOGIA' | 'COMERCIO' | 'INDUSTRIA' | 'SERVICOS' | 'AGRONEGOCIO'
export type Status = 'ATIVO' | 'INATIVO'

export interface Empreendimento {
  id: string
  nomeEmpreendimento: string
  nomeEmpreendedor: string
  municipio: string
  segmento: Segmento
  email: string
  status: Status
  createdAt: string
  updatedAt: string
}

export interface EmpreendimentoFormData {
  nomeEmpreendimento: string
  nomeEmpreendedor: string
  municipio: string
  segmento: Segmento
  email: string
  status: Status
}

export const SEGMENTOS = [
  { value: 'TECNOLOGIA', label: 'Tecnologia' },
  { value: 'COMERCIO', label: 'Comércio' },
  { value: 'INDUSTRIA', label: 'Indústria' },
  { value: 'SERVICOS', label: 'Serviços' },
  { value: 'AGRONEGOCIO', label: 'Agronegócio' },
] as const

export const STATUS_OPTIONS = [
  { value: 'ATIVO', label: 'Ativo' },
  { value: 'INATIVO', label: 'Inativo' },
] as const
