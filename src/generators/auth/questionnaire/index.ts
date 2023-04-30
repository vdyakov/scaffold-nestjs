import { PromptObject } from 'prompts';
import Questionnaire from '@/lib/questionnaire.js';
import { AuthAnswers } from '@/generators/auth/types';

export default class AuthQuestionnaire extends Questionnaire<AuthAnswers> {
  protected get questions(): PromptObject[] {
    let needAuth = true;

    return [
      {
        name: 'needAuth',
        type: 'toggle',
        message: 'Add Auth module?',
        initial: true,
        active: 'yes',
        inactive: 'no',
        onState: (state) => {
          needAuth = Boolean(state.value);
        },
      },
      {
        name: 'auth',
        type: () => needAuth ? 'select' : null,
        message: 'Select auth variant:',
        choices: [
          { title: 'JWT', value: 'jwt' },
          { title: 'Keycloak', value: 'keycloak' },
        ],
        initial: 0,
      },
    ];
  }
}
