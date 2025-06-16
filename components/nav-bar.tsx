import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {
  BookOpen,
  User,
  FileText,
  Upload,
  BarChart3,
  Users,
  File
} from "lucide-react";
import { MobileMenuToggle } from "@/components/navbar/mobile-menu-toggle";
import { UserDropdown } from "@/components/navbar/user-dropdown";
import { NotificationBell } from "@/components/navbar/notification-bell";
import { AuthButton } from "@/components/navbar/auth-button";
import Ujoset from "@/images/unicross.png";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  role: "PUBLISHER" | "ADMIN" | "USER";
}

interface NavItem {
  href: string;
  label: string;
}

export async function NavBar() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session;
  const user = session?.user as User;

  const publicNavItems: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/journal", label: "Journals" },
    { href: "/articles", label: "Articles" },
    { href: "/contact", label: "Contact" },
  ];

  const adminNavItems: NavItem[] = [
    { href: "/admin", label: "Dashboard" },
    { href: "/", label: "Home" },
  ];

  const userNavItems: NavItem[] = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/upload", label: "Upload Journal" },
    { href: "/my-journals", label: "My Journals" },
  ];

  const currentNavItems = user?.role === "ADMIN" ? adminNavItems : userNavItems;
  const navItems = isAuthenticated ? currentNavItems : publicNavItems;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image src={Ujoset} alt="ujoset logo" className="h-8 w-8" />
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r bg-blue-500 bg-clip-text text-transparent">
                UNICROSS JOSET
              </div>
              <div className="text-xs text-gray-500 -mt-1">Academic Excellence</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NotificationBell />
                <UserDropdown user={user} />
              </>
            ) : (
              <div className="hidden md:block">
                <AuthButton />
              </div>
            )}

            <MobileMenuToggle
              navItems={navItems}
              isAuthenticated={isAuthenticated}
              user={user}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
