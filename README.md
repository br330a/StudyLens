# StudyLens

O **StudyLens** é um modo inteligente integrado à experiência de câmera da **JOVI**, desenvolvido pela equipe **NEXTAGE** para o Challenge FIAP.

A proposta é transformar conteúdos capturados pela câmera em materiais personalizados de estudo. O estudante pode fotografar uma lousa, caderno, apostila, exercício, slide ou outro material acadêmico e utilizar Inteligência Artificial para interpretar o conteúdo e gerar automaticamente recursos como **resumos, flashcards, questões e StudyCast em áudio**.

O protótipo foi desenvolvido para demonstrar o StudyLens como uma **funcionalidade integrada à câmera JOVI**, e não como uma aplicação de câmera independente. Dentro da mesma interface, o usuário pode transitar entre o modo convencional **Foto** e o modo inteligente **StudyLens**.

---

## Aplicação online

**Frontend:**  
https://study-lens-liard.vercel.app

**Backend:**  
https://studylens-api.onrender.com

**Repositório:**  
https://github.com/br330a/StudyLens

---

# Funcionalidades

O protótipo atual possui:

- modo StudyLens integrado à interface da câmera JOVI;
- transição entre os modos **Foto** e **StudyLens**;
- inicialização automática da câmera;
- captura utilizando a câmera do dispositivo;
- seleção de imagens da galeria;
- captura de **1 a 4 imagens em uma mesma análise**;
- pré-visualização ampliada da captura antes da análise;
- possibilidade de refazer a captura atual;
- adição de novas capturas à mesma sessão;
- remoção individual das imagens selecionadas;
- visualização das capturas anteriores em miniaturas;
- análise conjunta de múltiplas imagens relacionadas ao mesmo conteúdo;
- identificação automática da matéria;
- identificação do assunto estudado;
- identificação do contexto aparente do material;
- identificação do nível pedagógico aparente do conteúdo;
- adaptação da explicação à complexidade identificada;
- geração automática de resumos;
- geração de flashcards;
- geração de questões e respostas;
- renderização de Markdown;
- renderização de fórmulas matemáticas utilizando LaTeX e KaTeX;
- geração de áudio educacional por IA através do **StudyCast**;
- reprodução do StudyCast diretamente na aplicação;
- armazenamento local dos áudios gerados;
- histórico de conteúdos analisados;
- organização automática por matérias;
- acompanhamento de progresso;
- cálculo da matéria mais estudada;
- acompanhamento de meta semanal;
- cálculo de sequência de dias estudados;
- biblioteca StudyLens persistente no navegador;
- rotas públicas e protegidas;
- interface responsiva para dispositivos móveis, tablets e desktops.

---

# Inteligência Artificial

## Onde e como a IA é utilizada

O StudyLens utiliza a **API Gemini, do Google**, através de um backend próprio desenvolvido em Node.js e Express.

As imagens capturadas ou selecionadas pelo usuário são processadas no frontend e enviadas para o backend, que realiza a comunicação segura com a API Gemini.

A Inteligência Artificial interpreta uma ou mais imagens como pertencentes à mesma sessão de estudo e retorna informações estruturadas contendo:

1. matéria;
2. conteúdo identificado;
3. contexto aparente do material;
4. nível pedagógico aparente;
5. resumo didático;
6. flashcards;
7. questões e respostas;
8. roteiro de áudio para o StudyCast.

Quando necessário, o conteúdo gerado também utiliza **LaTeX** para representar fórmulas e expressões matemáticas.

O backend também utiliza recursos de geração de voz por Inteligência Artificial para transformar o roteiro produzido durante a análise em um **StudyCast**, uma explicação em áudio do conteúdo estudado.

A chave da API Gemini permanece exclusivamente no backend através de uma variável de ambiente e **não é exposta no frontend ou no repositório**.

---

# Fluxo da solução

```text
Câmera JOVI
     │
     ▼
Modo StudyLens
     │
     ├── Captura pela câmera
     │
     └── Seleção pela galeria
     │
     ▼
1 a 4 imagens
     │
     ▼
Pré-processamento no frontend
     │
     ▼
Backend Node.js + Express
     │
     ▼
Google Gemini
     │
     ├── Matéria
     ├── Conteúdo
     ├── Contexto
     ├── Nível pedagógico
     ├── Resumo
     ├── Flashcards
     ├── Questões
     └── Roteiro StudyCast
     │
     ▼
Área StudyLens
     │
     ├── Resumo
     ├── Flashcards
     ├── Questões
     └── Ouvir / StudyCast
     │
     ▼
Biblioteca
Histórico
Matérias
Progresso
```

---

# StudyCast

O **StudyCast** é o recurso de áudio do StudyLens.

Depois que um conteúdo é analisado, a IA também prepara um roteiro didático adaptado ao material identificado.

Quando solicitado pelo usuário, o backend gera um áudio explicativo que pode ser reproduzido diretamente na aplicação.

O objetivo é permitir que o estudante continue revisando o conteúdo mesmo quando não estiver olhando para a tela, como durante deslocamentos de ônibus, metrô ou trem.

Os áudios já gerados são armazenados localmente utilizando **IndexedDB**, evitando a necessidade de gerar novamente o mesmo StudyCast sempre que o usuário abrir aquele conteúdo no mesmo navegador e domínio.

---

# Tecnologias utilizadas

## Frontend

- React
- Vite
- React Router
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- React Markdown
- Remark Math
- Rehype KaTeX
- KaTeX

## Backend

- Node.js
- Express
- Multer
- CORS
- Dotenv
- Google GenAI SDK

## Inteligência Artificial

- Google Gemini API
- análise multimodal de imagens;
- geração estruturada de conteúdo educacional;
- geração de roteiro para áudio;
- geração de voz para o StudyCast.

## Persistência

- LocalStorage
- SessionStorage
- IndexedDB

## Deploy e versionamento

- Git
- GitHub
- Vercel
- Render

---

# Arquitetura

O projeto utiliza uma arquitetura separada entre frontend e backend.

```text
Usuário
   │
   ▼
React + Vite
Vercel
   │
   ├────────────────────┐
   │                    │
   ▼                    ▼
LocalStorage         IndexedDB
conteúdos            StudyCast
histórico             áudios
progresso
   │
   ▼
Câmera / Galeria
   │
   ▼
Pré-processamento
de imagens
   │
   ▼
Node.js + Express
Render
   │
   ▼
Google Gemini
   │
   ├── análise multimodal
   ├── geração de conteúdo
   └── geração de áudio
   │
   ▼
Backend
   │
   ▼
Frontend
   │
   ▼
Biblioteca StudyLens
```

O frontend **não possui acesso direto à chave da API Gemini**.

Toda comunicação com o serviço de Inteligência Artificial é intermediada pelo backend.

---

# Estrutura principal do projeto

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
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── camera/
│   │   │   └── ...
│   │   │
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vercel.json
│
├── .gitignore
├── INTEGRANTES.txt
└── README.md
```

---

# Organização do frontend

O frontend foi organizado para separar responsabilidades entre interface, regras de negócio, navegação e integração com serviços externos.

As principais estruturas são:

- `components/` — componentes reutilizáveis;
- `components/camera/` — componentes específicos da interface da câmera JOVI;
- `pages/` — páginas principais da aplicação;
- `layouts/` — estruturas compartilhadas entre páginas;
- `routes/` — configuração e proteção de rotas;
- `hooks/` — custom hooks responsáveis pela lógica reutilizável;
- `services/` — comunicação com API e persistência;
- `utils/` — funções auxiliares e processamento de imagens;
- `styles/` — estilos globais, Landing Page e integração com Tailwind CSS;
- `assets/` — imagens e demais recursos estáticos.

Essa divisão reduz o acoplamento entre a interface visual e as regras de funcionamento da aplicação.

---

# Componentização

A aplicação utiliza componentes React para dividir a interface em partes menores e reutilizáveis.

A câmera, por exemplo, possui componentes próprios responsáveis por elementos como:

- seletor de modos;
- barra superior;
- controles do obturador;
- miniaturas das capturas StudyLens;
- área principal de captura.

Essa abordagem facilita a manutenção, reutilização e evolução da interface.

Os componentes também recebem dados e funções através de **props**, permitindo comunicação entre diferentes partes da aplicação.

---

# Hooks

O projeto utiliza hooks nativos do React, como:

- `useState`;
- `useEffect`;
- `useRef`;
- `useCallback`.

Também foram criados custom hooks para separar regras de negócio da interface visual.

Entre os principais estão:

```text
useImageAnalysis
useStudyHistory
useStudyCast
```

## useImageAnalysis

Responsável pelo fluxo de análise das imagens, incluindo preparação dos arquivos, comunicação com a API, prevenção de requisições duplicadas e controle dos estados de carregamento e erro.

## useStudyHistory

Responsável pelo armazenamento e recuperação dos conteúdos analisados e utilizados pela biblioteca, histórico, matérias e progresso.

## useStudyCast

Responsável pela geração, recuperação e reprodução dos áudios StudyCast.

---

# Interface da câmera JOVI

A câmera é a principal porta de entrada para o StudyLens.

A interface do protótipo foi construída para se aproximar visualmente da experiência de câmera da JOVI e reforçar que o StudyLens é um **modo adicional da câmera**, e não uma aplicação independente.

O usuário pode alternar entre:

```text
Foto
StudyLens
```

O modo selecionado permanece centralizado em relação ao botão de captura.

## Modo Foto

O modo Foto representa o funcionamento convencional da câmera dentro do protótipo.

Ao realizar uma captura:

- a câmera permanece aberta;
- a última fotografia aparece como miniatura no canto inferior;
- o usuário pode continuar capturando imagens;
- não são exibidos controles de análise educacional.

## Modo StudyLens

No modo StudyLens, as capturas passam a fazer parte de uma sessão educacional.

O usuário pode:

- capturar uma imagem;
- selecionar imagens da galeria;
- visualizar a captura atual em tamanho ampliado;
- confirmar visualmente a imagem antes da análise;
- refazer a captura atual;
- adicionar uma nova foto;
- adicionar outra imagem da galeria;
- visualizar capturas anteriores em miniaturas;
- remover individualmente imagens da sessão;
- analisar até quatro imagens em conjunto.

As miniaturas das capturas já selecionadas aparecem acima do seletor de modos, mantendo separada a função da galeria do conjunto de imagens utilizado pela análise.

---

# Captura múltipla

O StudyLens permite utilizar entre **1 e 4 imagens em uma mesma análise**.

Essa funcionalidade permite fotografar, por exemplo:

- diferentes partes de uma lousa;
- mais de uma página de uma apostila;
- exercícios relacionados;
- páginas consecutivas de um conteúdo;
- diferentes registros pertencentes à mesma sessão de estudo.

As imagens são enviadas juntas ao backend e interpretadas pela IA como partes de um mesmo contexto de estudo.

---

# Processamento das imagens

Antes de realizar o envio para o backend, o frontend executa etapas de processamento para melhorar desempenho e estabilidade.

Entre elas estão:

- controle das dimensões da imagem;
- redução de resolução quando necessário;
- compressão de arquivos maiores;
- conversão adequada para envio;
- geração de hash das imagens;
- prevenção de requisições duplicadas;
- reaproveitamento de resultados durante a mesma sessão quando aplicável.

O backend permite o envio de até **4 imagens por análise**.

---

# Contexto do material

Além de identificar a matéria e o assunto, o StudyLens também analisa o contexto aparente da captura.

Entre os possíveis contextos estão:

```text
Lousa
Caderno
Slide
Apostila
Livro
Exercício
Documento
Outro
```

Essa informação ajuda a contextualizar o material utilizado pelo estudante.

---

# Adaptação pedagógica

O StudyLens também procura identificar o **nível pedagógico aparente do material**.

Entre as classificações utilizadas estão:

```text
Fundamental I
Fundamental II
Ensino Médio
Ensino Superior
Indeterminado
```

Essa identificação é baseada na complexidade do conteúdo apresentado e não deve ser interpretada como uma tentativa de determinar a idade exata do estudante.

A informação é utilizada para adaptar:

- vocabulário;
- profundidade da explicação;
- exemplos;
- flashcards;
- questões;
- roteiro do StudyCast.

Quando o nível não pode ser identificado com segurança, a aplicação utiliza uma abordagem didática progressiva.

---

# Biblioteca StudyLens

Depois que uma captura é analisada, o conteúdo não desaparece.

Ele passa a fazer parte da **Biblioteca StudyLens**, permitindo que o estudante retome o material posteriormente.

A biblioteca possui acesso a:

- conteúdos recentes;
- histórico;
- matérias;
- progresso;
- materiais individuais de estudo.

Cada conteúdo pode possuir:

```text
Resumo
Flashcards
Questões
StudyCast
```

Essa estrutura reforça a ideia de que a câmera é responsável pela criação do material e a Biblioteca StudyLens pela continuidade dos estudos.

---

# Navegação e rotas

A aplicação utiliza **React Router**.

## Rota pública

```text
/
```

Responsável pela Landing Page de apresentação do projeto.

## Rotas protegidas

```text
/app

/app/biblioteca

/app/biblioteca/historico

/app/biblioteca/materias

/app/biblioteca/materias/:materia

/app/biblioteca/conteudo/:id

/app/biblioteca/progresso
```

Também existe:

```text
/app/camera
```

que redireciona para:

```text
/app
```

por compatibilidade com versões anteriores do protótipo.

---

# Rotas públicas e protegidas

A Landing Page é uma rota pública.

As rotas internas da experiência StudyLens são protegidas através de uma sessão local criada quando o usuário seleciona **Experimentar StudyLens**.

O controle é realizado no frontend utilizando:

```text
SessionStorage
ProtectedRoute
React Router
```

Caso o usuário tente acessar diretamente uma rota protegida sem uma sessão ativa, ele é redirecionado para a Landing Page.

> O projeto não implementa autenticação real de usuários. A proteção de rotas existente representa um controle de navegação do protótipo no frontend e não deve ser interpretada como uma barreira de segurança de backend.

Por esse motivo, não existem credenciais de usuário ou senha necessárias para testar a aplicação.

---

# Persistência de dados

O projeto utiliza três mecanismos de armazenamento local.

## LocalStorage

Utilizado para persistir informações relacionadas aos conteúdos estudados.

Entre os dados armazenados estão:

- matéria;
- conteúdo;
- contexto;
- nível pedagógico;
- resumo;
- flashcards;
- questões;
- roteiro de áudio;
- data da análise.

Esses dados são utilizados para gerar dinamicamente:

- histórico;
- biblioteca;
- organização por matérias;
- indicadores de progresso;
- sequência de estudos;
- matéria mais estudada.

Os dados permanecem associados ao navegador e ao domínio utilizado.

---

## IndexedDB

O **IndexedDB** é utilizado para armazenar os arquivos de áudio gerados pelo StudyCast.

Isso permite que um áudio já gerado continue disponível após:

- atualização da página;
- navegação entre páginas;
- fechamento e reabertura do navegador;

desde que seja utilizado o mesmo navegador e o mesmo domínio.

Os áudios não são sincronizados automaticamente entre dispositivos ou navegadores diferentes.

---

## SessionStorage

O **SessionStorage** é utilizado para controlar a sessão local das rotas protegidas.

A sessão é criada quando o usuário entra no protótipo através do botão:

```text
Experimentar StudyLens
```

da Landing Page.

---

# Responsividade

O StudyLens foi desenvolvido com abordagem responsiva para:

- dispositivos móveis;
- tablets;
- desktops.

A câmera utiliza uma experiência **fullscreen**, aproximando o protótipo da interface nativa de um smartphone.

A Área StudyLens adapta sua largura, grids, espaçamentos e disposição de conteúdos conforme o tamanho disponível.

A Landing Page também utiliza breakpoints específicos para reorganização de:

- navegação;
- hero;
- botões;
- cards;
- galeria;
- equipe;
- fluxo "Como Funciona".

Entre as dimensões utilizadas durante os testes estão cenários representativos de:

```text
Mobile
390 x 844

Tablet
768 x 1024

Desktop
1440 x 900
```

---

# Landing Page

A Landing Page apresenta a solução antes da entrada no protótipo.

Entre as principais seções estão:

- A Solução;
- Como Funciona;
- Público-Alvo;
- Galeria;
- Nossa Equipe;
- Contato.

O principal CTA da página é:

```text
Experimentar StudyLens
```

Ao selecioná-lo:

1. uma sessão local do protótipo é criada;
2. o usuário é direcionado para `/app`;
3. a câmera JOVI é aberta;
4. o modo StudyLens é disponibilizado para uso.

---

# API

O backend possui endpoints responsáveis pelas principais funcionalidades.

```text
GET  /api/health
POST /api/analisar
POST /api/studycast
```

## GET /api/health

Utilizado para verificar se o backend está disponível.

Exemplo:

```text
https://studylens-api.onrender.com/api/health
```

## POST /api/analisar

Responsável pela análise das imagens.

Pode receber entre uma e quatro imagens pertencentes à mesma sessão de estudo.

O endpoint envia as imagens ao Gemini e retorna conteúdo estruturado para o frontend.

## POST /api/studycast

Responsável pela geração do áudio StudyCast a partir do roteiro criado durante a análise do conteúdo.

---

# Tratamento de erros e estabilidade

A aplicação possui tratamento para diferentes cenários de erro, incluindo:

- limite de uso da API;
- indisponibilidade temporária do serviço de IA;
- imagens maiores que o limite permitido;
- excesso de imagens;
- falha de conexão;
- timeout;
- acesso negado à câmera;
- navegador sem suporte à câmera;
- falha na geração do StudyCast;
- requisições duplicadas.

Para determinados erros temporários do serviço de Inteligência Artificial, o backend realiza novas tentativas controladas antes de retornar uma falha ao usuário.

A aplicação também evita que uma mesma solicitação seja enviada repetidamente enquanto já existe outra requisição equivalente em andamento.

---

# Segurança

Entre as práticas adotadas no projeto estão:

- chave da API Gemini mantida somente no backend;
- arquivos `.env` ignorados pelo Git;
- arquivos `.env.example` disponibilizados sem segredos;
- comunicação com o Gemini realizada pelo backend;
- validação dos arquivos enviados;
- limite de tamanho para uploads;
- limite de imagens por análise;
- CORS configurado no backend;
- variáveis de ambiente separadas entre desenvolvimento e produção;
- conteúdo gerado pela IA renderizado sem habilitar HTML arbitrário;
- tratamento controlado dos erros retornados pela API;
- prevenção de requisições duplicadas no frontend.

---

# Como executar o projeto localmente

## Pré-requisitos

Antes de iniciar, é necessário possuir:

- Node.js;
- npm;
- Git;
- uma chave válida da API Gemini.

---

## 1. Clonar o repositório

```bash
git clone https://github.com/br330a/StudyLens.git
```

Entre na pasta do projeto:

```bash
cd StudyLens
```

---

# Executando o backend

## 2. Acessar a pasta do backend

```bash
cd backend
```

## 3. Instalar as dependências

```bash
npm install
```

## 4. Configurar as variáveis de ambiente

Crie o arquivo:

```text
backend/.env
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

A chave utilizada deve ser válida para os recursos da API Gemini utilizados pelo projeto.

> Nunca envie a chave real da API para o GitHub.

## 5. Iniciar o backend

```bash
npm start
```

Por padrão, o servidor local ficará disponível em:

```text
http://localhost:3000
```

Para verificar a API:

```text
http://localhost:3000/api/health
```

---

# Executando o frontend

Abra outro terminal.

A partir da raiz do projeto:

```bash
cd react-app
```

## 6. Instalar as dependências

```bash
npm install
```

## 7. Configurar a URL da API

Crie:

```text
react-app/.env
```

utilizando como referência:

```text
react-app/.env.example
```

Para desenvolvimento local:

```env
VITE_API_URL=http://localhost:3000
```

## 8. Iniciar o frontend

```bash
npm run dev
```

O Vite normalmente disponibilizará a aplicação em:

```text
http://localhost:5173
```

---

# Validação do frontend

## ESLint

Para verificar problemas no código:

```bash
npm run lint
```

## Build de produção

Para gerar o build:

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta:

```text
react-app/dist/
```

## Preview do build

Para testar o build localmente:

```bash
npm run preview
```

---

# Build e execução completa

Para testar o projeto completo localmente, utilize dois terminais.

## Terminal 1 — Backend

```bash
cd backend
npm install
npm start
```

## Terminal 2 — Frontend

```bash
cd react-app
npm install
npm run dev
```

Depois acesse:

```text
http://localhost:5173
```

---

# Deploy

## Frontend

O frontend React está hospedado na **Vercel**:

https://study-lens-liard.vercel.app

O arquivo:

```text
react-app/vercel.json
```

contém um rewrite para permitir o funcionamento correto das rotas do React Router quando uma URL interna é acessada diretamente.

Configuração:

```json
{
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```

---

## Backend

O backend Node.js/Express está hospedado no **Render**:

https://studylens-api.onrender.com

Endpoint de verificação:

```text
https://studylens-api.onrender.com/api/health
```

---

# Uso de Math

A aplicação utiliza recursos nativos do objeto `Math` do JavaScript para cálculos relacionados à interface de progresso.

Entre eles:

```javascript
Math.round()
```

utilizado para cálculos de percentuais, e:

```javascript
Math.min()
```

utilizado para limitar visualmente o progresso ao máximo de 100%.

---

# Arquivos de ambiente

O projeto utiliza arquivos `.env` para dados que não devem ser versionados.

Os arquivos reais:

```text
backend/.env
react-app/.env
```

não devem ser enviados ao GitHub.

O repositório disponibiliza:

```text
backend/.env.example
react-app/.env.example
```

como referência para configuração.

---

# Git e versionamento

O projeto utiliza Git e GitHub para controle de versão.

Durante o desenvolvimento foram utilizadas branches específicas para diferentes tipos de alteração, incluindo funcionalidades, correções e refatorações.

O repositório está disponível em:

https://github.com/br330a/StudyLens

---

# Equipe NEXTAGE

### Bruno Gonçalves Minitti
RM 571981

### Nicolas Gomes de Almeida
RM 573079

### Lucas Ferreira Rodrigues Silva
RM 569742

Os integrantes também estão registrados no arquivo obrigatório:

```text
INTEGRANTES.txt
```

---

# Projeto acadêmico

Projeto desenvolvido para o **Challenge FIAP**, no curso de Engenharia de Software, em parceria com a **JOVI**.

A proposta do StudyLens é transformar a câmera presente no smartphone em uma extensão da rotina de estudos.

Em vez de uma fotografia permanecer apenas como um registro na galeria, o conteúdo capturado pode ser interpretado, organizado e convertido em materiais que auxiliam o estudante durante a revisão e aprendizagem.

O fluxo principal pode ser resumido como:

```text
capturar
   ↓
interpretar
   ↓
organizar
   ↓
estudar
   ↓
revisar
```

---

# Status do projeto

**Protótipo funcional e publicado.**

Principais recursos implementados:

- [x] React
- [x] Vite
- [x] Componentização
- [x] Props
- [x] React Router
- [x] Rotas públicas
- [x] Rotas protegidas
- [x] Hooks nativos
- [x] Custom Hooks
- [x] Tailwind CSS
- [x] CSS responsivo
- [x] Responsividade mobile
- [x] Responsividade tablet
- [x] Responsividade desktop
- [x] Landing Page em React
- [x] Interface inspirada na câmera JOVI
- [x] Modo Foto
- [x] Modo StudyLens
- [x] Transição entre modos
- [x] Captura por câmera
- [x] Inicialização automática da câmera
- [x] Seleção pela galeria
- [x] Preview da captura
- [x] Opção de refazer captura
- [x] Captura múltipla
- [x] Análise de 1 a 4 imagens
- [x] Remoção individual de capturas
- [x] Consumo de API própria
- [x] Backend Node.js / Express
- [x] Integração com Google Gemini
- [x] Identificação de matéria
- [x] Identificação de conteúdo
- [x] Identificação de contexto
- [x] Adaptação pedagógica
- [x] Resumos
- [x] Flashcards
- [x] Questões
- [x] Markdown
- [x] Fórmulas matemáticas
- [x] StudyCast
- [x] Geração de áudio por IA
- [x] LocalStorage
- [x] IndexedDB
- [x] SessionStorage
- [x] Histórico
- [x] Biblioteca StudyLens
- [x] Matérias dinâmicas
- [x] Progresso dinâmico
- [x] Tratamento de erros
- [x] Controle de requisições duplicadas
- [x] Git / GitHub
- [x] Deploy Vercel
- [x] Deploy Render

---

## NEXTAGE — StudyLens

**Challenge FIAP × JOVI**