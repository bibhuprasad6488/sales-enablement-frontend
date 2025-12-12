

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AuthTab from './AuthTab';
import Breadcrumb from '../components/Breadcrumb';
import { useTab } from '../context/TabContext';

function LoginSignUp() {
    const { activeTab } = useTab();
    return (
        <>
            <section>
                <div className="relative w-full h-full course-bg">
                    <div className="relative bg-layer">
                        <Navbar />
                        <div className="text-white flex items-center justify-center container mx-auto px-4 pt-6 sm:px-4 sm:pt-16 ">
                            <h1 className="sm:text-2xl  md:text-4xl lg:text-5xl uppercase font-bold">The Sales Enablement Account</h1>
                        </div>
                        <div className="text-white flex items-center justify-center capitalize container mx-auto px-4 pt-4 pb-10 sm:px-4 sm:pt-10 sm:pb-20">
                            <Breadcrumb breadcrumbs={[{ label: 'Home', to: '/' }, { label: activeTab }]} />
                        </div>
                    </div>
                </div>
            </section>

            <div className='container mx-auto px-4 '>
                <AuthTab />
            </div>
        </>
    );
}

export default LoginSignUp;
