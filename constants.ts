import { DiagnosisType, Question, DiagnosisContent } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Onde a dor está localizada com maior intensidade?",
    options: [
      { id: 'q1a', text: "Na parte da frente do joelho, ao redor ou atrás da rótula.", pointsTo: DiagnosisType.KNEE },
      { id: 'q1b', text: "Na parte interna ou frontal da canela (tíbia).", pointsTo: DiagnosisType.SHIN },
      { id: 'q1c', text: "Difusa, espalhando-se do joelho até o meio da perna.", pointsTo: DiagnosisType.BOTH },
    ]
  },
  {
    id: 2,
    question: "Qual movimento específico agrava o sintoma?",
    options: [
      { id: 'q2a', text: "Agachar, subir/descer escadas ou permanecer muito tempo sentado.", pointsTo: DiagnosisType.KNEE },
      { id: 'q2b', text: "O impacto do pé no solo durante a corrida ou saltos.", pointsTo: DiagnosisType.SHIN },
      { id: 'q2c', text: "Ambos os movimentos geram desconforto significativo.", pointsTo: DiagnosisType.BOTH },
    ]
  },
  {
    id: 3,
    question: "Como você descreveria a sensação da dor?",
    options: [
      { id: 'q3a', text: "Uma pontada aguda ou sensação de 'areia' dentro da articulação.", pointsTo: DiagnosisType.KNEE },
      { id: 'q3b', text: "Uma queimação ou dor latejante ao longo do osso.", pointsTo: DiagnosisType.SHIN },
    ]
  },
  {
    id: 4,
    question: "Ao tocar a região, o que você sente?",
    options: [
      { id: 'q4a', text: "Sensibilidade no tendão logo abaixo da rótula ou nas laterais.", pointsTo: DiagnosisType.KNEE },
      { id: 'q4b', text: "Dor intensa ao pressionar a borda interna do osso da canela.", pointsTo: DiagnosisType.SHIN },
    ]
  },
  {
    id: 5,
    question: "Como a dor se comporta após o treino?",
    options: [
      { id: 'q5a', text: "O joelho fica rígido e dolorido ao tentar esticar a perna.", pointsTo: DiagnosisType.KNEE },
      { id: 'q5b', text: "A canela continua latejando mesmo em repouso.", pointsTo: DiagnosisType.SHIN },
    ]
  }
];

export const DIAGNOSES: Record<DiagnosisType, DiagnosisContent> = {
  [DiagnosisType.KNEE]: {
    title: "Síndrome da Dor Femoropatelar",
    description: "Seus sintomas indicam uma sobrecarga na articulação do joelho, especificamente na região patelar. Isso ocorre frequentemente por desequilíbrio muscular e biomecânica inadequada.",
    technicalDetails: [
      "Possível condromalácia ou tendinite patelar.",
      "Sobrecarga no mecanismo extensor do joelho.",
      "Necessidade urgente de fortalecimento de vasto medial e glúteo médio."
    ],
    recommendation: "O foco deve ser reequilíbrio muscular e correção biomecânica, não apenas repouso."
  },
  [DiagnosisType.SHIN]: {
    title: "Síndrome do Estresse Tibial Medial",
    description: "Conhecida popularmente como 'Canelite'. Seus sintomas apontam para uma inflamação no periósteo (membrana que recobre o osso da tíbia) causada por impacto excessivo.",
    technicalDetails: [
      "Microfissuras na estrutura óssea tibial.",
      "Tensão excessiva no músculo sóleo e tibial posterior.",
      "Risco de evolução para fratura por estresse se não tratado."
    ],
    recommendation: "É crucial reduzir o impacto temporariamente e fortalecer a musculatura da panturrilha e tibial anterior."
  },
  [DiagnosisType.BOTH]: {
    title: "Sobrecarga Biomecânica Combinada",
    description: "Seus sintomas indicam um colapso na absorção de impacto, afetando tanto a articulação do joelho quanto a estrutura tibial. É um quadro de alerta moderado a alto.",
    technicalDetails: [
      "Cadeia cinética inferior comprometida (quadril, joelho e tornozelo).",
      "Alta probabilidade de técnica de corrida (cadência/pisada) inadequada.",
      "Inflamação sistêmica localizada no membro inferior."
    ],
    recommendation: "Uma abordagem integrada que corrija a aterrissagem e fortaleça toda a cadeia posterior é mandatória."
  }
};