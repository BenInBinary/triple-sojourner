import { Question } from '../types';
import { coreJsQuestions } from './categories/core-js';
import { nodejsQuestions } from './categories/nodejs';
import { reactjsQuestions } from './categories/reactjs';
import { awsQuestions } from './categories/aws';
import { dbIntegrationQuestions } from './categories/db-integration';
import { apiQuestions } from './categories/api';
import { cloudQuestions } from './categories/cloud';
import { securityQuestions } from './categories/security';
import { testingQuestions } from './categories/testing';
import { systemDesignQuestions } from './categories/system-design';

export const allQuestions: Question[] = [
  ...coreJsQuestions,
  ...nodejsQuestions,
  ...reactjsQuestions,
  ...awsQuestions,
  ...dbIntegrationQuestions,
  ...apiQuestions,
  ...cloudQuestions,
  ...securityQuestions,
  ...testingQuestions,
  ...systemDesignQuestions
];

export const getQuestionsByCategory = () => {
  const grouped = new Map<string, Question[]>();
  allQuestions.forEach(q => {
    if (!grouped.has(q.categoryId)) {
      grouped.set(q.categoryId, []);
    }
    grouped.get(q.categoryId)!.push(q);
  });
  return grouped;
};
