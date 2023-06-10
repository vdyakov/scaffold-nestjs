import { PromptObject } from 'prompts';
import Questionnaire from '@/lib/questionnaire.js';
import { ServicesAnswers } from '@/generators/services/types';

export default class DatabaseQuestionnaire extends Questionnaire<ServicesAnswers> {
  protected get questions(): PromptObject[] {
    return [
      {
        type: 'multiselect',
        name: 'services',
        message: 'Select additional services:',
        choices: [
          { title: 'Keycloak', value: 'keycloak' },
          { title: 'MinIO', value: 'minio' },
          { title: 'Novu', value: 'novu' },
        ],
        instructions: false,
        hint: '- Space to select. Return to submit'
      },
    ];
  }
}
