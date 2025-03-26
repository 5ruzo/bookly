import { Book, CheckLikeBook } from '@/types/detail.type';
import browserClient from '../utils/supabase/client';

export const fetchGetDetail = async (bookId: string): Promise<Book> => {
  const { data } = await browserClient
    .from('books')
    .select('*')
    .eq('id', bookId)
    .single();

  return data as Book;
};

export const fetchGetLikeThisBook = async (
  userId: string | undefined,
  bookId: number
): Promise<CheckLikeBook | undefined> => {
  if (!userId) return;

  const { data } = await browserClient
    .from('likes')
    .select('*')
    .eq('book_id', bookId)
    .eq('user_id', userId)
    .maybeSingle();

  return data as CheckLikeBook;
};

export const fetchDeleteLikeThisBook = async (
  userId: string | undefined,
  bookId: number
): Promise<void> => {
  if (!userId) return;

  const { error } = await browserClient
    .from('likes')
    .delete()
    .eq('book_id', bookId)
    .eq('user_id', userId);

  if (error) {
    throw new Error(`찜 해제 실패`);
  }
};

export const fetchCreateLikeThisBook = async (
  userId: string | undefined,
  bookId: number
): Promise<void> => {
  if (!userId) return;

  const payload = {
    user_id: userId,
    book_id: bookId,
  };

  const { error } = await browserClient
    .from('likes')
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(`찜 실패`);
  }
};
