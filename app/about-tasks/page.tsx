// app/about-notes/page.tsx
import React from 'react';
import Header from '../_components/header';

const page = () => {
  return (
    <div className="bg-[#F5EBDE] min-h-screen">
      <Header />
      <div>
        <h1>About tasks</h1>
        <p>This is the About tasks page.</p>
      </div>
    </div>
  );
};

export default page;