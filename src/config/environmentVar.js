const envs = process.env;
export const environmentVar = {
  apiUrl: envs.REACT_APP_BASE_URL,
  stripeKey: envs.REACT_APP_STRIPE_KEY,
};
