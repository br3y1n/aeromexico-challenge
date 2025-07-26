const API_KEYS = {
  characters: (filters?: Record<string, string>) => ["characters", filters],
  favorites: () => ["favorites"],
};

export { API_KEYS };
