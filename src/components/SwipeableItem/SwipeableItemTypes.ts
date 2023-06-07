import React from 'react';

export type SwipeableItemProps = {
  item?: any;
  onDelete?: (item: string) => void;
  children: React.ReactNode;
};
