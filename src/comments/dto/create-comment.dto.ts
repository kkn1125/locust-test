import { Comment } from '@/_gen/Comment';

type ExcludeCommentProperties = 'id' | 'user' | 'board';

export class CreateCommentDto
  implements Omit<Comment, ExcludeCommentProperties>
{
  userId!: number;
  boardId!: number;
  content!: string;
}
