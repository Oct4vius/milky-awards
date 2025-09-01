export interface OptionalCategories {
  uuid: string;
  title: string;
  votes: number;
  userVoted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ObligatoryCategories {
  uuid: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SuggestionCategories {
  uuid: string;
  title: string;
  author: string;
  description?: string;
  createdAt: Date;
}

export interface CreateSuggestionPayload {
  title: string;
  description?: string | null;
}

