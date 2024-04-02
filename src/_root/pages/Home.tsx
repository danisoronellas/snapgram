import { Models } from 'appwrite';

import Loader from '@/components/shared/Loader.tsx';
import PostCard from '@/components/shared/PostCard.tsx';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations.ts';

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold w-full text-left">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex w-full flex-1 flex-col gap-9">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
