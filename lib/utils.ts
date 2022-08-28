const Environment = {
  Production: 'production',
  Test: 'test',
  Development: 'development',
};

export const isProduction = () => process.env.NODE_ENV === Environment.Production;
