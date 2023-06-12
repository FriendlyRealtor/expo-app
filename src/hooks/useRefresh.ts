import React, { useCallback, useState } from 'react';

export type UseRefreshProps = {
  handleRefresh: () => Promise<void>;
};

export const useRefresh = ({ handleRefresh }: UseRefreshProps) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    handleRefresh().finally(() => setIsRefreshing(false));
  }, [handleRefresh]);

  return { isRefreshing, onRefresh };
};
