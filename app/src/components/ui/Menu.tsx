import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Burger, Menu } from '@mantine/core';
import { Stack, Tooltip, UnstyledButton } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom'

import {
    FaUser,
    FaHome
} from 'react-icons/fa';

function MobileBurger() {
    const [opened, { toggle, close }] = useDisclosure();
    const navigate = useNavigate();
    return (
        <div className="mobile-header">
            <Menu opened={opened} onClose={close}>
                <Menu.Target>
                    <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={() => { navigate('/'); close(); }}>Home</Menu.Item>
                    <Menu.Item onClick={() => { navigate('/about'); close(); }}>About</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
}

interface NavbarLinkProps {
    icon: typeof FaHome;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

const routes = [
    { icon: FaHome, label: 'Home', path: '/' },
    { icon: FaUser, label: 'About' , path: '/about'},
    // { icon: IconGauge, label: 'Dashboard' },
    // { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    // { icon: IconCalendarStats, label: 'Releases' },
    // { icon: IconFingerprint, label: 'Security' },
    // { icon: IconSettings, label: 'Settings' },
];

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
                onClick={onClick}
                className="link"
                data-active={active || undefined}
                aria-label={label}
            >
                <Icon size={20} stroke={"1.5"} />
            </UnstyledButton>
        </Tooltip>
    );
}

export default function BasicMenu() {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const navigate = useNavigate();
    const location = useLocation();
    const active = routes.findIndex(r => r.path === location.pathname);

    if (isMobile) return <MobileBurger />;

    const links = routes.map((link, index = 0) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => navigate(link.path)}
        />
    ));

    return (
        <nav className="navbar">
            <div className="navbarMain">
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>
        </nav>
    );
}
