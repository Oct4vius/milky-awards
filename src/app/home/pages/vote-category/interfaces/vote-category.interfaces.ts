export interface GetAllOptionalCategoriesResponse {
    uuid:      string;
    title:      string;
    votes:     number;
    userVoted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateSuggestionPayload {
    title: string;
    description?: string | null;
}

export interface CreateSuggestionResponse {
    id:          number;
    uuid:        string;
    title:        string;
    author:      string;
    description?: string;
    createdAt:   Date;
}

