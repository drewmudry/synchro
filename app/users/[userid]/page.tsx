import React from 'react';

interface UserIdPageProps {
  params: { userid: string };
}

const Page = ({ params }: UserIdPageProps) => {
    const { userid } = params;
  
    return (
      <div>
        I AM USER {userid}
      </div>
    );
  };
  
export default Page;

