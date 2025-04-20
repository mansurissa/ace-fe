'use client';

import Error from 'next/error';

import React from 'react';

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <p className='mt-20 text-center font-bold text-3xl'>Something went wrong</p>
  );
};

export default error;
