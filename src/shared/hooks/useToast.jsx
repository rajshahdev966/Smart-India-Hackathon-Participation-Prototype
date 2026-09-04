/**
 * @file useToast.jsx
 * @layer shared/hooks
 * @description Shared hook for triggering consistent toast messages across any feature or component.
 */

import { useAppContext } from '@/context/AppContext';

export const useToast = () => {
  const { notify } = useAppContext();

  return {
    success: (msg) => notify(msg, 'success'),
    error: (msg) => notify(msg, 'error'),
    info: (msg) => notify(msg, 'info'),
  };
};

export default useToast;
