import React, { useState } from 'react';
import { QUIZ_STEPS } from './constants';
import { UserData } from './types';
import QuizStep from './components/QuizStep';
import LoadingScreen from './components/LoadingScreen';
import SalesPage from './components/SalesPage';

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const currentStep = QUIZ_STEPS[currentStepIndex];

  const handleUpdateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStepIndex < QUIZ_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
    handleNext();
  };

  // Render Logic
  let content;

  if (currentStep.type === 'loading') {
    content = <LoadingScreen onComplete={handleLoadingComplete} />;
  } else if (currentStep.type === 'sales') {
    content = <SalesPage userData={userData} />;
  } else {
    content = (
      <QuizStep 
        step={currentStep} 
        userData={userData} 
        onUpdate={handleUpdateUserData} 
        onNext={handleNext}
      />
    );
  }

  // Show header/footer only during quiz steps (not sales or loading)
  const isQuizMode = currentStep.type !== 'sales' && currentStep.type !== 'loading';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 font-poppins selection:bg-violet-200 selection:text-violet-900 pb-12">
      
      {/* Logo Static Header */}
      {isQuizMode && (
        <div className="flex justify-center pt-6 pb-2">
          <img 
            src="https://i.imgur.com/g1jcplq.png" 
            alt="Método MENTE MAGRA" 
            className="w-[100px] h-[100px] object-contain"
            loading="eager"
          />
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-4">
        {content}
      </main>

      {/* Footer for trust (Hidden on sales page to remove distraction) */}
      {isQuizMode && (
        <footer className="mt-12 text-center text-gray-400 text-xs pb-6">
          <p>© 2026 Método MENTE MAGRA. Todos os direitos reservados.</p>
        </footer>
      )}
    </div>
  );
};

export default App;