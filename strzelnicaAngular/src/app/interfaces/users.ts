// enum Roles jest tutaj tylko po to żeby mieć łatwiejszy dostęp do roli na wypadek błędów
// podobne role trzeba będzie zrobić w bz
export enum Roles{
    ADMINISTRATOR = 'ADMINISTRATOR',
    STAFF = 'STAFF',
    MEMBER = 'MEMBER',
    USER = 'USER'
  }
// Role do ustawienia w bazie, będą 4 bo GUEST i tak będzie nieobsługiwany 
export interface Role {
    id: number;
    name: string;
    uid: string; // ADMINISTRATOR, STAFF, MEMBER, USER
    extends?: number | null; // id of the role to be extended
  }
// szkielet użytkownika, można go spokojnie zmienić jak już ustalimy jak ma do niego
// wyglądać tabela
export interface Users {
    id?: number;
    name: string;
    role: Role;
    deleted: boolean;
    
  }