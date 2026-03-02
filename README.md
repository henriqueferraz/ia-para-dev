# Sistema de Gerenciamento de Empreendimentos em Santa Catarina

## 📋 Descrição

Sistema CRUD (Create, Read, Update, Delete) desenvolvido para gerenciar informações sobre empreendimentos e seus responsáveis no estado de Santa Catarina. A aplicação permite o cadastro, consulta, edição e remoção de dados de forma estruturada, servindo como um protótipo de sistema para apoiar a organização de informações sobre empreendimentos catarinenses.

A solução foi desenvolvida utilizando Next.js com TypeScript, proporcionando uma experiência moderna tanto no front-end quanto no back-end através de API Routes integradas.

## 🚀 Tecnologias Utilizadas

- **Next.js 16.1.6** - Framework React para desenvolvimento full-stack
- **React 19.2.3** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5** - Superset JavaScript com tipagem estática
- **Prisma 5.22.0** - ORM moderno para gerenciamento de banco de dados
- **SQLite** - Banco de dados relacional leve e eficiente
- **Tailwind CSS 4** - Framework CSS utilitário para estilização
- **Node.js** - Ambiente de execução JavaScript

## 📁 Estrutura do Projeto

```
.
├── app/
│   ├── api/
│   │   └── empreendimentos/
│   │       ├── route.ts              # Rotas GET e POST para listar e criar
│   │       └── [id]/
│   │           └── route.ts          # Rotas GET, PUT e DELETE para operações específicas
│   ├── layout.tsx                    # Layout principal da aplicação
│   ├── page.tsx                      # Página principal com lógica CRUD
│   └── globals.css                   # Estilos globais
├── components/
│   ├── EmpreendimentoCard.tsx        # Componente de card para exibir empreendimento
│   ├── EmpreendimentoForm.tsx        # Componente de formulário para criar/editar
│   └── EmpreendimentoList.tsx        # Componente de listagem de empreendimentos
├── lib/
│   └── prisma.ts                     # Configuração e instância do Prisma Client
├── prisma/
│   ├── migrations/                   # Migrações do banco de dados
│   ├── schema.prisma                 # Schema do banco de dados
│   └── dev.db                        # Banco de dados SQLite
├── types/
│   └── empreendimento.ts             # Tipos TypeScript para Empreendimento
├── public/                           # Arquivos estáticos
├── .env                              # Variáveis de ambiente
├── .env.example                      # Exemplo de variáveis de ambiente
├── .gitignore                        # Arquivos ignorados pelo Git
├── package.json                      # Dependências do projeto
├── tsconfig.json                     # Configuração do TypeScript
├── next.config.ts                    # Configuração do Next.js
├── eslint.config.mjs                 # Configuração do ESLint
└── README.md                         # Documentação do projeto
```

## 🎯 Funcionalidades

### Campos do Empreendimento

- **Nome do Empreendimento** (obrigatório)
- **Nome do Empreendedor** (obrigatório)
- **Município de Santa Catarina** (obrigatório)
- **Segmento de Atuação** (obrigatório):
  - Tecnologia
  - Comércio
  - Indústria
  - Serviços
  - Agronegócio
- **E-mail ou Meio de Contato** (obrigatório)
- **Status** (ativo ou inativo)

### Operações CRUD

- ✅ **Create**: Cadastro de novos empreendimentos através de formulário
- ✅ **Read**: Listagem de todos os empreendimentos cadastrados
- ✅ **Update**: Edição de informações de empreendimentos existentes
- ✅ **Delete**: Remoção de empreendimentos com confirmação

## 🛠️ Instruções de Execução

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

### Passo a Passo

1. **Clone o repositório** (ou navegue até a pasta do projeto):
   ```bash
   # O projeto está na raiz do repositório
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o banco de dados**:
   O arquivo `.env` já está configurado com `DATABASE_URL="file:./dev.db"`. Se necessário, você pode ajustar esta configuração.

4. **Execute as migrações do banco de dados**:
   ```bash
   npx prisma migrate dev
   ```

5. **Gere o Prisma Client** (se necessário):
   ```bash
   npx prisma generate
   ```

6. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

7. **Acesse a aplicação**:
   Abra seu navegador em [http://localhost:3000](http://localhost:3000)

### Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint
- `npx prisma studio` - Abre interface visual para o banco de dados

## 📝 API Endpoints

A aplicação expõe os seguintes endpoints REST:

- `GET /api/empreendimentos` - Lista todos os empreendimentos
- `POST /api/empreendimentos` - Cria um novo empreendimento
- `GET /api/empreendimentos/[id]` - Busca um empreendimento específico
- `PUT /api/empreendimentos/[id]` - Atualiza um empreendimento
- `DELETE /api/empreendimentos/[id]` - Remove um empreendimento

## 🎨 Interface

A interface foi desenvolvida com foco em usabilidade e design moderno, utilizando Tailwind CSS para estilização responsiva. A aplicação é totalmente funcional em dispositivos desktop, tablet e mobile. A interface apresenta um design limpo e intuitivo, com formulários bem estruturados, cards informativos para cada empreendimento e feedback visual claro para todas as ações do usuário. A experiência do usuário foi priorizada, garantindo que todas as operações sejam simples e diretas.

## 📊 Banco de Dados

O banco de dados SQLite é criado automaticamente na primeira execução das migrações. O arquivo `dev.db` será gerado na pasta `prisma/`. O banco de dados utiliza o Prisma ORM para gerenciamento de dados, garantindo type-safety e facilitando as operações CRUD. Para visualizar os dados de forma visual, você pode usar o Prisma Studio:

```bash
npx prisma studio
```

## 🔒 Observações de Segurança

- Esta é uma aplicação de protótipo desenvolvida para fins de avaliação
- Não há implementação de autenticação de usuários
- O banco de dados SQLite é adequado para desenvolvimento e testes
- Para produção, recomenda-se migrar para PostgreSQL ou MySQL e implementar autenticação adequada

## 📄 Licença

Este projeto foi desenvolvido como parte do processo seletivo para a trilha IA para DEVs do programa SCTEC.

## 👤 Autor

Desenvolvido como desafio prático para avaliação técnica no processo seletivo.

---

**Nota**: Este sistema foi desenvolvido seguindo as especificações do desafio prático, implementando todas as funcionalidades obrigatórias de forma funcional e bem estruturada.
