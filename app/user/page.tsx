
import React from 'react';
import { auth } from '@clerk/nextjs';
import Feed from '@/components/user/feed';

const Page = () => {
  
  const { orgSlug } = auth();

  return (
    <section>
      <Feed slug={orgSlug} />
    </section>
  )
};

export default Page;