import { useDisclosure } from '@mantine/hooks';
import { Burger, Menu } from '@mantine/core';

export default function BasicMenu() {
    const [opened, { toggle, close }] = useDisclosure();
    return (
        <Menu opened={opened} onClose={close}>
            <Menu.Target>
                <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item component="a" href="/">Home</Menu.Item>
                <Menu.Item component="a" href="/about">About</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
