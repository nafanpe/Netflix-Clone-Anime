
export const setupTrustedTypes = () => {
    if (window.trustedTypes && trustedTypes.createPolicy) {
      try {
        if (!trustedTypes.getPolicyNames().includes('default')) {
          trustedTypes.createPolicy('default', {
            createHTML: (input) => input,
            createScript: (input) => input,
            createScriptURL: (input) => input
          });
        }
      } catch (error) {
        console.error('Error setting up Trusted Types policy:', error);
      }
    }
  };