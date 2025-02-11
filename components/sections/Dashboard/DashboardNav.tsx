'use client'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Tabs,
    Tab,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import { IoHome, IoGitNetworkOutline } from "react-icons/io5";
import { FaInfo, FaBlog } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { SiHyperskill } from "react-icons/si";
import { GrProjects } from "react-icons/gr";
import { LogoutFunc } from "@/functions/LogOut";

const DashboardNav = ({ user }: { user: any }) => {
    const pathname = usePathname();
    const links = [
        { href: '/dashboard', label: 'Home', icon: <IoHome /> },
        { href: '/dashboard/info', label: 'Info', icon: <FaInfo /> },
        { href: '/dashboard/experience', label: 'Work Experience', icon: <IoGitNetworkOutline /> },
        { href: '/dashboard/education', label: 'Education', icon: <MdCastForEducation /> },
        { href: '/dashboard/skills', label: 'Skills', icon: <SiHyperskill /> },
        { href: '/dashboard/projects', label: 'Projects', icon: <GrProjects /> },
        { href: '/dashboard/blog', label: 'Blog', icon: <FaBlog /> },
    ];
    console.log(user)

    return <>
        <Navbar isBlurred isBordered>
            <NavbarContent >
                <NavbarBrand className="mr-4">
                    <p className="font-bold text-inherit">{user.userName}</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="center" className="hidden md:flex">
                <Tabs
                    aria-label="Options"
                    selectedKey={pathname}
                    variant="solid"
                    color="primary"
                    size="sm"
                    radius="full"
                >
                    {links.map((link, index) =>
                        <Tab key={link.href} href={link.href} title={
                            <div className="flex items-center space-x-1">
                                {link.icon}
                                <span>{link.label}</span>
                            </div>
                        } />
                    )}
                </Tabs>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="default"
                            name="Jason Hughes"
                            size="sm"
                            src={user?.Userimage?.url}
                        />
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <>
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{user?.userEmail}</p>
                            </DropdownItem>

                            <>
                                {links.map((link) => (
                                    <DropdownItem key={link.label} as={Link} href={link.href}>
                                        {link.label}
                                    </DropdownItem>
                                ))}
                            </>

                            <DropdownItem onPress={LogoutFunc} key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar >
    </>;
};

export default DashboardNav;