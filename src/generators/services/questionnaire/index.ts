import { PromptObject } from 'prompts';
import Questionnaire from '@/lib/questionnaire.js';
import { ServicesAnswers } from '@/generators/services/types';

export default class DatabaseQuestionnaire extends Questionnaire<ServicesAnswers> {
  protected get questions(): PromptObject[] {
    return [
      {
        name: 'needKeycloak',
        type: 'toggle',
        message: 'Add Keycloak service?',
        initial: false,
        active: 'yes',
        inactive: 'no'
      },
      {
        name: 'needMinio',
        type: 'toggle',
        message: 'Add MinIO service?',
        initial: false,
        active: 'yes',
        inactive: 'no'
      },
      {
        name: 'needNovu',
        type: 'toggle',
        message: 'Add Novu service?',
        initial: false,
        active: 'yes',
        inactive: 'no'
      },
    ];
  }
}
