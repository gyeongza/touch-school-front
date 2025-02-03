'use server';

import { revalidateTag } from 'next/cache';
import { treeFetchTags } from '../_utils/fetch-tags';

export const revalidateTreeInfo = (userId: number) => {
  revalidateTag(treeFetchTags.treeInfo(userId));
};
