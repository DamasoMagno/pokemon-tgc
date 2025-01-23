# Pokemon TCG Project

## Sobre o Projeto

Este projeto foi desenvolvido como parte de um teste técnico. Ele consiste em consumir a API da plataforma Pokemon TCG para exibir cards de Pokémon.
O projeto inclui funcionalidades para buscar por um Pokémon específico ou aplicar filtros, exibindo os resultados em um modal.

## Funcionalidades Implementadas

- Listagem de cards de Pokémon obtidos da API Pokemon TCG.
- Busca por um Pokémon específico utilizando nome.
- Filtros para refinar a exibição de cards baseado em ordem alfabética.
- Exibição detalhada de informações do Pokémon em um modal.
- Sistema de favoritar pokemon.
- Autenticação usando Supabase e Github Provider.
- Gerenciamento de contexto global para pokemon, usuário e paginação.
- Persistência de dados no Local Storage ou Supabase.
- Paginação de cartas dinamica e responsiva. 

## Tecnologias Utilizadas

- [**React**](https://reactjs.org/): Biblioteca para construção de interfaces.
- [**Typescript**](https://www.typescriptlang.org/): Superset do JavaScript para adicionar tipagem estática.
- [**React Query**](https://react-query.tanstack.com/): Gerenciamento de estado assíncrono.
- [**Supabase**](https://supabase.com/): Backend como serviço para persistência de dados.
- [**React Router Dom**](https://reactrouter.com/): Biblioteca para roteamento de páginas.
- [**API Pokemon TCG**](https://pokemontcg.io/): Fonte dos dados dos cards de Pokémon.
- [**Lucide React**](https://lucide.dev/): Biblioteca de ícones para melhorar a interface.
- [**Zustand**](https://github.com/pmndrs/zustand): Biblioteca para gerenciamento de estado.
- **Local Storage**: Para armazenar dados localmente no navegador.
- **Axios**: Biblioteca para fazer requisições HTTP.

## Como Instalar e Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente:

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/pokemon-tcg-project.git
```

### 2. Acesse o Diretório do Projeto
```bash
cd pokemon-tcg-project
```

### 3. Instale as Dependências
Certifique-se de que o Node.js está instalado e, em seguida, execute:
```bash
npm install
```

### 5. Execute o Projeto
```bash
npm run dev
```

O projeto será iniciado e estará acessível em `http://localhost:5173`.