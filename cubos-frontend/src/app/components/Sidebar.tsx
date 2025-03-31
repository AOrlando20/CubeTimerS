export default function Sidebar() {
    return <aside className={"bg-[#272727] flex flex-col w-15 flex-1 items-center"}>
        <div className={"sidebar-darkmode p-5"}>
            <span className={"material-symbols-outlined"}>
                dark_mode
            </span>
        </div>
        <div className={"sidebar-timer-menu w-full p-5 grid items-center justify-center hover:bg-[#343434] border-box relative"}>
            <span className={"material-symbols-outlined"}>
            browse_gallery
            </span>
        </div>
        <div className={"flex-1"}></div>
        <div className={"sidebar-account-avatar p-5"}>
            <span className={"material-symbols-outlined"}>
                account_circle
            </span>
        </div>
        <div className={"sidebar-settings p-5"}>
            <span className="material-symbols-outlined">
            settings
            </span>
        </div>
    </aside>
}