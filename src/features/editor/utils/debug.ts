export const DebugLog = (...args: unknown[]) => {
  console.debug('DEBUG: ', ...args);
};

export const DebugLogVoid = (..._: unknown[]) => {};
