export interface User {
    uuid:      string;
    name:      string;
    username:  string;
    email:     string;
    admin:     boolean;
    createdAt: Date;
    updatedAt: Date;
}
