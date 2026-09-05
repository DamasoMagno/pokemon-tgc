# Documentação Técnica — Pokemon TCG

## Visão Geral

**Nome do projeto:** Pokemon TCG  
**Propósito:** disponibilizar uma interface web para consulta de cartas Pokémon e gerenciamento de favoritos.  
**Função principal:** consumir dados da API Pokémon TCG, permitir busca e ordenação de cartas, exibir detalhes em modal e persistir favoritos em modo offline (Local Storage) ou online (Supabase), conforme estado de autenticação do usuário.

## Stack Tecnológica

### Linguagens
- TypeScript
- JavaScript
- CSS (incluindo módulos CSS)

### Frameworks e bibliotecas principais
- **Front-end:** React 18
- **Roteamento:** React Router DOM
- **Gerenciamento de estado assíncrono/cache:** TanStack React Query
- **Gerenciamento de estado global:** Zustand
- **HTTP client:** Axios
- **Notificações:** react-hot-toast
- **Ícones:** lucide-react

### Banco(s) de dados
- **Supabase (PostgreSQL gerenciado):** persistência online da tabela de favoritos (`favorite`)
- **Local Storage (navegador):** persistência offline de favoritos para usuários não autenticados

### Build, versionamento e infraestrutura
- **Build tool / bundler:** Vite
- **Compilação TypeScript:** `tsc`
- **Linting:** ESLint
- **Versionamento:** Git (repositório GitHub)
- **Infraestrutura de hospedagem:** Vercel (configuração de rewrite em `vercel.json`)

## Integrações Externas

- **Pokémon TCG API (`https://api.pokemontcg.io/v2`)**  
  Fonte principal dos dados de cartas (listagem, busca, ordenação e detalhes).

- **Supabase (`https://ndprdrbfcmmgrbsvbsrn.supabase.co`)**  
  Serviço de backend para autenticação e persistência online de favoritos.

- **GitHub OAuth Provider (via Supabase Auth)**  
  Provedor de autenticação para login de usuários no sistema.

## Arquitetura do Sistema

### Padrão arquitetural adotado
- Aplicação **front-end monolítica SPA** (Single Page Application) em React.
- Organização por camadas de responsabilidade:
  - **UI/Pages/Components**
  - **Context/State (React Context + Zustand)**
  - **Data access (services com Axios e Supabase)**

### Fluxo de dados (descrição textual)
1. Usuário interage com páginas (`/` e `/favorites`) e componentes de busca/filtro/paginação.
2. Parâmetros de busca/paginação são refletidos na URL (`useSearchParams`) e contexto de paginação.
3. React Query executa chamadas de dados:
   - Cartas: API Pokémon TCG via `api.ts`
   - Favoritos online: Supabase via client `supabase.ts`
4. Estado de autenticação é controlado no store Zustand (`authStore.ts`), com sessão validada no carregamento da aplicação.
5. Em ações de favoritar:
   - **Usuário autenticado:** grava/remove favorito no Supabase
   - **Usuário não autenticado:** grava/remove favorito no Local Storage
6. Atualizações de favoritos invalidam cache React Query para manter consistência da interface.

### Justificativa arquitetural
- A combinação **React Query + serviços isolados** reduz acoplamento entre UI e origem de dados.
- O uso de **Zustand** para autenticação simplifica o estado global com baixa complexidade.
- A estratégia de persistência híbrida (online/offline) mantém continuidade de uso com e sem login.

## Contato do Desenvolvedor

- **Nome:** Dâmaso Magno  
- **Contato:** https://github.com/DamasoMagno
