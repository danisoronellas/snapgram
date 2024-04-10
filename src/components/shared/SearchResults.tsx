import { Models } from 'appwrite';

import GridPostList from '@/components/shared/GridPostList.tsx';
import Loader from '@/components/shared/Loader.tsx';

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />;

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }
  return (
    <p className="mt-10 w-full text-center text-light-4">No results found</p>
  );
};
export default SearchResults;
