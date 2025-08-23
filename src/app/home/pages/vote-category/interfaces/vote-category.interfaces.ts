export interface GetAllOptionalCategoriesResponse {
    uuid:      string;
    name:      string;
    votes:     number;
    userVoted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
