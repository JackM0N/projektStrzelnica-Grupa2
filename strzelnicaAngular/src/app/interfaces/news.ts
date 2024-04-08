// News model
export interface News {
    id?: number;
    title: string;
    picture: string;
    date: Date;
    authorId: number;
    content: string;
    deleted: boolean;
  }