
interface Page {
  id: number;
  book_id: number;
  page_number: number;
  page_content: string;
}

interface Book {
  id: number;
  title: string;
  description: string;
  author_id: number;
  is_public: boolean;
  pages: Page[] | null;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  is_active: boolean;
  books: Book[] | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
