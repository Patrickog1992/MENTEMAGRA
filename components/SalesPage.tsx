import React, { useState, useEffect, useRef } from 'react';
import { UserData } from '../types';
import { QUIZ_STEPS } from '../constants';
import { Check, ChevronDown, ChevronUp, Lock, ShieldCheck, Star } from 'lucide-react';

interface Props {
  userData: UserData;
}

const SalesPage: React.FC<Props> = ({ userData }) => {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // --- Countdown Timer State ---
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // --- Notification Popup State ---
  const [showNotification, setShowNotification] = useState(false);
  const [notificationName, setNotificationName] = useState("");
  
  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  // --- Timer Logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // --- Notification Logic ---
  const recentBuyers = [
    "Ana Paula M.", "Mariana S.", "Carla J.", "Fernanda O.", "Juliana P.", 
    "Beatriz L.", "Patrícia C.", "Roberta M.", "Camila R.", "Larissa S."
  ];

  useEffect(() => {
    const notifyLoop = () => {
      // Pick random name
      const randomName = recentBuyers[Math.floor(Math.random() * recentBuyers.length)];
      setNotificationName(randomName);
      setShowNotification(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    };

    // Initial delay
    const initialTimeout = setTimeout(notifyLoop, 2000);

    // Loop every 10 seconds
    const interval = setInterval(notifyLoop, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // --- Helpers to map user values to labels ---
  const getOptionLabel = (stepId: number, value: string) => {
    const step = QUIZ_STEPS.find(s => s.id === stepId);
    if (!step || !step.options) return value;
    const option = step.options.find(o => o.value === value);
    return option ? option.label : value; 
  };

  // Get dynamic values based on specific user answers
  const objective = userData.reasons?.[0] ? getOptionLabel(5, userData.reasons[0]) : 'Perder peso e melhorar saúde';
  const challenge = userData.cravings?.[0] ? getOptionLabel(15, userData.cravings[0]) : 'Doces e carboidratos';
  const habit = userData.badHabits?.[0] ? getOptionLabel(14, userData.badHabits[0]) : 'Comer em excesso à noite';
  const symptom = userData.physicalDiffs?.[0] ? getOptionLabel(11, userData.physicalDiffs[0]) : 'Fadiga e cansaço constante';
  const time = userData.timeDedication ? getOptionLabel(22, userData.timeDedication) : '15-30 minutos';

  // --- Auto-scroll for testimonials ---
  useEffect(() => {
    const scrollContainer = carouselRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1; 
    const delay = 20; 
    let scrollInterval: any;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          scrollContainer.scrollLeft += scrollStep;
          scrollAmount += scrollStep;
          
          if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth - 10)) {
             scrollContainer.scrollLeft = 0;
             scrollAmount = 0;
          }
        }
      }, delay);
    };

    startScrolling();

    return () => clearInterval(scrollInterval);
  }, []);

  const detailedTestimonials = [
    {
      img: "https://i.imgur.com/ipOh27y.jpg",
      name: "Fernanda O.",
      text: "Eu sempre comia quando estava ansiosa. O Método me ensinou a controlar isso. 4kg a menos em 3 semanas!"
    },
    {
      img: "https://i.imgur.com/AJCfcXk.jpg",
      name: "Juliana M.",
      text: "Já tinha tentado de tudo. Com a hipnose, a mudança veio de dentro. Entrei naquela calça jeans antiga!"
    },
    {
      img: "https://i.imgur.com/BTYdqvQ.jpg",
      name: "Carla S.",
      text: "Incrível como 15 min por dia mudam tudo. Minha relação com a comida é outra. Recomendo demais!"
    },
    {
      img: "https://i.imgur.com/Kd5Dboy.jpg",
      name: "Patrícia L.",
      text: "Achei que não ia funcionar, mas na primeira semana já senti diferença na saciedade. Mais energia!"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-16 pb-24 font-poppins animate-fade-in pt-12">
      
      {/* --- STATIC HEADER (TIMER) - Absolute position to be at the top of the page but scroll away --- */}
      <div className="absolute top-0 left-0 w-full bg-red-600 text-white z-[60] py-3 text-center shadow-lg px-2">
        <p className="text-xs md:text-sm font-medium leading-tight">
          Você acabou de receber 70% de desconto que expira em : <span className="text-yellow-300 text-lg md:text-xl font-black inline-block min-w-[60px] ml-1">{formatTime(timeLeft)}</span>
        </p>
      </div>

      {/* --- POPUP NOTIFICATION - Smaller size but slightly wider for full name --- */}
      <div 
        className={`fixed top-14 right-2 z-[50] bg-white rounded-lg shadow-xl p-2 flex items-center gap-2 border-l-2 border-green-500 transition-all duration-500 transform w-auto max-w-[240px] ${
          showNotification ? 'translate-x-0 opacity-100' : 'translate-x-[200%] opacity-0'
        }`}
      >
        <div className="bg-green-100 p-1.5 rounded-full shrink-0">
          <Check size={12} className="text-green-600" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-800 leading-tight">{notificationName}</p>
          <p className="text-[9px] text-gray-500 font-medium leading-none mt-0.5">recebeu o Método MENTE MAGRA</p>
        </div>
      </div>

      {/* SECTION 1: Plan Visuals */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 leading-tight px-4">
          Aqui está o seu <span className="text-violet-600">PLANO PESSOAL</span> para alcançar o seu peso ideal.
        </h2>
        
        {/* Changed to grid-cols-2 to allow side-by-side on mobile */}
        <div className="grid grid-cols-2 gap-3 md:gap-8 items-start px-2 md:px-0">
           {/* BEFORE CARD */}
           <div className="space-y-2 md:space-y-4">
             <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img src="https://i.imgur.com/2vjQaB0.jpeg" className="w-full h-40 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110" alt="Antes" />
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-red-600 text-white px-2 py-0.5 md:px-4 md:py-1 font-bold rounded-md text-[10px] md:text-sm shadow-lg uppercase tracking-wider">AGORA</div>
             </div>
             <ul className="space-y-1.5 md:space-y-3 bg-red-50 p-3 md:p-6 rounded-xl md:rounded-2xl border border-red-100 text-[10px] md:text-base">
               <li className="flex gap-2 items-center font-medium text-gray-700 leading-tight"><div className="min-w-[6px] h-[6px] md:min-w-[8px] md:h-[8px] rounded-full bg-red-500"/>Metabolismo lento</li>
               <li className="flex gap-2 items-center font-medium text-gray-700 leading-tight"><div className="min-w-[6px] h-[6px] md:min-w-[8px] md:h-[8px] rounded-full bg-red-500"/>Fome emocional</li>
               <li className="flex gap-2 items-center font-medium text-gray-700 leading-tight"><div className="min-w-[6px] h-[6px] md:min-w-[8px] md:h-[8px] rounded-full bg-red-500"/>Baixa energia</li>
             </ul>
           </div>
           
           {/* AFTER CARD */}
           <div className="space-y-2 md:space-y-4">
             <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 md:border-4 border-green-400 group">
                <img src="https://i.imgur.com/TYvuBmJ.jpeg" className="w-full h-40 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110" alt="Depois" />
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-green-600 text-white px-2 py-0.5 md:px-4 md:py-1 font-bold rounded-md text-[10px] md:text-sm shadow-lg uppercase tracking-wider">DEPOIS</div>
             </div>
             <ul className="space-y-1.5 md:space-y-3 bg-green-50 p-3 md:p-6 rounded-xl md:rounded-2xl border border-green-100 text-[10px] md:text-base">
               <li className="flex gap-2 items-center font-bold text-gray-800 leading-tight"><Check className="text-green-500 w-3 h-3 md:w-6 md:h-6"/>Metabolismo rápido</li>
               <li className="flex gap-2 items-center font-bold text-gray-800 leading-tight"><Check className="text-green-500 w-3 h-3 md:w-6 md:h-6"/>Controle da fome</li>
               <li className="flex gap-2 items-center font-bold text-gray-800 leading-tight"><Check className="text-green-500 w-3 h-3 md:w-6 md:h-6"/>Autoestima alta</li>
             </ul>
           </div>
        </div>

        <div className="bg-violet-50 p-4 md:p-6 rounded-2xl border-l-4 md:border-l-8 border-violet-600 shadow-md mx-4 md:mx-0">
          <p className="text-center font-bold text-violet-800 text-sm md:text-lg">
            94% das pessoas com perfis semelhantes ao seu percebem resultados em apenas 2 semanas com o Método MENTE MAGRA
          </p>
        </div>
      </section>

      {/* SECTION 2: Analysis & Features */}
      <section className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 mx-2 md:mx-0">
        <h3 className="text-xl md:text-2xl font-bold mb-8 text-center text-gray-800">Nosso algoritmo inteligente criou um plano personalizado com base nos seus objetivos.</h3>
        
        <div className="space-y-6 md:space-y-8 mb-12">
           <h4 className="text-lg md:text-xl font-black text-gray-800 border-b pb-4">Sua Análise Personalizada</h4>
           <div className="grid gap-4 md:gap-6">
             {/* Objective */}
             <div className="flex gap-3 md:gap-4 items-start p-4 bg-gray-50 rounded-2xl border border-gray-100">
               <div className="bg-violet-100 p-2 rounded-xl shrink-0"><Check className="text-violet-600 w-5 h-5 md:w-6 md:h-6"/></div>
               <div>
                 <h4 className="font-bold text-gray-800 text-base md:text-lg">Objetivo: <span className="text-violet-700">{objective}</span></h4>
                 <p className="text-sm md:text-base text-gray-600 mt-1">Identificamos que seu foco principal está alinhado com nosso protocolo de reprogramação de autoimagem.</p>
               </div>
             </div>
             {/* Challenge */}
             <div className="flex gap-3 md:gap-4 items-start p-4 bg-gray-50 rounded-2xl border border-gray-100">
               <div className="bg-violet-100 p-2 rounded-xl shrink-0"><Check className="text-violet-600 w-5 h-5 md:w-6 md:h-6"/></div>
               <div>
                 <h4 className="font-bold text-gray-800 text-base md:text-lg">Desafio: <span className="text-violet-700">{challenge}</span></h4>
                 <p className="text-sm md:text-base text-gray-600 mt-1">Seus desejos específicos serão tratados com técnicas de aversão e substituição de prazer.</p>
               </div>
             </div>
             {/* Habit */}
             <div className="flex gap-3 md:gap-4 items-start p-4 bg-gray-50 rounded-2xl border border-gray-100">
               <div className="bg-violet-100 p-2 rounded-xl shrink-0"><Check className="text-violet-600 w-5 h-5 md:w-6 md:h-6"/></div>
               <div>
                 <h4 className="font-bold text-gray-800 text-base md:text-lg">Hábito: <span className="text-violet-700">{habit}</span></h4>
                 <p className="text-sm md:text-base text-gray-600 mt-1">A quebra deste padrão neural é a prioridade na sua primeira semana.</p>
               </div>
             </div>
             {/* Symptom */}
             <div className="flex gap-3 md:gap-4 items-start p-4 bg-gray-50 rounded-2xl border border-gray-100">
               <div className="bg-violet-100 p-2 rounded-xl shrink-0"><Check className="text-violet-600 w-5 h-5 md:w-6 md:h-6"/></div>
               <div>
                 <h4 className="font-bold text-gray-800 text-base md:text-lg">Sintoma: <span className="text-violet-700">{symptom}</span></h4>
                 <p className="text-sm md:text-base text-gray-600 mt-1">Com a perda de peso projetada, a pressão sobre seu sistema diminuirá drasticamente.</p>
               </div>
             </div>
             {/* Time */}
             <div className="flex gap-3 md:gap-4 items-start p-4 bg-gray-50 rounded-2xl border border-gray-100">
               <div className="bg-violet-100 p-2 rounded-xl shrink-0"><Check className="text-violet-600 w-5 h-5 md:w-6 md:h-6"/></div>
               <div>
                 <h4 className="font-bold text-gray-800 text-base md:text-lg">Tempo disponível: <span className="text-violet-700">{time}</span></h4>
                 <p className="text-sm md:text-base text-gray-600 mt-1">Seu plano foi condensado para caber exatamente na sua rotina diária.</p>
               </div>
             </div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-center mb-12">
            <div className="bg-violet-50 p-4 md:p-6 rounded-2xl border border-violet-100">
               <p className="font-bold text-violet-800 text-sm md:text-base">Plano avançado de reprogramação mental — apenas 15 minutos por dia</p>
            </div>
            <div className="bg-violet-50 p-4 md:p-6 rounded-2xl border border-violet-100">
               <p className="font-bold text-violet-800 text-sm md:text-base">Atuação completa nas principais áreas do emagrecimento consciente</p>
            </div>
            <div className="bg-violet-50 p-4 md:p-6 rounded-2xl border border-violet-100">
               <p className="font-bold text-violet-800 text-sm md:text-base">Ferramentas práticas e suporte para fortalecer sua disciplina e constância</p>
            </div>
            <div className="bg-violet-50 p-4 md:p-6 rounded-2xl border border-violet-100">
               <p className="font-bold text-violet-800 text-sm md:text-base">Conteúdo desenvolvido com especialistas em hipnoterapia e comportamento</p>
            </div>
        </div>

        <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-inner">
           <h2 className="text-xl md:text-2xl font-bold text-center mb-8 uppercase tracking-wide text-violet-300">O QUE VOCÊ VAI RECEBER?</h2>
           <div className="space-y-4 md:space-y-5">
             {[
               "Programa avançado de hipnoterapia, com sessões diárias guiadas para reprogramar sua relação com a comida.",
               "Ativação do controle alimentar, ajudando você a reduzir compulsões, exageros e desejos automáticos.",
               "Técnicas de respiração e relaxamento, que diminuem ansiedade, estresse e fome emocional.",
               "Programa de fortalecimento emocional, para aumentar sua autoconfiança, disciplina e foco em resultados.",
               "Orientações personalizadas, baseadas no seu perfil, objetivos e hábitos diários."
             ].map((item, i) => (
               <div key={i} className="flex gap-3 md:gap-4 items-start">
                 <div className="min-w-6 min-h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 shrink-0">
                   <Check size={14} className="text-white font-bold" />
                 </div>
                 <p className="text-gray-200 font-medium text-sm md:text-lg leading-relaxed">{item}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* SECTION 3: Video Mockup */}
      <section className="flex flex-col items-center py-8 px-4">
         <div className="text-center mb-6 space-y-2">
           <h2 className="text-2xl font-black text-gray-800">Ainda com dúvidas?</h2>
           <p className="text-violet-600 font-bold text-lg animate-pulse">Dê play e escute um pequeno exemplo!</p>
         </div>
         {/* Increased scale on mobile slightly so it's not too small */}
         <div className="relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[10px] md:border-[14px] rounded-[2rem] md:rounded-[2.5rem] h-[500px] md:h-[600px] w-[260px] md:w-[300px] shadow-2xl">
            <div className="w-[120px] md:w-[148px] h-[14px] md:h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
            <div className="rounded-[1.5rem] md:rounded-[2rem] overflow-hidden w-full h-full bg-black relative">
               <video 
                 src="https://i.imgur.com/yf59a1N.mp4" 
                 className="w-full h-full object-cover" 
                 controls 
                 playsInline
                 preload="metadata"
               ></video>
            </div>
        </div>
      </section>

      {/* SECTION 4: Testimonials (REDESIGNED) */}
      <section className="bg-gray-50 py-12 -mx-4 px-4 md:px-0">
        <div className="text-center space-y-2 px-4 mb-8">
           <h2 className="text-2xl md:text-3xl font-bold text-gray-800">O que dizem os nossos alunos</h2>
           <p className="text-violet-600 font-bold text-lg">Aprovado por mais de 15 mil alunos</p>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div 
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-4 items-stretch"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {detailedTestimonials.map((item, i) => (
             <div 
                key={i} 
                className="w-[280px] shrink-0 bg-white rounded-3xl shadow-md border border-gray-100 flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
             >
                {/* Image Container - Square Aspect Ratio */}
                <div className="relative w-full aspect-square bg-gray-200">
                   <img 
                      src={item.img} 
                      className="w-full h-full object-cover" 
                      alt={`Aluno ${item.name}`} 
                      loading="lazy"
                      decoding="async"
                   />
                   <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent"></div>
                   <p className="absolute bottom-3 left-4 text-white font-bold text-lg drop-shadow-md">{item.name}</p>
                </div>
                
                {/* Text Content */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex text-yellow-400 mb-2 space-x-1">
                      {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" size={16} />)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed italic">"{item.text}"</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase tracking-wide">
                     <ShieldCheck size={12} /> Compra Verificada
                  </div>
                </div>
             </div>
          ))}
          {/* Duplicating for seamless loop visual effect */}
          {detailedTestimonials.map((item, i) => (
             <div 
                key={`dup-${i}`} 
                className="w-[280px] shrink-0 bg-white rounded-3xl shadow-md border border-gray-100 flex flex-col overflow-hidden"
             >
                <div className="relative w-full aspect-square bg-gray-200">
                   <img 
                      src={item.img} 
                      className="w-full h-full object-cover" 
                      alt={`Aluno ${item.name}`} 
                      loading="lazy"
                   />
                   <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent"></div>
                   <p className="absolute bottom-3 left-4 text-white font-bold text-lg drop-shadow-md">{item.name}</p>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex text-yellow-400 mb-2 space-x-1">
                      {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" size={16} />)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed italic">"{item.text}"</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase tracking-wide">
                     <ShieldCheck size={12} /> Compra Verificada
                  </div>
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Value Anchor */}
      <section className="text-center space-y-4 py-8 px-4">
        <h2 className="text-2xl md:text-3xl font-black text-gray-800">E O MELHOR?</h2>
        <div className="bg-yellow-100 inline-block px-6 py-3 md:px-8 md:py-4 rounded-full border-2 border-yellow-400 transform -rotate-2 shadow-lg">
           <p className="text-lg md:text-2xl font-bold text-yellow-800 uppercase">Tudo isso custa menos que uma PIZZA.</p>
        </div>
        <p className="text-lg md:text-xl text-gray-600 px-4">Invista em você e conquiste a transformação que você realmente merece.</p>
      </section>

      {/* SECTION 6: Timeline */}
      <section className="bg-violet-900 text-white p-6 md:p-12 rounded-[2.5rem] space-y-10 shadow-2xl mx-2 md:mx-0">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Sua jornada de transformação</h2>
        <div className="space-y-12 relative before:absolute before:left-3 md:before:left-8 before:top-4 before:bottom-4 before:w-1 before:bg-violet-700">
           <div className="relative pl-12 md:pl-24">
             <div className="absolute left-0.5 md:left-5.5 top-0 w-6 h-6 bg-violet-400 rounded-full border-4 border-violet-900 box-content shadow-[0_0_15px_rgba(167,139,250,0.5)]"></div>
             <h3 className="font-extrabold text-xl md:text-2xl text-violet-100 mb-2">7 Dias — Primeira Semana</h3>
             <p className="text-violet-200 text-sm md:text-lg leading-relaxed">Você começa a sentir mais controle sobre sua alimentação. A ansiedade diminui, sua clareza aumenta e você percebe que está mais consciente das suas escolhas.</p>
           </div>
           <div className="relative pl-12 md:pl-24">
             <div className="absolute left-0.5 md:left-5.5 top-0 w-6 h-6 bg-violet-400 rounded-full border-4 border-violet-900 box-content shadow-[0_0_15px_rgba(167,139,250,0.5)]"></div>
             <h3 className="font-extrabold text-xl md:text-2xl text-violet-100 mb-2">14 Dias — Segunda Semana</h3>
             <p className="text-violet-200 text-sm md:text-lg leading-relaxed">Seu corpo começa a responder. Suas roupas já vestem melhor, sua postura muda e as pessoas ao seu redor percebem: <br/><span className="italic text-white">“Você está diferente… parece mais leve e confiante.”</span></p>
           </div>
           <div className="relative pl-12 md:pl-24">
             <div className="absolute left-0.5 md:left-5.5 top-0 w-6 h-6 bg-violet-400 rounded-full border-4 border-violet-900 box-content shadow-[0_0_15px_rgba(167,139,250,0.5)]"></div>
             <h3 className="font-extrabold text-xl md:text-2xl text-violet-100 mb-2">21 Dias — Terceira Semana</h3>
             <p className="text-violet-200 text-sm md:text-lg leading-relaxed">Os resultados ficam evidentes. Mais disciplina, mais energia, mais autoestima. <br/><span className="italic text-white">“Uau, como você conseguiu essa mudança tão rápido?”</span></p>
           </div>
        </div>
      </section>

      {/* SECTION 7: Bonuses */}
      <section className="space-y-8 px-2 md:px-0">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">🎁 Ganhe 5 BÔNUS EXCLUSIVOS</h2>
          <p className="text-red-500 font-bold animate-pulse text-base md:text-lg">⏰ ÚLTIMAS 5 VAGAS DISPONÍVEIS</p>
        </div>
        
        <div className="grid gap-4">
          {[
            { 
              title: "BÔNUS 1: Plano de Aceleração do Emagrecimento em 30 Dias", 
              desc: "Protocolo estratégico para potencializar seus resultados.",
              price: "R$ 97" 
            },
            { 
              title: "BÔNUS 2: Treinamento Diário de Foco e Disciplina", 
              desc: "Fortaleça sua mentalidade e reduza a procrastinação.",
              price: "R$ 67" 
            },
            { 
              title: "BÔNUS 3: Método Antiansiedade Alimentar", 
              desc: "Reduza compulsões, estresse e gatilhos emocionais em apenas 15 minutos por dia.",
              price: "R$ 87" 
            },
            { 
              title: "BÔNUS 4: Aula Especial: Quebra de Hábitos Sabotadores", 
              desc: "Identifique e elimine comportamentos que impedem seu emagrecimento.",
              price: "R$ 127" 
            },
            { 
              title: "BÔNUS 5: Comunidade Fechada MENTE MAGRA", 
              desc: "Acesso exclusivo para suporte, motivação e acompanhamento.",
              price: "R$ 97" 
            }
          ].map((bonus, i) => (
            <div key={i} className="bg-white p-4 md:p-6 rounded-2xl border-2 border-dashed border-violet-200 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-violet-500 transition-colors">
               <div>
                 <span className="text-[10px] md:text-xs font-black text-white bg-violet-600 px-2 py-1 rounded mb-2 inline-block">🎁 {bonus.title.split(':')[0]}</span>
                 <h4 className="font-bold text-gray-800 text-base md:text-lg leading-tight">{bonus.title.split(':')[1]}</h4>
                 <p className="text-sm text-gray-600 mt-1">{bonus.desc}</p>
               </div>
               <div className="text-left md:text-right min-w-[100px]">
                 <span className="text-sm text-gray-400 line-through block font-medium">Valor</span>
                 <span className="text-xl md:text-2xl text-green-600 font-black">{bonus.price}</span>
               </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-3xl border border-yellow-200 shadow-md">
          <p className="text-gray-500 text-base md:text-lg font-medium">💰 Valor total dos bônus: <span className="line-through decoration-red-500 decoration-2">R$ 475</span></p>
          <p className="text-green-600 font-black text-xl md:text-3xl mt-2 tracking-tight uppercase">LEVANDO O MÉTODO MENTE MAGRA HOJE : TOTALMENTE GRATUITO</p>
        </div>
      </section>

      {/* SECTION 8: Offer & CTA (GREEN THEME) */}
      <section className="relative transform transition-all hover:-translate-y-2 duration-500 mx-2 md:mx-0">
         <div className="absolute inset-0 bg-green-600 rounded-[3rem] blur-xl opacity-20"></div>
         <div className="relative bg-green-50 rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white ring-1 ring-green-100">
             {/* Header */}
             <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 text-center">
               <h3 className="font-black text-xl md:text-2xl tracking-widest">OFERTA ESPECIAL</h3>
             </div>
             
             {/* Body */}
             <div className="p-6 md:p-12 text-center space-y-6 md:space-y-8">
                <div className="space-y-2">
                  {/* Prices */}
                  <p className="text-red-600 text-lg md:text-xl font-bold line-through">De R$ 497,00</p>
                  <p className="text-xl md:text-2xl text-gray-600 font-bold">✅ Por apenas</p>
                  <p className="text-6xl md:text-8xl font-black text-green-600 tracking-tighter">R$ 47,00</p>
                  
                  {/* Payment Badge */}
                  <p className="text-green-700 font-bold bg-green-100 inline-block px-4 py-1 md:px-6 md:py-2 rounded-full text-xs md:text-sm uppercase tracking-wide border border-green-200 mt-2">
                    Pagamento único • Acesso vitalício
                  </p>
                </div>
                
                <p className="text-gray-600 text-base md:text-lg max-w-lg mx-auto">Transforme sua relação com a comida, ative sua Mente Magra e comece a emagrecer ainda hoje.</p>
                
                {/* Button */}
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-5 md:py-6 px-4 md:px-6 rounded-2xl text-lg md:text-2xl shadow-[0_10px_30px_rgba(34,197,94,0.4)] transition-all active:scale-95 animate-pulse uppercase">
                  QUERO O MÉTODO MENTE MAGRA AGORA!
                </button>
                
                {/* Security Icons */}
                <div className="flex flex-col md:flex-row justify-center gap-4 text-sm text-gray-500 font-medium pt-2">
                   <span className="flex items-center justify-center gap-2"><ShieldCheck size={16} className="text-green-500"/> Compra Segura</span>
                   <span className="flex items-center justify-center gap-2"><Lock size={16} className="text-green-500"/> Privacidade Protegida</span>
                </div>
             </div>
         </div>
      </section>

      {/* SECTION 9: Guarantee */}
      <section className="bg-white p-8 md:p-12 rounded-[2.5rem] text-center border-2 border-gray-100 shadow-lg mx-2 md:mx-0">
        <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-gray-900 text-white rounded-full flex items-center justify-center text-3xl md:text-4xl font-black mb-6 shadow-lg">30</div>
        <h3 className="text-xl md:text-3xl font-black text-gray-800 uppercase mb-4">🛡️ GARANTIA TOTAL — RISCO ZERO</h3>
        <div className="max-w-2xl mx-auto space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
          <p>Você tem 30 dias completos para colocar o Método MENTE MAGRA em prática.</p>
          <p>Se, por qualquer motivo, você não sentir mais controle sobre a alimentação, mais clareza mental e evolução no seu processo de emagrecimento, basta enviar um e-mail ou mensagem — e devolvemos 100% do seu dinheiro.</p>
          <p className="font-bold text-gray-800">Sem perguntas. Sem burocracia.</p>
        </div>
      </section>

      {/* SECTION 10: Comparison Table */}
      <section className="space-y-8 px-2 md:px-0">
         <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">📊 Compare os custos para tentar emagrecer</h2>
         <div className="space-y-4">
           {[
             { icon: "💊", title: "Remédios e suplementos (1 mês)", cost: "R$ 1.500", desc: "Efeito temporário, possíveis efeitos colaterais e dependência.", neg: true },
             { icon: "👨‍⚕️", title: "Nutricionistas e terapias particulares", cost: "R$ 800 por consulta", desc: "Resultados variam, acompanhamento limitado e alto custo recorrente.", neg: true },
             { icon: "🏋️‍♀️", title: "Academia + Personal Trainer", cost: "R$ 1.200 por mês", desc: "Exige muito tempo, deslocamento e nem sempre resolve o problema emocional.", neg: true },
             { icon: "💉", title: "Tratamentos clínicos avançados", cost: "R$ 20.000", desc: "Custos elevados, riscos e resultados imprevisíveis.", neg: true },
             { icon: "🧠", title: "Método MENTE MAGRA", cost: "Apenas R$ 47,00", desc: "Pagamento único • Sem mensalidades", neg: false }
           ].map((item, i) => (
             <div key={i} className={`p-4 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${item.neg ? 'bg-gray-50 text-gray-500 grayscale' : 'bg-green-50 border-2 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)] transform scale-100 md:scale-105 z-10'}`}>
                <div className="flex items-start gap-4">
                  <span className="text-2xl md:text-3xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-base md:text-xl text-gray-800">{item.title}</h4>
                    <p className="text-xs md:text-sm mt-1 leading-snug">{item.desc}</p>
                  </div>
                </div>
                <div className="md:text-right min-w-[150px]">
                  <span className={`font-black text-lg md:text-2xl ${item.neg ? 'text-gray-400' : 'text-green-600'}`}>{item.cost}</span>
                </div>
             </div>
           ))}
         </div>
      </section>

      {/* SECTION 11: Final Choice */}
      <section className="bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] space-y-10 text-center shadow-2xl mx-2 md:mx-0">
        <h2 className="text-2xl md:text-4xl font-black">🚦 Agora você tem 2 escolhas…</h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-red-500/10 border border-red-500/30 p-6 md:p-8 rounded-3xl hover:bg-red-500/20 transition-colors">
             <h4 className="font-bold text-red-400 text-lg md:text-xl mb-3">❌ 1. Continuar preso aos mesmos hábitos</h4>
             <p className="text-gray-300 leading-relaxed text-sm md:text-base">Tentando resolver sozinho, repetindo padrões que te afastam do seu peso ideal.</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 p-6 md:p-8 rounded-3xl hover:bg-green-500/20 transition-colors">
             <h4 className="font-bold text-green-400 text-lg md:text-xl mb-3">✅ 2. Começar hoje com o Método MENTE MAGRA</h4>
             <p className="text-gray-300 leading-relaxed text-sm md:text-base">Usando um método simples, prático e acessível que já ajudou milhares de pessoas a transformar sua relação com a comida.</p>
          </div>
        </div>
        <button className="w-full md:w-auto md:px-12 bg-green-500 hover:bg-green-600 text-white font-black py-5 md:py-6 rounded-2xl shadow-[0_10px_30px_rgba(34,197,94,0.4)] transition-all active:scale-95 text-lg md:text-xl uppercase animate-pulse">
          QUERO ENTRAR NO MÉTODO MENTE MAGRA AGORA!
        </button>
      </section>

      {/* SECTION 12: FAQ */}
      <section className="space-y-6 px-2 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">Perguntas Frequentes</h2>
        <div className="space-y-3">
          {[
            { q: "Como acesso o material?", a: "O acesso é enviado imediatamente para o seu e-mail após a confirmação do pagamento." },
            { q: "Preciso de equipamentos?", a: "Não, você só precisa do seu celular ou computador e fones de ouvido." },
            { q: "E se eu não gostar?", a: "Você tem 30 dias de garantia incondicional. Devolvemos seu dinheiro." },
            { q: "Serve para qualquer idade?", a: "Sim, o Método MENTE MAGRA é seguro e adaptável para adultos de todas as idades." },
            { q: "Quanto tempo por dia preciso?", a: "Apenas 15 minutos por dia são suficientes para começar a ver resultados." }
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-gray-800 hover:bg-gray-50 text-sm md:text-base"
              >
                {item.q}
                {faqOpen === i ? <ChevronUp size={20} className="text-violet-600" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              {faqOpen === i && (
                <div className="p-5 pt-0 text-gray-600 text-sm md:text-lg leading-relaxed bg-gray-50 border-t border-gray-100">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default SalesPage;