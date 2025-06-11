"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, Journal, User } from '@/lib/types';

// Mock users
const mockUsers: User[] = [
  {
    id: '1',
    password:"password",
    email:'user@example.com',
    name: 'John Doe',
    role: 'PUBLISHER',
  },
  {
    id: '2',
    email:'admin@example.com',
    name: 'Admin User',
    password:"password",
    role: 'ADMIN',
  },
];

import { JournalStatus } from '@/lib/types'; // If you are using enums
import Email from 'next-auth/providers/email';

export const mockJournals: Journal[] = [
  {
    id: '1',
    title: 'The Impact of Climate Change on Biodiversity',
    description: 'Examining the effects of climate change on global biodiversity.',
    imageUrl: '/images/climate.jpg',
    pdfUrl: '/pdfs/climate-change-study.pdf',
    abstract: 'This study examines the effects of climate change on global biodiversity patterns.',
    status: JournalStatus.APPROVED,
    publishedAt: '2023-01-21T10:00:00Z',
    createdAt: '2023-01-15T10:30:00Z',
    publisherId: '1',
  },
  {
    id: '2',
    title: 'Machine Learning Applications in Education',
    description: 'Using ML to enhance learning outcomes.',
    imageUrl: '/images/ml-education.jpg',
    pdfUrl: '/pdfs/ml-education.pdf',
    abstract: 'An exploration of how machine learning technologies can enhance educational outcomes.',
    status: JournalStatus.PENDING,
    publishedAt: undefined,
    createdAt: '2023-02-08T09:15:00Z',
    publisherId: '1',
  },
  {
    id: '3',
    title: 'Quantum Computing: Current State and Future Prospects',
    description: 'Advances and applications of quantum computing.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    pdfUrl: '/pdfs/quantum-computing-review.pdf',
    abstract: 'This paper reviews recent advances in quantum computing and discusses potential applications.',
    status: JournalStatus.REJECTED,
    publishedAt: undefined,
    createdAt: '2023-03-22T16:40:00Z',
    publisherId: '3',
  },
  {
    id: '4',
    title: 'Sustainable Urban Planning Strategies',
    description: 'Strategies for sustainable urban development.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    pdfUrl: '/pdfs/sustainable-urban-planning.pdf',
    abstract: 'An analysis of effective sustainable urban planning approaches for growing cities.',
    status: JournalStatus.APPROVED,
    publishedAt: '2023-04-11T09:00:00Z',
    createdAt: '2023-04-05T13:25:00Z',
    publisherId: '4',
  },
  {
    id: '5',
    title: 'Artificial Intelligence in Healthcare Diagnostics',
    description: 'AI’s role in medical diagnostic improvements.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    pdfUrl: '/pdfs/ai-healthcare-diagnostics.pdf',
    abstract: 'Examining the role of AI in improving accuracy and efficiency of medical diagnostics.',
    status: JournalStatus.PENDING,
    publishedAt: undefined,
    createdAt: '2023-05-18T11:10:00Z',
    publisherId: '5',
  },
];

interface JournalStore {
  journals: Journal[];
  addJournal: (journal: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateJournalStatus: (id: string, status: 'Approved' | 'Rejected' | 'Pending') => void;
}

export const useJournalStore = create<JournalStore>()(
  persist(
    (set, get) => ({
      journals: [], // start empty, will hydrate from localStorage or mock later
      addJournal: (journalData) => {
        const now = new Date().toISOString();
        const newJournal: Journal = {
          id: Date.now().toString(),
          createdAt: now,
          updatedAt: now,
          ...journalData,
          status: 'Pending',
        };
        set((state) => ({
          journals: [...state.journals, newJournal],
        }));
      },
      updateJournalStatus: (id, status) => {
        const now = new Date().toISOString();
        set((state) => ({
          journals: state.journals.map((journal) =>
            journal.id === id ? { ...journal, status, updatedAt: now } : journal
          ),
        }));
      },
    }),
    {
      name: 'journal-storage',
      // On first load, if localStorage is empty, seed with mockJournals
      // The "onRehydrateStorage" callback is useful here:
      onRehydrateStorage: () => (state) => {
        if (!state?.journals || state.journals.length === 0) {
          state.journals = mockJournals.map(j => ({
            ...j,
            updatedAt: j.updatedAt ?? j.createdAt,
          }));
        }
      },
    }
  )
);

export const useAuthStore = create<AuthState & {
  login: (username: string, password: string) => boolean;
  logout: () => void;
}>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email, password) => {
        // Mock authentication - in a real app this would validate with a backend
        if (password !== 'password') return false; // Simple mock password check
        
        const user = mockUsers.find(user => user.email === email );
        if (!user) return false;
        
        set({ isAuthenticated: true, user });
        return true;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);