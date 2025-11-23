import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ArrowRight,
  Stethoscope,
  MapPin
} from 'lucide-react';
import { AppStep, DiagnosisType } from './types';
import { QUIZ_QUESTIONS, DIAGNOSES } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('LANDING');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ [DiagnosisType.KNEE]: 0, [DiagnosisType.SHIN]: 0 });
  const [finalDiagnosis, setFinalDiagnosis] = useState<DiagnosisType>(DiagnosisType.BOTH);
  
  // Progress bar calculation
  const progress = useMemo(() => {
    return ((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100;
  }, [currentQuestionIndex]);

  const handleStartQuiz = () => {
    setStep('QUIZ');
    setCurrentQuestionIndex(0);
    setScores({ [DiagnosisType.KNEE]: 0, [DiagnosisType.SHIN]: 0 });
  };

  const handleAnswer = (type: DiagnosisType) => {
    const newScores = { ...scores };
    
    if (type === DiagnosisType.BOTH) {
      newScores[DiagnosisType.KNEE] += 0.5;
      newScores[DiagnosisType.SHIN] += 0.5;
    } else {
      newScores[type] += 1;
    }
    setScores(newScores);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: typeof scores) => {
    setStep('ANALYZING');
    
    // Simple logic: If margin is small (< 1), it's BOTH. Otherwise, winner takes all.
    const kneeScore = finalScores[DiagnosisType.KNEE];
    const shinScore = finalScores[DiagnosisType.SHIN];
    const diff = Math.abs(kneeScore - shinScore);

    let result: DiagnosisType = DiagnosisType.BOTH;
    if (diff >= 1.5) {
      result = kneeScore > shinScore ? DiagnosisType.KNEE : DiagnosisType.SHIN;
    }
    
    setFinalDiagnosis(result);

    // Simulate processing time
    setTimeout(() => {
      setStep('RESULT');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-100 flex flex-col">
      {/* Header / Nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-700 font-bold text-lg">
            <Activity className="w-6 h-6" />
            <span>Fim das Dores</span>
          </div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-widest hidden sm:block">
            Protocolo de Recuperação
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow flex flex-col">
        {step === 'LANDING' && (
          <LandingPage onStart={handleStartQuiz} />
        )}

        {step === 'QUIZ' && (
          <QuizPage 
            question={QUIZ_QUESTIONS[currentQuestionIndex]} 
            onAnswer={handleAnswer} 
            progress={progress}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={QUIZ_QUESTIONS.length}
          />
        )}

        {step === 'ANALYZING' && (
          <AnalyzingPage />
        )}

        {step === 'RESULT' && (
          <ResultPage diagnosisType={finalDiagnosis} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center text-sm">
          <p>© {new Date().getFullYear()} Fim das Dores. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs text-slate-600">Este diagnóstico é informativo e não substitui consulta médica presencial.</p>
        </div>
      </footer>
    </div>
  );
};

// ------------------------------------------------------------------
// Components
// ------------------------------------------------------------------

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="relative flex-grow flex flex-col justify-center">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
       <img
         src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2000&auto=format&fit=crop"
         alt="Corredor de rua no asfalto"
         className="w-full h-full object-cover"
       />
       <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-slate-50/95"></div>
    </div>

    <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-8 border border-blue-100 shadow-sm">
        <Stethoscope className="w-3 h-3" />
        Avaliação Técnica Gratuita
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
        Por que seu joelho ou sua canela dói quando você corre?
      </h1>
      <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
        Responda a 5 perguntas rápidas e receba seu diagnóstico personalizado baseado em biomecânica da corrida de rua.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-brand-600 rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600 w-full sm:w-auto shadow-xl shadow-brand-500/30"
        >
          Iniciar Diagnóstico
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left border-t border-slate-200 pt-10">
        <div className="space-y-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3 text-slate-600 shadow-sm border border-slate-100">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900">100% Técnico</h3>
          <p className="text-sm text-slate-500">Baseado em padrões de fisiopatologia do esporte.</p>
        </div>
        <div className="space-y-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3 text-slate-600 shadow-sm border border-slate-100">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900">Análise Rápida</h3>
          <p className="text-sm text-slate-500">Identifique a origem mecânica da dor em menos de 2 minutos.</p>
        </div>
        <div className="space-y-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3 text-slate-600 shadow-sm border border-slate-100">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900">Relatório Final</h3>
          <p className="text-sm text-slate-500">Receba a indicação do protocolo correto para tratar.</p>
        </div>
      </div>
    </div>
  </div>
);

interface QuizPageProps {
  question: typeof QUIZ_QUESTIONS[0];
  onAnswer: (type: DiagnosisType) => void;
  progress: number;
  questionNumber: number;
  totalQuestions: number;
}

const QuizPage: React.FC<QuizPageProps> = ({ question, onAnswer, progress, questionNumber, totalQuestions }) => (
  <div className="max-w-2xl mx-auto px-6 py-12 w-full">
    <div className="mb-8">
      <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
        <span>Questão {questionNumber} de {totalQuestions}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-brand-600 h-2 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 relative overflow-hidden">
      <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-snug relative z-10">
        {question.question}
      </h2>

      <div className="space-y-4 relative z-10">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.pointsTo)}
            className="w-full text-left p-5 rounded-xl border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all duration-200 group flex items-start gap-4 bg-white"
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-brand-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-slate-700 font-medium group-hover:text-slate-900">
              {option.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const AnalyzingPage: React.FC = () => (
  <div className="flex-grow flex flex-col items-center justify-center px-6 py-24 text-center">
    <div className="relative w-20 h-20 mx-auto mb-8">
      <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
      <Activity className="absolute inset-0 m-auto text-brand-500 w-8 h-8 animate-pulse" />
    </div>
    <h2 className="text-2xl font-bold text-slate-900 mb-2">Analisando suas respostas...</h2>
    <p className="text-slate-500">Cruzando sintomas com padrões biomecânicos da corrida.</p>
  </div>
);

const ResultPage: React.FC<{ diagnosisType: DiagnosisType }> = ({ diagnosisType }) => {
  const diagnosis = DIAGNOSES[diagnosisType];

  return (
    <div className="animate-fade-in pb-16">
      {/* Diagnosis Header */}
      <div className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-brand-700 font-bold mb-4 bg-brand-50 px-3 py-1 rounded text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Diagnóstico Concluído
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
            {diagnosis.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-brand-500 pl-6 py-2 bg-slate-50 rounded-r-lg">
            {diagnosis.description}
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          <div>
            <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-lg">
              <AlertCircle className="w-5 h-5 text-red-500" />
              O que está acontecendo:
            </h3>
            <ul className="space-y-3">
              {diagnosis.technicalDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm sm:text-base">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-lg">
              <Stethoscope className="w-5 h-5 text-green-600" />
              Recomendação Clínica:
            </h3>
            <div className="bg-green-50 p-5 rounded-xl border border-green-100 text-slate-700 text-sm sm:text-base leading-relaxed">
              {diagnosis.recommendation}
            </div>
          </div>
        </div>

        {/* Sales / Solution Section */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-2xl overflow-hidden relative isolate">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 opacity-20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          
          {/* Subtle texture image for card background */}
          <img 
            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop" 
            alt="Textura Asfalto"
            className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay -z-10"
          />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="text-brand-400 font-bold tracking-wider uppercase text-xs mb-2">Protocolo Definitivo</div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Elimine a dor sem parar de correr</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Você não precisa de mais repouso passivo. Você precisa do protocolo biomecânico específico para {diagnosisType === 'KNEE' ? 'o joelho' : diagnosisType === 'SHIN' ? 'a canela' : 'suas pernas'}. O ebook <strong>"Fim das Dores: Joelho e Canela do Corredor"</strong> é um manual técnico de reabilitação ativa.
              </p>
              
              <ul className="space-y-2 mb-8 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  Planilha de fortalecimento específico (PDF)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  Guia de correção de pisada e cadência
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  Protocolo de retorno gradual à corrida
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg shadow-brand-900/50 flex items-center justify-center gap-2 ring-1 ring-white/10">
                   Baixar Protocolo Agora
                   <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex flex-col items-center sm:items-start text-xs text-slate-500">
                  <span className="line-through opacity-70">De R$ 47,00</span>
                  <span className="font-bold text-white text-lg">Por R$ 9,90</span>
                </div>
              </div>
            </div>

            {/* Book Mockup - Street Running Theme */}
            <div className="w-56 h-80 flex-shrink-0 bg-slate-900 rounded-r-md rounded-l-sm shadow-2xl rotate-3 border-r-4 border-slate-800 flex flex-col relative group overflow-hidden ring-1 ring-white/10 font-sans">
               
               {/* Background Image: Running/Asphalt */}
               <div className="absolute inset-0 z-0">
                 <img
                   src="https://images.unsplash.com/photo-1552674605-469523f54050?q=80&w=600&auto=format&fit=crop"
                   alt="Corredor de rua"
                   className="w-full h-full object-cover opacity-80"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/80"></div>
               </div>
               
               {/* Content Container */}
               <div className="z-10 flex flex-col h-full p-5 items-center justify-between text-center relative text-white">
                 
                 {/* Top Text */}
                 <div className="mt-2">
                   <h1 className="font-black text-xl leading-none uppercase tracking-tight drop-shadow-md">
                     Fim das Dores
                   </h1>
                   <div className="text-brand-400 font-bold text-sm uppercase tracking-widest mt-1 border-t border-brand-500/50 pt-1 mx-auto w-24">
                     Corredor
                   </div>
                 </div>

                 {/* Middle Image/Badge */}
                 <div className="w-full relative flex items-center justify-center py-2">
                   <div className="w-24 h-24 border-2 border-white/20 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
                      <div className="text-[10px] font-bold uppercase text-slate-300 tracking-wider text-center leading-tight">
                        Método<br/>Corrida<br/>de Rua
                      </div>
                   </div>
                   {/* Technical lines */}
                   <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10"></div>
                 </div>

                 {/* Bottom Text */}
                 <div className="mb-2 w-full pt-2 border-t border-white/20">
                    <p className="text-[9px] text-brand-300 font-bold uppercase tracking-[0.2em] mb-1">
                     Joelho & Canela
                   </p>
                   <p className="text-[9px] text-slate-400 uppercase tracking-wide">
                     Guia Prático
                   </p>
                 </div>
               </div>

               {/* Lighting/Sheen effect */}
               <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/50 to-transparent z-20"></div>
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;