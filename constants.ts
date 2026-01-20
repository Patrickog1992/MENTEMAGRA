import { QuizStep } from './types';

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: 1,
    type: 'intro',
    title: 'Você vai perder peso em casa com a auto-hipnose!',
    image: 'https://i.imgur.com/SL6CGop.jpeg',
    subtitle: 'Faça esse quiz de 1 minuto e vamos te ajudar agora a resolver seus desafios com o peso e a alimentação.',
    buttonText: 'Continuar'
  },
  {
    id: 2,
    type: 'single-select',
    title: 'Selecione seu gênero',
    options: [
      { label: 'Feminino', value: 'female' },
      { label: 'Masculino', value: 'male' }
    ]
  },
  {
    id: 3,
    type: 'single-select',
    title: 'Qual é a sua idade?',
    options: [
      { label: '18-30', value: '18-30' },
      { label: '31-40', value: '31-40' },
      { label: '41-50', value: '41-50' },
      { label: '51-60', value: '51-60' },
      { label: '61-70', value: '61-70' },
      { label: '70+', value: '70+' }
    ]
  },
  {
    id: 4,
    type: 'info',
    title: 'Mais de 500.000 pessoas escolheram o Método MENTE MAGRA',
    image: 'https://hypnozio.com/hypnozio/quiz/people-circle.png',
    buttonText: 'Continuar'
  },
  {
    id: 5,
    type: 'multi-select',
    title: 'Por que você quer perder peso?',
    subtitle: 'Escolha quantas opções quiser',
    options: [
      { label: 'Aumento da autoestima', value: 'autoestima' },
      { label: 'Melhor aparência', value: 'aparencia' },
      { label: 'Movimentação mais fácil', value: 'movimentacao' },
      { label: 'Maior longevidade', value: 'longevidade' },
      { label: 'Evento específico', value: 'evento' },
      { label: 'Melhor qualidade de vida', value: 'qualidade' },
      { label: 'Outro', value: 'outro' }
    ],
    buttonText: 'Continuar'
  },
  {
    id: 6,
    type: 'single-select',
    title: 'A maioria das pessoas luta para perder peso. Você sabe por que isso acontece?',
    options: [
      { label: 'Sim', value: 'sim' },
      { label: 'Mais ou menos', value: 'mais_ou_menos' },
      { label: 'Não', value: 'nao' }
    ]
  },
  {
    id: 7,
    type: 'info',
    title: 'A conexão mente-corpo',
    subtitle: 'A maioria das dietas e treinos falham a longo prazo não por falta de esforço, mas porque ignoram a verdadeira causa: a conexão mente-corpo. A hipnoterapia funciona mudando sua mentalidade, desbloqueando a motivação, clareza e controle necessários para criar mudanças reais e duradouras.',
    image: 'https://hypnozio.com/hypnozio/quiz/female-with-headphones-2.jpg',
    buttonText: 'Continuar'
  },
  {
    id: 8,
    type: 'multi-select',
    title: 'Sabemos que as razões do excesso de peso são únicas para cada pessoa. Quais são as suas?',
    subtitle: 'Escolha quantas opções quiser',
    options: [
      { label: 'Comer por emoção', value: 'emocao' },
      { label: 'Compulsão alimentar', value: 'compulsao' },
      { label: 'Efeito sanfona', value: 'sanfona' },
      { label: 'Problemas digestivos', value: 'digestao' },
      { label: 'Falta de força de vontade', value: 'vontade' },
      { label: 'Não tenho certeza', value: 'nao_sei' }
    ],
    buttonText: 'Continuar'
  },
  {
    id: 9,
    type: 'info',
    title: 'Veja o antes e depois da Jéssica com o Método MENTE MAGRA',
    image: 'https://i.imgur.com/SMrGKnM.png',
    subtitle: '"Eu não acreditava que a hipnose poderia me ajudar a emagrecer, mas o Método MENTE MAGRA mudou completamente minha perspectiva. Perdi 18kg sem sofrimento e, o mais importante, aprendi a ter uma relação saudável com a comida. Minha autoestima nunca esteve tão alta!"',
    buttonText: 'Continuar'
  },
  {
    id: 10,
    type: 'single-select',
    title: 'Há quanto tempo você enfrenta problemas com peso?',
    options: [
      { label: '0 - 6 meses', value: '0-6m' },
      { label: '6 - 12 meses', value: '6-12m' },
      { label: '1 - 5 anos', value: '1-5y' },
      { label: 'Mais de 5 anos', value: '5y+' }
    ]
  },
  {
    id: 11,
    type: 'multi-select',
    title: 'Quais dificuldades físicas você sente mais por causa do seu peso?',
    subtitle: 'Escolha quantas opções quiser',
    options: [
      { label: 'Falta de ar', value: 'falta_ar' },
      { label: 'Suor excessivo', value: 'suor' },
      { label: 'Ronco', value: 'ronco' },
      { label: 'Dificuldade para dormir', value: 'dormir' },
      { label: 'Problemas de pele', value: 'pele' },
      { label: 'Fadiga', value: 'fadiga' },
      { label: 'Dor nas costas e articulações', value: 'dor' },
      { label: 'Não tenho certeza', value: 'nao_sei' }
    ],
    buttonText: 'Continuar'
  },
  {
    id: 12,
    type: 'multi-select',
    title: 'Como esses sintomas impactam sua vida?',
    subtitle: 'Escolha quantas opções quiser',
    options: [
      { label: 'Desconforto físico', value: 'desconforto' },
      { label: 'Nervosismo ao socializar', value: 'socializar' },
      { label: 'Preocupação ao viajar', value: 'viajar' },
      { label: 'Dificuldade no trabalho', value: 'trabalho' },
      { label: 'Autoestima negativa', value: 'autoestima' },
      { label: 'Não tenho certeza', value: 'nao_sei' }
    ],
    buttonText: 'Continuar'
  },
  {
    id: 13,
    type: 'info',
    title: 'O Método MENTE MAGRA',
    subtitle: 'O Método MENTE MAGRA ajuda a gerenciar sua relação com a comida “corrigindo” a falha de comunicação entre seu cérebro e seu estômago. Vamos começar aprendendo mais sobre você para avaliar se o Método MENTE MAGRA também pode te ajudar.',
    image: 'https://hypnozio.com/hypnozio/quiz/brain-and-stomach2.jpg',
    buttonText: 'Continuar'
  },
  {
    id: 14,
    type: 'multi-select',
    title: 'Quais hábitos alimentares você acha que dificultam a perda de peso?',
    subtitle: 'Escolha quantas opções quiser',
    options: [
      { label: 'Porções grandes', value: 'porcoes' },
      { label: 'Lanches frequentes', value: 'lanches' },
      { label: 'Consumo alto de açúcar', value: 'acucar' },
      { label: 'Escolhas alimentares pouco saudáveis', value: 'nao_saudavel' },
      { label: 'Comer por emoção', value: 'emocao' },
      { label: 'Comer em excesso', value: 'excesso' },
      { label: 'Outro', value: 'outro' }
    ],
    buttonText: 'Continuar'
  },
  {
    id: 15,
    type: 'multi-select',
    title: 'Quais desejos são mais difíceis de resistir?',
    subtitle: 'Escolha quantas opções quiser',
    options: [
      { label: 'Doces (chocolate, balas, etc.)', value: 'doces' },
      { label: 'Salgados (batata frita, salgadinhos, etc.)', value: 'salgados' },
      { label: 'Carboidratos (pão, massa, etc.)', value: 'carboidratos' },
      { label: 'Fast food', value: 'fast_food' },
      { label: 'Desejos emocionais (estresse, tédio)', value: 'emocional' },
      { label: 'Outro', value: 'outro' }
    ],
    buttonText: 'Continuar'
  },
  {
    id: 16,
    type: 'info',
    title: 'Conexão Cérebro-Intestino',
    subtitle: 'O ganho de peso vai além da força de vontade. Para muitos, o verdadeiro problema é a desconexão entre o cérebro e o corpo - uma falha de comunicação que confunde fome, desejos e saciedade. Essa falha de comunicação entre estômago e cérebro é um fator importante no excesso de peso. Entender e curar essa conexão é fundamental para uma perda de peso duradoura e para melhorias físicas e mentais. Se você já sentiu “frio na barriga” ao ficar nervoso, então já percebeu os efeitos dessa conexão.',
    image: 'https://hypnozio.com/hypnozio/quiz/brain-and-guts.jpg',
    buttonText: 'Continuar'
  },
  {
    id: 17,
    type: 'single-select',
    title: 'Qual é o seu nível típico de atividade física?',
    options: [
      { label: 'Pouco ativo – passo a maior parte do tempo sentado ou relaxando.', value: 'pouco' },
      { label: 'Um pouco ativo – me movimento de vez em quando.', value: 'um_pouco' },
      { label: 'Ativo – faço exercícios ou caminhadas algumas vezes na semana.', value: 'ativo' },
      { label: 'Bem ativo – me movimento ou me exercito na maioria dos dias.', value: 'bem_ativo' },
      { label: 'Super ativo – estou sempre fazendo algo físico.', value: 'super' }
    ]
  },
  {
    id: 18,
    type: 'multi-select',
    title: 'Ótimo, agora sabemos um pouco sobre sua experiência atual com a comida e como isso impacta sua vida. Imagine-se daqui a 6 semanas: como você gostaria de se sentir?',
    subtitle: 'Escolha quantas opções quiser',
    options: [
      { label: 'Confortável fisicamente', value: 'confortavel' },
      { label: 'No controle do meu peso', value: 'controle' },
      { label: 'Mais saudável no meu corpo', value: 'saudavel' },
      { label: 'Confiante em mim mesmo', value: 'confiante' },
      { label: 'Não tenho certeza', value: 'nao_sei' }
    ],
    buttonText: 'Continuar'
  },
  {
    id: 19,
    type: 'inputs',
    title: 'Insira suas medidas',
    subtitle: 'Seus dados pessoais estão seguros conosco. Não enviamos spam nem compartilhamos e-mails com terceiros.',
    buttonText: 'Continuar'
  },
  {
    id: 20,
    type: 'graph-preview',
    title: 'A maioria das soluções para emagrecimento não aborda a verdadeira causa do excesso de peso, como a falha de comunicação entre cérebro e estômago. A hipnoterapia é diferente.',
    subtitle: 'De acordo com estudos clínicos, a hipnoterapia resolve essa falha de comunicação.',
    buttonText: 'Continuar'
  },
  {
    id: 21,
    type: 'multi-select',
    title: 'O que você gostaria de fazer se estivesse no seu peso desejado?',
    subtitle: 'Escolha quantas opções quiser',
    options: [
      { label: 'Aproveitar a vida social / relacionamentos', value: 'social' },
      { label: 'Dormir melhor', value: 'dormir' },
      { label: 'Viajar com confiança', value: 'viajar' },
      { label: 'Praticar meu esporte favorito', value: 'esporte' },
      { label: 'Estar mais presente no trabalho', value: 'trabalho' },
      { label: 'Não tenho certeza', value: 'nao_sei' }
    ],
    buttonText: 'Continuar'
  },
  {
    id: 22,
    type: 'single-select',
    title: 'Quanto tempo você poderia dedicar por dia para gerenciar seus problemas com peso?',
    options: [
      { label: '15 minutos', value: '15' },
      { label: '15-30 minutos', value: '15-30' },
      { label: '30-60 minutos', value: '30-60' },
      { label: 'Mais de 1 hora', value: '60+' }
    ]
  },
  {
    id: 23,
    type: 'info',
    title: 'O Hipnoterapia pode te ajudar a controlar seu peso em apenas 15 minutos por dia.',
    subtitle: 'Você receberá um programa personalizado de hipnoterapia, criado por nossa equipe de hipnoterapeutas experientes, projetado para melhorar sua relação com a comida e te ajudar a alcançar seu peso desejado. A melhor parte? Não há necessidade de medidas drásticas, como terapia presencial ou grupos de apoio, se você não estiver pronto. Basta relaxar e aproveitar suas sessões em casa.',
    image: 'https://i.imgur.com/52gwXD4.png',
    buttonText: 'Continuar'
  },
  {
    id: 24,
    type: 'loading',
    title: 'Estamos analisando suas respostas e fazendo seu plano personalizado...',
    buttonText: ''
  },
  // --- New Post-Loading Steps ---
  {
    id: 25,
    type: 'analysis-success',
    title: 'SUCESSO ! O Método MENTE MAGRA vai funcionar para você !',
    buttonText: 'Continuar'
  },
  {
    id: 26,
    type: 'graph-preview',
    // Text updated to match user request precisely
    title: 'Você vai perder (kg) até (data)!', 
    subtitle: 'Comece a ver resultados nos primeiros 7 dias!',
    buttonText: 'Continuar'
  },
  {
    id: 27,
    type: 'benefits-list',
    title: 'Além da perda de peso',
    subtitle: 'Você verá melhorias nestas áreas:',
    buttonText: 'Continuar'
  },
  {
    id: 28,
    type: 'info',
    title: 'Taxa de sucesso de 93%',
    subtitle: 'Baseado em ciência, verificado por usuários',
    // We can use the image field for the specialist image or insert it in the component
    buttonText: 'Continuar'
  },
  {
    id: 29,
    type: 'sales',
    title: 'Seu plano está pronto!',
    buttonText: ''
  }
];

export const TESTIMONIALS = [
  { name: "Maria S.", stars: 5, text: "Eu finalmente consegui perder peso sem me sentir privada de comer o que gosto." },
  { name: "João P.", stars: 5, text: "O Método MENTE MAGRA mudou minha vida. Perdi 10kg em 2 meses!" },
  { name: "Ana Clara", stars: 5, text: "Incrível como a hipnose funciona. Me sinto muito mais confiante." },
  { name: "Roberto M.", stars: 5, text: "Recomendo para todos que já tentaram de tudo e falharam." }
];