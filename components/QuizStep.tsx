
import React, { useState, useEffect } from 'react';
import { QuizStep as QuizStepType, UserData } from '../types';
import { ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props {
  step: QuizStepType;
  userData: UserData;
  onUpdate: (data: Partial<UserData>) => void;
  onNext: () => void;
}

const QuizStep: React.FC<Props> = ({ step, userData, onUpdate, onNext }) => {
  const [localMultiSelect, setLocalMultiSelect] = useState<string[]>([]);
  const [localHeight, setLocalHeight] = useState(userData.height || '');
  const [localWeight, setLocalWeight] = useState(userData.currentWeight || '');
  const [localTarget, setLocalTarget] = useState(userData.targetWeight || '');

  // CRITICAL FIX: Reset local state when step changes to prevent pre-selected options
  useEffect(() => {
    setLocalMultiSelect([]);
    // Note: We don't reset inputs (height/weight) because we want them to persist if user goes back/forth
  }, [step.id]);

  // Helper calculation functions
  const calculateBMI = () => {
    if (!userData.height || !userData.currentWeight) return "25.0";
    const h = userData.height / 100;
    return (userData.currentWeight / (h * h)).toFixed(1);
  };

  const getBMIStatus = (bmiValue: string) => {
    const bmi = parseFloat(bmiValue);
    if (bmi < 18.5) return { text: "Abaixo do peso", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (bmi < 24.9) return { text: "Peso normal", color: "text-green-600", bg: "bg-green-50" };
    if (bmi < 29.9) return { text: "Sobrepeso", color: "text-orange-600", bg: "bg-orange-50" };
    if (bmi < 34.9) return { text: "Obesidade Grau I", color: "text-red-600", bg: "bg-red-50" };
    if (bmi < 39.9) return { text: "Obesidade Grau II", color: "text-red-700", bg: "bg-red-100" };
    return { text: "Obesidade Grau III", color: "text-red-800", bg: "bg-red-200" };
  };

  const getMetabolicAge = () => {
    let baseAge = 35;
    if (userData.ageRange === '18-30') baseAge = 24;
    if (userData.ageRange === '31-40') baseAge = 35;
    if (userData.ageRange === '41-50') baseAge = 45;
    if (userData.ageRange === '51-60') baseAge = 55;
    if (userData.ageRange === '61-70') baseAge = 65;
    if (userData.ageRange === '70+') baseAge = 75;

    const bmi = parseFloat(calculateBMI());
    if (bmi > 25) return baseAge + 8;
    return baseAge;
  };

  const getFutureDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const handleSingleSelect = (value: string) => {
    let key: keyof UserData = 'gender'; // default
    if (step.id === 2) key = 'gender';
    if (step.id === 3) key = 'ageRange';
    if (step.id === 6) key = 'knowsWhy';
    if (step.id === 10) key = 'struggleDuration';
    if (step.id === 17) key = 'activityLevel';
    if (step.id === 22) key = 'timeDedication';

    onUpdate({ [key]: value });
    onNext();
  };

  const toggleMultiSelect = (value: string) => {
    setLocalMultiSelect(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const submitMultiSelect = () => {
    let key: keyof UserData = 'reasons';
    if (step.id === 5) key = 'reasons';
    if (step.id === 8) key = 'weightCauses';
    if (step.id === 11) key = 'physicalDiffs';
    if (step.id === 12) key = 'lifeImpact';
    if (step.id === 14) key = 'badHabits';
    if (step.id === 15) key = 'cravings';
    if (step.id === 18) key = 'desiredFeelings';
    if (step.id === 21) key = 'postWeightAction';

    onUpdate({ [key]: localMultiSelect });
    onNext();
  };

  const submitInputs = () => {
    if (localHeight && localWeight && localTarget) {
      onUpdate({
        height: Number(localHeight),
        currentWeight: Number(localWeight),
        targetWeight: Number(localTarget)
      });
      onNext();
    }
  };

  if (step.type === 'intro' || step.type === 'info') {
    // Special handling for Step 28 (Authority) to match user text exactly
    if (step.id === 28) {
       return (
         <div className="flex flex-col items-center text-center max-w-md mx-auto space-y-6 animate-fade-in">
           <h2 className="text-3xl font-extrabold text-gray-800">{step.title}</h2>
           <p className="text-violet-600 font-bold text-lg uppercase">{step.subtitle}</p>
           
           <div className="text-left space-y-4 text-gray-700">
             <p>O Método MENTE MAGRA foi desenvolvido com os melhores especialistas em hipnoterapia, cada um trazendo sua própria expertise para garantir a eficácia de cada sessão.</p>
             <p>Pesquisas indicam que a hipnose apresenta uma taxa de sucesso notável de 93%, superando tanto a abordagem comportamental quanto a psicoterapêutica.</p>
             <p className="font-bold">Descubra o poder transformador da hipnoterapia sem restrições ou riscos. Incontáveis pessoas já atingiram seus objetivos com a hipnoterapia - convidamos você a ser uma delas!</p>
           </div>

           <div className="flex flex-col items-center gap-2 mt-4 bg-white p-6 rounded-2xl shadow-md border border-gray-100 w-full">
             <img src="https://bemestarfit.netlify.app/_next/image?url=https%3A%2F%2Fi.imgur.com%2F52gwXD4.png&w=256&q=75" alt="Suelen Costa" className="w-20 h-20 rounded-full border-4 border-violet-500" />
             <p className="font-bold text-lg">Suelen Costa</p>
             <p className="text-violet-600 font-bold text-sm">Chefe do Programa</p>
             <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold border border-green-200 mt-2">
               Aprovado
             </div>
             <p className="text-xs text-gray-500 italic">Desenvolvido com especialistas de hipnoterapia de alto nível</p>
           </div>

           <button 
             onClick={onNext}
             className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all"
           >
             {step.buttonText || 'Continuar'}
           </button>
         </div>
       );
    }

    return (
      <div className="flex flex-col items-center text-center max-w-md mx-auto space-y-6 animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">{step.title}</h2>
        {step.image && (
          <div className="relative w-full max-w-[350px] aspect-square md:aspect-video rounded-xl overflow-hidden shadow-lg mx-auto">
             <img src={step.image} alt={step.title} className="object-cover w-full h-full" />
          </div>
        )}
        {step.subtitle && <p className="text-gray-600 text-lg leading-relaxed">{step.subtitle}</p>}
        <button 
          onClick={onNext}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          {step.buttonText || 'Continuar'} <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  if (step.type === 'single-select') {
    return (
      <div className="flex flex-col max-w-md mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">{step.title}</h2>
        <div className="space-y-3">
          {step.options?.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSingleSelect(opt.value)}
              className="w-full text-left p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-violet-500 hover:bg-violet-50 transition-all font-medium text-lg text-gray-700 shadow-sm"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step.type === 'multi-select') {
    return (
      <div className="flex flex-col max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{step.title}</h2>
          {step.subtitle && <p className="text-violet-600 font-medium">{step.subtitle}</p>}
        </div>
        <div className="space-y-3">
          {step.options?.map((opt) => {
            const isSelected = localMultiSelect.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggleMultiSelect(opt.value)}
                className={`w-full text-left p-4 border-2 rounded-xl transition-all font-medium text-lg flex justify-between items-center shadow-sm ${
                  isSelected 
                    ? 'border-violet-600 bg-violet-50 text-violet-800' 
                    : 'border-gray-100 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {opt.label}
                {isSelected && <CheckCircle className="text-violet-600" size={24} />}
              </button>
            );
          })}
        </div>
        <button 
          onClick={submitMultiSelect}
          disabled={localMultiSelect.length === 0}
          className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all mt-6"
        >
          {step.buttonText || 'Continuar'}
        </button>
      </div>
    );
  }

  if (step.type === 'inputs') {
    return (
      <div className="flex flex-col max-w-md mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">{step.title}</h2>
        <div className="space-y-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Altura (cm)</label>
            <input 
              type="number" 
              value={localHeight} 
              onChange={(e) => setLocalHeight(e.target.value)} 
              placeholder="Ex: 175"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none transition-all text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Peso (kg)</label>
            <input 
              type="number" 
              value={localWeight} 
              onChange={(e) => setLocalWeight(e.target.value)} 
              placeholder="Ex: 80"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none transition-all text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Peso desejado (kg)</label>
            <input 
              type="number" 
              value={localTarget} 
              onChange={(e) => setLocalTarget(e.target.value)} 
              placeholder="Ex: 70"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none transition-all text-lg"
            />
          </div>
        </div>
        {step.subtitle && <p className="text-gray-500 text-sm text-center px-4">{step.subtitle}</p>}
        <button 
          onClick={submitInputs}
          disabled={!localHeight || !localWeight || !localTarget}
          className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all"
        >
          {step.buttonText || 'Continuar'}
        </button>
      </div>
    );
  }

  if (step.type === 'analysis-success') {
    const bmiValue = calculateBMI();
    const bmiStatus = getBMIStatus(bmiValue);

    return (
      <div className="flex flex-col items-center text-center max-w-md mx-auto space-y-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-green-600 uppercase leading-tight">
          {step.title}
        </h2>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full space-y-4 text-left">
          <p className="font-bold text-gray-800 text-lg">A hipnoterapia é segura para você?</p>
          <p className="text-gray-600">Você é um ótimo candidato para hipnoterapia voltada ao controle de peso.</p>
          
          <div className="pt-4 space-y-4">
             <div className="bg-red-50 p-4 rounded-xl border border-red-100">
               <p className="font-bold text-gray-600 uppercase text-xs tracking-wider">Sua idade metabólica:</p>
               <p className="text-4xl font-black text-red-500 my-2">{getMetabolicAge()} anos</p>
               <p className="text-sm text-red-600 font-bold">Seu corpo está envelhecendo mais rápido do que deveria.</p>
             </div>
             
             <div className={`${bmiStatus.bg} p-4 rounded-xl border border-opacity-50`}>
               <p className="font-bold text-gray-600 uppercase text-xs tracking-wider">Índice de Massa Corporal (IMC):</p>
               <div className="flex items-end gap-3 my-2">
                 <p className={`text-4xl font-black ${bmiStatus.color}`}>{bmiValue}</p>
                 <span className={`text-sm font-bold mb-2 ${bmiStatus.color} uppercase px-2 py-0.5 rounded border border-current`}>
                   {bmiStatus.text}
                 </span>
               </div>
               {(parseFloat(bmiValue) > 24.9 || parseFloat(bmiValue) < 18.5) && (
                 <div className="flex gap-2 items-start mt-2">
                   <AlertTriangle className={`w-5 h-5 ${bmiStatus.color} shrink-0`} />
                   <p className={`text-sm font-bold ${bmiStatus.color}`}>
                     Atenção: Seu IMC indica que cuidados são necessários para evitar riscos à saúde a longo prazo.
                   </p>
                 </div>
               )}
             </div>
          </div>
        </div>

        <button 
          onClick={onNext}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all"
        >
          {step.buttonText || 'Continuar'}
        </button>
      </div>
    );
  }

  if (step.type === 'benefits-list') {
     return (
       <div className="flex flex-col items-center text-center max-w-md mx-auto space-y-6">
         <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{step.title}</h2>
         <p className="text-violet-600 font-bold text-xl">{step.subtitle}</p>
         
         <div className="w-full space-y-4">
           <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-left">
             <h3 className="text-violet-800 font-bold text-lg mb-2">Comer por emoção</h3>
             <p className="text-gray-600 text-sm">9 em cada 10 usuários reduziram a alimentação emocional após as 5 primeiras sessões de hipnoterapia.</p>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-left">
             <h3 className="text-violet-800 font-bold text-lg mb-2">Má digestão</h3>
             <p className="text-gray-600 text-sm">8 em cada 10 usuários relataram menos estresse e melhor digestão após tratar fatores emocionais com hipnoterapia.</p>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-left">
             <h3 className="text-violet-800 font-bold text-lg mb-2">Força de vontade</h3>
             <p className="text-gray-600 text-sm">9 em cada 10 usuários dizem que reduziram desejos e formaram hábitos saudáveis com hipnoterapia.</p>
           </div>
         </div>

         <button 
           onClick={onNext}
           className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all"
         >
           {step.buttonText || 'Continuar'}
         </button>
       </div>
     );
  }

  if (step.type === 'graph-preview') {
    const startW = userData.currentWeight || 80;
    const targetW = userData.targetWeight || 70;
    const weightLoss = startW - targetW;
    const data = [
      { name: 'Hoje', weight: startW },
      { name: 'Semana 1', weight: startW - ((startW - targetW) * 0.25) },
      { name: 'Semana 2', weight: startW - ((startW - targetW) * 0.5) },
      { name: 'Semana 3', weight: startW - ((startW - targetW) * 0.75) },
      { name: '1 Mês', weight: targetW },
    ];
    
    // Dynamic text replacement for Step 26
    const dynamicTitle = step.title?.replace('(kg)', `${weightLoss.toFixed(1)}kg`).replace('(data)', getFutureDate(30));
    const dynamicFooter = "Com base em suas respostas, prevemos que você atingirá sua meta antes de " + getFutureDate(30);

    return (
      <div className="flex flex-col items-center text-center max-w-md mx-auto space-y-6">
        <h2 className="text-xl md:text-2xl font-extrabold text-violet-800 px-2">{dynamicTitle || step.title}</h2>
        {step.subtitle && <p className="text-gray-600 font-bold px-4">{step.subtitle}</p>}
        
        <div className="w-full bg-white p-4 rounded-xl shadow-lg border border-gray-100 relative">
           <h4 className="text-gray-500 text-xs font-bold uppercase mb-4 tracking-widest text-center">Gráfico de perda de peso</h4>
           
           {/* Custom Labels Overlay */}
           <div className="absolute top-12 left-4 bg-violet-100 text-violet-700 text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
             Hoje: {startW}kg
           </div>
           <div className="absolute bottom-12 right-4 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
             Meta: {targetW}kg
           </div>

           <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value.toFixed(1)}kg`, 'Peso']}
                />
                <Area type="monotone" dataKey="weight" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
           </div>
        </div>

        <p className="text-gray-700 font-medium px-4 leading-relaxed">{dynamicFooter}</p>
        
        <button 
          onClick={onNext}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all"
        >
          {step.buttonText || 'Continuar'}
        </button>
      </div>
    );
  }

  return null;
};

export default QuizStep;