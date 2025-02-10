'use server';

import { revalidateTag } from 'next/cache';
import { treeFetchTags, userFetchTags } from '../_utils/fetch-tags';

export const revalidateUser = () => {
  revalidateTag(userFetchTags.user());
};

export const revalidateTreeInfo = (userId: number) => {
  revalidateTag(treeFetchTags.treeInfo(userId));
};
