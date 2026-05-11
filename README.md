# StudyLens

StudyLens é um protótipo de aplicativo web focado em estudos inteligentes.

O objetivo do projeto é simular uma plataforma capaz de:
- Capturar conteúdos através da câmera
- Identificar automaticamente a matéria estudada
- Organizar conteúdos
- Acompanhar progresso de estudos
- Gerar recursos de aprendizado

---

## Funcionalidades

### Login
- Sistema simples de login
- Validação de usuário
- Controle de acesso usando LocalStorage

### Captura Inteligente
- Botão de captura principal
- Botão rápido na navbar (+)
- Simulação de identificação automática de conteúdo

### Histórico
- Armazena conteúdos capturados
- Exibe conteúdos recentes
- Histórico completo separado

### Matérias
- Organização por matérias
- Cards interativos
- Estrutura preparada para expansão futura

### Progresso
- Meta semanal
- Barra de progresso dinâmica
- Total de conteúdos estudados
- Matéria favorita

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript Vanilla

---

## Estrutura do Projeto

```bash
StudyLens/
│
├── login.html
│
├── src/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── script.js
│   │
│   └── pages/
│       └── home.html