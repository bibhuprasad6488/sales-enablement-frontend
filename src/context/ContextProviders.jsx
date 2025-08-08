import React from 'react'
import { AuthProvider } from './AuthContext'
import { TabProvider } from './TabContext'
import { ContactApiProvider } from './ContactContextApi'
import { ServiceApiProvider } from './ServiceContextApi'
import { CourseApiProvider } from './CourseContextApi'
import { WebsiteApiProvider } from './WebsiteDataContext'
import { FilterProvider } from './FilterContextApi'

function ContextProviders({ children }) {
    return (
        <> 
         <FilterProvider>
            <WebsiteApiProvider>
                <CourseApiProvider>
                    <ServiceApiProvider>
                        <ContactApiProvider>
                            <AuthProvider>
                                <TabProvider>
                                    {children}
                                </TabProvider>
                            </AuthProvider>
                        </ContactApiProvider>
                    </ServiceApiProvider>
                </CourseApiProvider>
            </WebsiteApiProvider>
        </FilterProvider>
        </>
    )
}
export default ContextProviders