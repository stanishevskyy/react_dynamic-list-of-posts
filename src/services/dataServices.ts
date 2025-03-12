import { client } from '../utils/fetchClient';

import { Post } from '../types/Post';
import { User } from '../types/User';

export function getUsers() {
  return client.get<User[]>('/users');
}

export function getUserPost(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}

export function getUserComment(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}
