// export type User = {
//   id: string;
//   username: string;
//   name: string;
//   role: 'user' | 'admin';
// };

// export type Journal = {
//   id: string;
//   title: string;
//   abstract: string;
//   fileName?: string;
//   status: 'Pending' | 'Approved' | 'Rejected';
//   createdAt: string;
//   updatedAt: string;
//   userId: string;
//   authorName: string;
// };


export enum JournalStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
}


export type Journal ={
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  pdfUrl: string;
  abstract: string;
  status: 'Pending' | 'Approved' | 'Rejected'; // inferred accepted values
  publishedAt?: string;  // ISO format string (DateTime in Prisma)
  createdAt: string;
  publisherId: string;
  payments?: Payment[];
  publisher?: User;
}

export type User = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  password: string;
  role: 'PUBLISHER' | 'ADMIN';  // assuming these are the roles
}

export type Payment ={
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  userId: string;
  journalId: string;
}


export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};