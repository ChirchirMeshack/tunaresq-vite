import {ImageLogo} from "@components/logo";
import { MENU_ITEMS } from "./config";
import { Avatar, Button, Drawer, DrawerBody, DrawerContent, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuthStore } from "@stores/auth-store";
import { NavLink, useNavigate } from "react-router";
import clsx from "clsx";
import { PATHS } from "config";
import { useLogout, useChangeBusiness } from "@lib/handle-logout";

const MenuSection = ({ onClose }: { onClose?: () => void }) => (
	<>
		{MENU_ITEMS.map((item) => (
			<NavLink
			key={item.label}
			to={item.href}
            className={({ isActive }) =>
              clsx(
                "text-secondary hover:text-primary p-2",
                isActive && " bg-primary text-white rounded-lg font-extrabold"
              )
            }// border-b-3 border-primary
//             style={({ isActive }) => ({
// fontWeight: isActive ? "bold" : "",
// color: isActive ? "primary" : "secondary",
// border: isActive ? "3px solid primary" : "none",
// })}
            onClick={onClose}
            end
          >
            {item.label}
          </NavLink>
		))}
	</>
);

const CTASection = ({ onClose }: { onClose?: () => void }) => {
	const {user} = useAuthStore();
	const navigate = useNavigate();
	const handleLogout = useLogout();
	const changeActiveBusiness = useChangeBusiness();
	return (
	<>
	<div className="flex items-center gap-4">
		<Button
			onPress={handleLogout}
			radius="full"
			variant="bordered"
			// color="danger"
			startContent={<Icon icon="mdi:logout" className="text-danger" />}
			className="md:hidden text-danger rounded-full font-semibold hover:scale-105 transition"
		>
			Logout
		</Button>
		<Button
			onPress={() => {
				onClose?.();
				changeActiveBusiness();
			}}
			radius="full"
			variant="bordered"
			// color="danger"
			startContent={<Icon icon="mdi:settings" className="text-secondary" />}
			className="md:hidden text-secondary rounded-full font-semibold hover:scale-105 transition"
		>
			Change Business
		</Button>
		<Dropdown showArrow radius="sm" className="hidden md:block">
						<DropdownTrigger>
							<section className="hidden md:flex gap-4 cursor-pointer hover:text-dark ">
								<Avatar
									alt={user?.name}
									name={user?.name}
									// src="/icon.png"
									size="sm"
									radius="sm"
								/>
							</section>
						</DropdownTrigger>
						<DropdownMenu
							className="p-4 hidden md:block"
							aria-label="Profile Actions"
						>
							<DropdownItem
								startContent={<Icon icon="mdi:account" className="text-primary" />}
								key="update"
								onPress={() => navigate(PATHS.account.profile)}
							>
								View Profile
							</DropdownItem>
							<DropdownItem
								startContent={<Icon icon="mdi:settings" className="text-warning" />}
								className="text-warning"
								key="changeActiveBusiness"
								onPress={changeActiveBusiness}
							>
								Change Business
							</DropdownItem>
							<DropdownItem
								startContent={<Icon icon="mdi:logout" className="text-danger" />}
								className="text-danger"
								key="logout"
								onPress={handleLogout}
							>
								Logout
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
      </div>
	</>
);
};

interface MobileSidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
	return (
		<Drawer
			motionProps={{
				variants: {
					enter: {
						opacity: 1,
						x: 0,
					},
					exit: {
						x: 100,
						opacity: 0,
					},
				},
			}}
			isOpen={isOpen}
			size="sm"
			placement="left"
			radius="none"
			onClose={onClose}
		>
			<DrawerContent>
				<DrawerBody className="py-[1rem]">
					<ImageLogo />
					<div className="flex flex-col gap-3">
						<MenuSection onClose={onClose} />
						<CTASection onClose={onClose} />
					</div>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

const WebsiteNavbar = () => {
	const [showMenuDrawer, setShowMenuDrawer] = useState<boolean>(false);
	return (
		<>
			<nav>
				<div className="container py-[1.5rem] flex  items-center justify-between">
					<ImageLogo />
					<section className="hidden lg:flex items-center gap-[1rem]">
						<MenuSection />
					</section>
					<section className="hidden lg:flex items-center gap-[1rem]">
						<CTASection />
					</section>
					<Icon
            icon="quill:hamburger"
            className="text-primary md:hidden"
            fontSize={40}
            onClick={() => setShowMenuDrawer(true)}
          />
					{/* <Button
						size="lg"
						variant="light"
						isIconOnly
						onPress={}
						className="p-0"
					>
						<Icon className="text-2xl" icon="quill:hamburger" />
					</Button> */}
				</div>
			</nav>
			<MobileSidebar
				isOpen={showMenuDrawer}
				onClose={() => setShowMenuDrawer(false)}
			/>
		</>
	);
};

export default WebsiteNavbar;
