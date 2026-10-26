
'use strict';
const WHATSAPP_NUMBER = '5591985091584';
const PACKAGES = [
  {
    id: 'iniciantes',
    title: 'IA para INICIANTES',
    icon: 'i-book',
    featured: true,
    description: 'Comece do zero e aprenda a usar inteligência artificial no dia a dia, sem termos complicados.',
    benefits: ['Primeiros passos com IA', 'Ferramentas e exemplos práticos', 'Prompts para começar', 'Materiais pelo WhatsApp'],
    whatsapp: 'Olá, Kria AI! 💜 Quero saber mais sobre o pacote IA para INICIANTES. Como funcionam as aulas, o pagamento e a liberação dos módulos pelo WhatsApp?'
  },
  {
    id: 'conteudo',
    title: 'Conteúdo com IA',
    icon: 'i-clapper',
    description: 'Crie ideias, roteiros, imagens e conteúdos com mais criatividade e eficiência.',
    benefits: ['Ideias e roteiros com IA', 'Criação de conteúdo para redes', 'Prompts e exemplos práticos', 'Materiais pelo WhatsApp'],
    whatsapp: 'Olá, Kria AI! 💜 Tenho interesse no pacote Conteúdo com IA. Como funcionam as aulas, o pagamento e a liberação dos módulos pelo WhatsApp?'
  },
  {
    id: 'empreendedorismo',
    title: 'Empreendedorismo de IA',
    icon: 'i-growth',
    description: 'Aprenda a aplicar IA em ideias de negócio, marketing, vendas e produtividade.',
    benefits: ['Aplicações para negócios', 'Planejamento e produtividade', 'Marketing e criação de ofertas', 'Materiais pelo WhatsApp'],
    whatsapp: 'Olá, Kria AI! 💜 Quero conhecer o pacote Empreendedorismo de IA. Como funcionam as aulas, o pagamento e a liberação dos módulos pelo WhatsApp?'
  }
];
const QUESTIONS = [
  {
    title: 'O que melhor descreve você hoje?',
    options: [
      { label: 'Nunca aprendi IA de verdade', icon: 'i-book', points: {iniciantes: 3} },
      { label: 'Quero criar conteúdo melhor', icon: 'i-clapper', points: {conteudo: 3} },
      { label: 'Tenho um negócio ou uma ideia', icon: 'i-briefcase', points: {empreendedorismo: 3} },
      { label: 'Quero me preparar para o futuro', icon: 'i-spark', points: {iniciantes: 2, empreendedorismo: 1} }
    ]
  },
  {
    title: 'Qual é o seu principal objetivo?',
    options: [
      { label: 'Aprender IA do zero', icon: 'i-book', points: {iniciantes: 4} },
      { label: 'Criar posts, imagens e vídeos', icon: 'i-clapper', points: {conteudo: 4} },
      { label: 'Empreender ou vender mais', icon: 'i-growth', points: {empreendedorismo: 4} },
      { label: 'Economizar tempo com ferramentas', icon: 'i-clock', points: {iniciantes: 2, empreendedorismo: 1} }
    ]
  },
  {
    title: 'Onde você gostaria de usar IA primeiro?',
    options: [
      { label: 'Nos estudos e no dia a dia', icon: 'i-book', points: {iniciantes: 3} },
      { label: 'Na criação de conteúdo', icon: 'i-clapper', points: {conteudo: 3} },
      { label: 'No trabalho e nos negócios', icon: 'i-briefcase', points: {empreendedorismo: 3} },
      { label: 'Ainda quero descobrir', icon: 'i-spark', points: {iniciantes: 2} }
    ]
  },
  {
    title: 'Qual resultado faria mais diferença agora?',
    options: [
      { label: 'Entender e usar IA com confiança', icon: 'i-check', points: {iniciantes: 3} },
      { label: 'Ter ideias e conteúdos prontos', icon: 'i-clapper', points: {conteudo: 3} },
      { label: 'Criar oportunidades com IA', icon: 'i-growth', points: {empreendedorismo: 3} },
      { label: 'Aprender com exemplos simples', icon: 'i-target', points: {iniciantes: 2} }
    ]
  }
];
const packageGrid = document.getElementById('package-grid');
const quizApp = document.getElementById('quiz-app');
const icon = name => '<svg aria-hidden="true"><use href="#' + name + '"></use></svg>';
const escapeText = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const waURL = message => 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
function renderPackages() {
  packageGrid.innerHTML = PACKAGES.map(p => `
    <article class="package-card ${p.featured ? 'featured' : ''}">
      ${p.featured ? '<span class="package-tag">PERFEITO PARA COMEÇAR</span>' : ''}
      <div class="icon-tile">${icon(p.icon)}</div>
      <h3>${escapeText(p.title)}</h3>
      <p>${escapeText(p.description)}</p>
      <ul>${p.benefits.map(b => '<li>' + icon('i-check') + escapeText(b) + '</li>').join('')}</ul>
      <a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="${waURL(p.whatsapp)}">Quero esse pacote ${icon('i-arrow')}</a>
    </article>
  `).join('');
}
let step = 0;
let answers = [];
function showQuestion() {
  const q = QUESTIONS[step];
  quizApp.innerHTML = `
    <div class="quiz-meta"><span>PERGUNTA ${step+1} DE ${QUESTIONS.length}</span><span>DIAGNÓSTICO GRATUITO</span></div>
    <div class="quiz-progress"><span style="width:${Math.round(step/QUESTIONS.length * 100)}%"></span></div>
    <h3 class="quiz-title">${escapeText(q.title)}</h3>
    <div class="quiz-answers">
      ${q.options.map((option, i) => `<button type="button" class="answer-button" data-answer="${i}"><span class="answer-icon">${icon(option.icon)}</span><span>${escapeText(option.label)}</span></button>`).join('')}
    </div>
    <div class="quiz-actions"><button type="button" id="quiz-back" class="back-button" ${step===0?'disabled':''}>${icon('i-back')} Voltar</button><button type="button" id="quiz-restart" class="back-button">Recomeçar</button></div>
    <p class="quiz-footnote">Rápido, gratuito e sem compromisso.</p>
  `;
  quizApp.querySelectorAll('[data-answer]').forEach(button => {
    button.addEventListener('click', () => {
      answers[step] = Number(button.dataset.answer);
      step++;
      if (step < QUESTIONS.length) showQuestion();
      else showResult();
    });
  });
  quizApp.querySelector('#quiz-back').addEventListener('click', () => {
    if(step > 0){step--; showQuestion();}
  });
  quizApp.querySelector('#quiz-restart').addEventListener('click', reset);
}
function recommendation() {
  const scores = {iniciantes:0, conteudo:0, empreendedorismo:0};
  answers.forEach((answerIndex, questionIndex) => {
    const chosen = QUESTIONS[questionIndex]?.options[answerIndex];
    if (chosen) Object.entries(chosen.points).forEach(([id, point]) => { scores[id]+=point; });
  });
  return PACKAGES.reduce((best, p) => scores[p.id] > scores[best.id] ? p : best, PACKAGES[0]);
}
function showResult() {
  const winner = recommendation();
  const alternatives = PACKAGES.filter(p=>p.id!==winner.id);
  quizApp.innerHTML = `
    <div class="quiz-meta"><span>SEU RESULTADO</span><span>PERSONALIZADO PARA VOCÊ</span></div>
    <div class="quiz-progress"><span style="width:100%"></span></div>
    <h3 class="quiz-title">Encontramos seu próximo passo! ✦</h3>
    <p class="result-intro">Com base nas suas respostas, recomendamos este pacote para começar a se qualificar para o futuro.</p>
    <div class="result-offer">
      <span class="result-tag">★ RECOMENDADO PARA VOCÊ</span>
      <h4>${escapeText(winner.title)}</h4>
      <p>${escapeText(winner.description)}</p>
      <ul>${winner.benefits.map(b=>'<li>'+icon('i-check')+escapeText(b)+'</li>').join('')}</ul>
      <a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="${waURL(winner.whatsapp)}">${icon('i-wa')} Quero me qualificar pelo WhatsApp ${icon('i-arrow')}</a>
    </div>
    <div class="result-alternatives">${alternatives.map(p=>'<a target="_blank" rel="noopener noreferrer" href="'+waURL(p.whatsapp)+'">Conhecer '+escapeText(p.title)+'</a>').join('')}</div>
    <div class="quiz-actions"><button type="button" class="back-button" id="quiz-back">${icon('i-back')} Alterar resposta</button><button type="button" class="back-button" id="quiz-restart">Refazer diagnóstico</button></div>
    <p class="quiz-footnote">Esta é uma sugestão baseada nas suas respostas, não uma avaliação profissional.</p>
  `;
  quizApp.querySelector('#quiz-back').addEventListener('click',()=>{step=QUESTIONS.length-1;showQuestion();});
  quizApp.querySelector('#quiz-restart').addEventListener('click',reset);
}
function reset(){ step=0; answers=[]; showQuestion(); }
renderPackages();
showQuestion();
