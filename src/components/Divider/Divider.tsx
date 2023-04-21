import React from 'react';
import { Divider as DividerUI } from '@ui-kitten/components';
import { DividerComponentProps } from './DividerTypes';

export const Divider = (props: DividerComponentProps) => {
  return <DividerUI {...props} />;
};
