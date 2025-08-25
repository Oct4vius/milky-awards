export interface GetAllOptionalCategoriesResponse {
    uuid:      string;
    name:      string;
    votes:     number;
    userVoted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateSuggestionPayload {
    name: string;
    description?: string | null;
}

export interface CreateSuggestionResponse {
    id:          number;
    uuid:        string;
    name:        string;
    author:      string;
    description?: string;
    createdAt:   Date;
}

