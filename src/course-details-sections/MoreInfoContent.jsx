import React from 'react';
import { Disclosure } from '@headlessui/react';

const MoreInfoContent = ({course}) => {

  if (!course || !course.more_info) return <p></p>;

  return (
    <div className="space-y-4">
      <h1 className="uppercase text-3xl font-bold text-center mb-6">More Information</h1>
      
 
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
      <div dangerouslySetInnerHTML={{ __html: course.more_info }} />
      </div>
    </div>
  );
};

export default MoreInfoContent;
