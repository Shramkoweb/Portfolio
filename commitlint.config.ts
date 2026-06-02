import { UserConfig } from '@commitlint/types';

const commitLintConfig: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 50],
  },
};

export default commitLintConfig;
