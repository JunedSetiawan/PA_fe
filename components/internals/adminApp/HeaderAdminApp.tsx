'use client'

import Profile from '@/components/siomaApps/Profile'
import SubAppNavigator from '@/components/siomaApps/SubAppNavigator'
import React, { useEffect } from 'react'

function HeaderAdminApp() {
    useEffect(() => {
        if (document.body.clientWidth < 1024) {
            onClickSlider(true)
        }
    }, [])

    return (
        <header className="header">
            <div className="flex items-center">
                <div
                    className="header-icon-square"
                    onClick={() => { onClickSlider() }}>
                    <i className="bi bi-justify-left text-lg" />
                </div>
            </div>
            <div className="ml-auto flex items-center">
                <SubAppNavigator />
                <Profile />
            </div>
        </header>
    )
}












/**
 * Handle toggle sidebar on click icon slider.
 */
function onClickSlider(isCollapse = false) {
    const sidebarEl = document.body.classList;
    if (isCollapse) {
        if (!sidebarEl.contains('sidebar-collapse')) {
            sidebarEl.add('sidebar-collapse');
        }
    } else {
        if (!sidebarEl.contains('sidebar-collapse')) {
            sidebarEl.add('sidebar-collapse');
        } else {
            sidebarEl.remove('sidebar-collapse');
        }
    }

}

export default HeaderAdminApp