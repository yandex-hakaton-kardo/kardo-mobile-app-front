interface File {
  id: string;
  fileName: string;
  filePath: string;
}

interface ShortUser {
  id: string;
  name: string;
  surname: string;
  profilePicture: File;
}

interface Post {
  id: string;
  title: string;
  author: ShortUser;
  file: File;
  numberOfLikes: number;
  numberOfViews: number;
}

export const mockPosts: Post[] = Array.from({ length: 10 }, (_, idx) => ({
  id: idx.toString(),
  title: `Post ${idx}`,
  numberOfLikes: idx,
  numberOfViews: idx,
  file: {
    id: idx.toString(),
    fileName: `file ${idx}`,
    filePath: `/file/${idx}`,
  },
  author: {
    id: idx.toString(),
    name: `name ${idx}`,
    surname: `surname ${idx}`,
    profilePicture: {
      id: idx.toString(),
      fileName: `file ${idx}`,
      filePath: `/file/${idx}`,
    },
  },
}));
