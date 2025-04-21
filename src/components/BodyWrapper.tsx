'use client';
// import { useAppSelector } from '@/redux/hooks';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const BodyWrapper: FC<Props> = ({ children }) => {
  // const modalOpen = useAppSelector(
  //   (state) => state.modalSlice.bodyOverflowHidden
  // );

  return <body className='bg-gray-100'>{children}</body>;
};

export default BodyWrapper;
