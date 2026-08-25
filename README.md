# StudyLens

O **StudyLens** é uma plataforma educacional desenvolvida pela equipe **NEXTAGE** para o Challenge FIAP em parceria com a **JOVI**.

A solução transforma a câmera do smartphone em uma ferramenta de estudo: o estudante fotografa ou seleciona uma imagem contendo um conteúdo educacional e, com auxílio de Inteligência Artificial, o StudyLens identifica a matéria e o assunto para gerar automaticamente materiais de apoio ao estudo.

## Aplicação online

**Frontend:**  
https://study-lens-liard.vercel.app

**Repositório:**  
https://github.com/br330a/StudyLens

---

## Funcionalidades

O StudyLens permite:

- Capturar uma imagem utilizando a câmera do dispositivo;
- Selecionar uma imagem da galeria;
- Identificar automaticamente a matéria e o conteúdo da imagem;
- Gerar resumos estruturados;
- Gerar flashcards interativos;
- Gerar questões com respostas;
- Renderizar expressões matemáticas;
- Salvar conteúdos estudados no histórico;
- Organizar conteúdos automaticamente por matéria;
- Acompanhar o progresso de estudos;
- Calcular a matéria mais estudada;
- Acompanhar a meta semanal;
- Calcular a sequência de dias estudados;
- Manter os dados armazenados localmente no navegador;
- Navegar entre as páginas utilizando rotas da aplicação.

---

## Inteligência Artificial

O StudyLens utiliza a **API Gemini, do Google**, para analisar imagens contendo conteúdos educacionais.

Quando o usuário envia uma imagem, ela é encaminhada para o backend da aplicação, que realiza a comunicação com a API Gemini.

A IA é responsável por:

1. identificar a disciplina;
2. identificar o assunto apresentado;
3. gerar um resumo didático;
4. criar flashcards;
5. gerar questões e respostas;
6. estruturar expressões matemáticas utilizando LaTeX quando necessário.

A resposta da IA é retornada em formato estruturado para o frontend e apresentada ao estudante de forma interativa.

A chave da API Gemini é armazenada exclusivamente no backend através de uma variável de ambiente e **não é exposta no frontend ou no repositório**.

---

## Tecnologias utilizadas

### Frontend

- React
- Vite
- React Router
- JavaScript
- HTML5
- CSS3
- React Markdown
- Remark Math
- Rehype KaTeX
- KaTeX

### Backend

- Node.js
- Express
- Multer
- CORS
- Dotenv
- Google GenAI SDK

### Inteligência Artificial

- Google Gemini API

### Persistência

- LocalStorage

### Deploy e versionamento

- Git
- GitHub
- Vercel
- Render

---

## Arquitetura

A aplicação utiliza uma arquitetura dividida entre frontend e backend.

```text
Usuário
   │
   ▼
React / Vercel
   │
   │ imagem
   ▼
Node.js + Express / Render
   │
   ▼
Google Gemini API
   │
   │ conteúdo estruturado
   ▼
Backend
   │
   ▼
Frontend
   │
   ▼
LocalStorage
```

O frontend nunca acessa diretamente a chave da API Gemini.

---

## Estrutura principal do projeto

```text
StudyLens/
│
├── backend/
│   ├── src/
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── react-app/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── data/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── package.json
│   └── vercel.json
│
├── index.html
├── INTEGRANTES.txt
└── README.md
```

---

# Como executar o projeto localmente

## Pré-requisitos

Antes de iniciar, é necessário possuir:

- Node.js instalado;
- npm;
- Git;
- uma chave válida da API Gemini.

---

## 1. Clonar o repositório

```bash
git clone https://github.com/br330a/StudyLens.git
```

Entre na pasta:

```bash
cd StudyLens
```

---

# Backend

## 2. Acessar o backend

```bash
cd backend
```

## 3. Instalar as dependências

```bash
npm install
```

## 4. Configurar as variáveis de ambiente

Crie um arquivo:

```text
.env
```

dentro da pasta:

```text
backend/
```

Utilize como referência:

```text
backend/.env.example
```

Exemplo:

```env
GEMINI_API_KEY=sua_chave_gemini
FRONTEND_URL=http://localhost:5173
```

> A chave real da API não deve ser enviada ao GitHub.

## 5. Iniciar o backend

```bash
npm start
```

Por padrão, o servidor local ficará disponível em:

```text
http://localhost:3000
```

O endpoint de verificação pode ser acessado em:

```text
http://localhost:3000/api/health
```

---

# Frontend React

Abra outro terminal e retorne à raiz do projeto.

## 6. Acessar o frontend

```bash
cd react-app
```

## 7. Instalar as dependências

```bash
npm install
```

## 8. Configurar a API

O projeto possui:

```text
react-app/.env.example
```

Para desenvolvimento local, a aplicação utiliza por padrão:

```env
VITE_API_URL=http://localhost:3000
```

## 9. Iniciar o frontend

```bash
npm run dev
```

Acesse o endereço exibido pelo Vite, normalmente:

```text
http://localhost:5173
```

---

## Build de produção

Para gerar uma versão de produção do frontend:

```bash
npm run build
```

Os arquivos serão gerados na pasta:

```text
dist/
```

Para testar o build localmente:

```bash
npm run preview
```

---

# Armazenamento de dados

Nesta versão do StudyLens, os conteúdos estudados são armazenados utilizando o **LocalStorage do navegador**.

São armazenadas informações como:

- matéria;
- conteúdo identificado;
- resumo;
- flashcards;
- questões;
- data de estudo.

Esses dados são utilizados para gerar dinamicamente:

- histórico;
- organização por matérias;
- total de conteúdos estudados;
- matéria favorita;
- progresso semanal;
- sequência de estudo.

Por utilizar LocalStorage, os dados ficam associados ao navegador e ao domínio utilizado.

---

## Uso de Math

A aplicação utiliza recursos do objeto `Math` do JavaScript para cálculos relacionados ao progresso do estudante.

Entre eles:

```javascript
Math.round()
```

utilizado para calcular o percentual da meta semanal, e:

```javascript
Math.min()
```

utilizado para limitar o progresso visual ao máximo de 100%.

---

# Navegação

A aplicação utiliza **React Router** para gerenciamento das rotas.

Principais rotas:

```text
/                       Início
/historico              Histórico
/materias               Matérias
/materias/:materia      Conteúdos de uma matéria
/conteudo/:id           Conteúdo estudado
/progresso              Progresso
```

---

# Segurança

Algumas práticas adotadas no projeto:

- chave Gemini armazenada apenas no backend;
- arquivos `.env` ignorados pelo Git;
- comunicação com Gemini realizada pelo servidor;
- validação de uploads;
- limite de tamanho para imagens;
- controle de origem através de CORS;
- variáveis de ambiente separadas entre desenvolvimento e produção;
- conteúdo gerado pela IA renderizado no React sem habilitar HTML arbitrário.

---

# Usuários de teste

O StudyLens **não utiliza sistema de autenticação nesta versão**.

Portanto, não existem usuários ou senhas necessários para testar a aplicação.

Basta acessar:

https://study-lens-liard.vercel.app

---

# Deploy

## Frontend

O frontend React está publicado na **Vercel**:

https://study-lens-liard.vercel.app

## Backend

A API Node.js/Express está hospedada no **Render**:

https://studylens-api.onrender.com

Endpoint de verificação:

```text
https://studylens-api.onrender.com/api/health
```

---

# Landing Page

O projeto também possui uma Landing Page desenvolvida para apresentar a solução StudyLens.

Ela contém as seções:

- A Solução;
- Público-Alvo;
- Galeria;
- Nossa Equipe;
- Contato.

A página utiliza HTML semântico, CSS Grid e técnicas de responsividade para adaptação a desktop, tablet e dispositivos móveis.

---

# Equipe NEXTAGE

### Bruno Gonçalves Minitti
RM 571981

### Nicolas Gomes de Almeida
RM 573079

### Lucas Ferreira Rodrigues Silva
RM 569742

---

# Projeto acadêmico

Projeto desenvolvido para o **Challenge FIAP**, no curso de Engenharia de Software, em parceria com a **JOVI**.

O objetivo do StudyLens é explorar a câmera presente nos smartphones como uma ferramenta ativa no processo de aprendizagem, combinando captura de imagens, organização de conteúdos e Inteligência Artificial.

---

## Status

**Protótipo funcional e publicado.**

Principais recursos disponíveis:

- [x] React
- [x] Componentização
- [x] React Router
- [x] LocalStorage
- [x] Integração com Gemini
- [x] Captura por câmera
- [x] Upload pela galeria
- [x] Resumos
- [x] Flashcards
- [x] Questões
- [x] Markdown
- [x] Fórmulas matemáticas
- [x] Histórico
- [x] Matérias dinâmicas
- [x] Progresso dinâmico
- [x] Backend publicado
- [x] Frontend publicado