import { type BaseQueryFn, type TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { type RefObject, useEffect, useState } from 'react';

interface UseInfiniteScrollProps<A, B, C extends BaseQueryFn> {
  scrollableContainerRef: RefObject<HTMLElement>;
  fetchFn: (page: number) => TypedUseQueryHookResult<A, B, C>;
  type?: 'column' | 'row';
}

export const useInfiniteScroll = <A, B, C extends BaseQueryFn>({
  scrollableContainerRef,
  fetchFn,
  type = 'column',
}: UseInfiniteScrollProps<A, B, C>) => {
  const [page, setPage] = useState(0);
  const result = fetchFn(page);

  useEffect(() => {
    const container = scrollableContainerRef.current;
    if (!container) return undefined;

    const onScroll = () => {
      const isEndScroll =
        type === 'column'
          ? container.scrollTop + container.clientHeight >= container.scrollHeight
          : container.scrollLeft + container.clientWidth >= container.scrollWidth;

      if (isEndScroll && !result.isLoading) {
        setPage(page + 1);
      }
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, [result.isLoading, page, scrollableContainerRef, type]);

  return result;
};
