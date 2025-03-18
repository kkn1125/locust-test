import { Board } from '@/_gen/Board';

type ExcludeBoardProperties =
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'user'
  | 'comments';

export class CreateBoardDto implements Omit<Board, ExcludeBoardProperties> {
  title!: string;
  content!: string;
  userId!: number;
}
