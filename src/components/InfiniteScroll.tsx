import React, { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface InfiniteScrollProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemsPerPage?: number;
  hasMore?: boolean;
  loadMore?: () => void;
  loadingIndicator?: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  items,
  renderItem,
  itemsPerPage = 10,
  hasMore = false,
  loadMore,
  loadingIndicator,
}) => {
  const [displayItems, setDisplayItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const loadingRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(loadingRef, { rootMargin: '200px' });

  // Initialize with first page of items
  useEffect(() => {
    setDisplayItems(items.slice(0, itemsPerPage));
    setPage(1);
  }, [items, itemsPerPage]);

  // Load more items when intersection observer triggers
  useEffect(() => {
    if (isIntersecting && hasMore && loadMore) {
      loadMore();
    } else if (isIntersecting && items.length > displayItems.length) {
      const nextPage = page + 1;
      const newItems = items.slice(0, nextPage * itemsPerPage);
      setDisplayItems(newItems);
      setPage(nextPage);
    }
  }, [isIntersecting, hasMore, loadMore, items, displayItems, page, itemsPerPage]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item, index) => (
          <div key={item.id ?? index} className="w-full">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      
      <div ref={loadingRef} className="py-8 flex justify-center">
        {items.length > displayItems.length || hasMore ? (
          loadingIndicator || (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce delay-200"></div>
            </div>
          )
        ) : items.length > 0 ? (
          <p className="text-sm text-light-text/70 dark:text-dark-text/70">
            Sudah tidak ada kasus lain yang dapat ditampilkan
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default InfiniteScroll;