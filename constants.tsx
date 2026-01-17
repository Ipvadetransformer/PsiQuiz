
import React from 'react';
import { Module, Difficulty, Achievement } from './types';

export const MODULES: Module[] = [
  {
    id: 'intro-psy',
    title: 'Fundamentos da Psicologia',
    description: 'Uma introdução à ciência da mente e do comportamento.',
    category: 'Geral',
    difficulty: Difficulty.BEGINNER,
    xpReward: 100,
    icon: '🧠',
    content: 'A psicologia é o estudo científico da mente e do comportamento humano. Explore as principais correntes: Behaviorismo, Psicanálise, Humanismo e Cognitivismo.'
  },
  {
    id: 'clinical-101',
    title: 'Psicologia Clínica',
    description: 'Entenda o papel do psicólogo no diagnóstico e tratamento de transtornos mentais.',
    category: 'Clínica',
    difficulty: Difficulty.INTERMEDIATE,
    xpReward: 250,
    icon: '🩺',
    content: 'A psicologia clínica foca no bem-estar mental. Discuta a relação terapêutica, ética profissional e as diferentes abordagens como TCC e Gestalt.'
  },
  {
    id: 'tdah-deep-dive',
    title: 'Desvendando o TDAH',
    description: 'Uma visão profunda sobre o Transtorno do Déficit de Atenção com Hiperatividade.',
    category: 'Neurodivergência',
    difficulty: Difficulty.INTERMEDIATE,
    xpReward: 300,
    icon: '⚡',
    content: 'O TDAH é um transtorno do neurodesenvolvimento. Aprenda sobre os tipos: predominante desatento, hiperativo-impulsivo e combinado, além de estratégias de manejo.'
  },
  {
    id: 'autism-spectrum',
    title: 'Espectro Autista (TEA)',
    description: 'Entenda a complexidade e a beleza da neurodiversidade no espectro autista.',
    category: 'Neurodivergência',
    difficulty: Difficulty.ADVANCED,
    xpReward: 400,
    icon: '🧩',
    content: 'O Transtorno do Espectro Autista envolve diferenças na comunicação social e comportamentos repetitivos. Entenda os níveis de suporte e a importância da inclusão.'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-step', title: 'Primeiros Passos', description: 'Complete seu primeiro módulo.', icon: '🎓' },
  { id: 'neuro-explorer', title: 'Explorador da Mente', description: 'Complete todos os módulos de Neurodivergência.', icon: '🔭' },
  { id: 'expert-clinician', title: 'Clínico Expert', description: 'Alcance 1000 XP.', icon: '💎' }
];
