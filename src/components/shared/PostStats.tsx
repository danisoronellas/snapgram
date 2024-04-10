import { Models } from 'appwrite';
import { MouseEvent, useEffect, useState } from 'react';

import Loader from '@/components/shared/Loader.tsx';
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from '@/lib/react-query/queriesAndMutations.ts';
import { checkIsLiked } from '@/lib/utils.ts';

interface PostStatsProps {
  post?: Models.Document;
  userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likedPost } = useLikePost();
  const { mutate: savedPost, isPending: isSavingPost } = useSavePost();
  const { mutate: deletedSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id,
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);

  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likedPost({ postId: post?.$id || '', likesArray: newLikes });
  };

  const handleSavedPost = (e: MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deletedSavedPost(savedPostRecord.$id);
      return;
    }

    savedPost({ postId: post?.$id || '', userId });
    setIsSaved(true);
  };

  return (
    <div className="z-20 flex items-center justify-between">
      <div className="mr-5 flex gap-2">
        <img
          src={
            checkIsLiked(likes, userId)
              ? '/assets/icons/liked.svg'
              : '/assets/icons/like.svg'
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isSavingPost || isDeletingSaved ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
            alt="save"
            width={20}
            height={20}
            onClick={handleSavedPost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};
export default PostStats;
