import { client } from '../utils/fetchClient';

import { Post } from '../types/Post';
import { User } from '../types/User';

export const loadUsers = () => {
  return client.get<User[]>(`/users`);
};

export const loadUserPost = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
