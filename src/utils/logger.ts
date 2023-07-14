import { captureMessage } from '@sentry/react';

export const logError = (error: string | unknown) => {
  const message = (() => {
    if (typeof error === 'string') {
      return error;
    }
    if (typeof error === 'object') {
      const { message } = error as Error;
      return message;
    }
    return 'Internal server error!';
  })();
  captureMessage(message);
};
