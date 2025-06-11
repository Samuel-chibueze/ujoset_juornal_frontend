// "use client";

// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { BookOpen, LogOut, User, Menu, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Ujoset from '@/images/unicross.png'

// // Mock auth store for demonstration - replace with your actual auth implementation
// const useAuthStore = () => ({
//   isAuthenticated: false, // Change this to test authenticated state
//   user: { name: 'John Doe', role: 'user' }, // Mock user data
//   logout: () => console.log('Logging out...')
// });

// export function NavBar() {
//   const { isAuthenticated, user, logout } = useAuthStore();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     router.push('/login');
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [pathname]);

//   // Close mobile menu on resize to desktop
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setMobileMenuOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [mobileMenuOpen]);

//   if (!isAuthenticated) {
//     return (
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
//           <Image src={Ujoset} alt='ujoset logo' className="h-8 w-8 text-primary"/>
//             <span className="text-xl font-semibold tracking-tight">Ujoset Journal</span>
//           </Link>

//           {/* Desktop navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link 
//               href="/" 
//               className={`text-sm font-medium hover:text-primary transition-colors ${
//                 pathname === '/' ? 'text-primary' : 'text-muted-foreground'
//               }`}
//             >
//               Home
//             </Link>
//             <Link 
//               href="/about" 
//               className={`text-sm font-medium hover:text-primary transition-colors ${
//                 pathname === '/about' ? 'text-primary' : 'text-muted-foreground'
//               }`}
//             >
//               About
//             </Link>
//             <Link 
//               href="/journals" 
//               className={`text-sm font-medium hover:text-primary transition-colors ${
//                 pathname === '/journals' ? 'text-primary' : 'text-muted-foreground'
//               }`}
//             >
//               Journals
//             </Link>
//             <Link 
//               href="/contact" 
//               className={`text-sm font-medium hover:text-primary transition-colors ${
//                 pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'
//               }`}
//             >
//               Contact
//             </Link>
//             <Button 
//               onClick={() => router.push('/login')} 
//               className="bg-primary hover:bg-primary/90"
//             >
//               Log in
//             </Button>
//           </nav>

//           {/* Mobile menu button */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden"
//             onClick={toggleMobileMenu}
//             aria-label="Toggle navigation menu"
//             aria-expanded={mobileMenuOpen}
//           >
//             {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//           </Button>
//         </div>

//         {/* Mobile menu overlay */}
//         {mobileMenuOpen && (
//           <div className="fixed inset-0 top-[73px] z-50 md:hidden">
//             <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMobileMenu} />
//             <div className="relative bg-background border-b shadow-lg">
//               <nav className="container px-6 py-6 space-y-4">
//                 <Link
//                   href="/"
//                   className={`block text-lg font-medium hover:text-primary transition-colors ${
//                     pathname === '/' ? 'text-primary' : 'text-muted-foreground'
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   href="/about"
//                   className={`block text-lg font-medium hover:text-primary transition-colors ${
//                     pathname === '/about' ? 'text-primary' : 'text-muted-foreground'
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   About
//                 </Link>
//                 <Link
//                   href="/journals"
//                   className={`block text-lg font-medium hover:text-primary transition-colors ${
//                     pathname === '/journals' ? 'text-primary' : 'text-muted-foreground'
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   Journals
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className={`block text-lg font-medium hover:text-primary transition-colors ${
//                     pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   Contact
//                 </Link>
//                 <div className="pt-4 border-t">
//                   <Button
//                     onClick={() => {
//                       router.push('/login');
//                       toggleMobileMenu();
//                     }}
//                     className="w-full bg-primary hover:bg-primary/90"
//                   >
//                     Log in
//                   </Button>
//                 </div>
//               </nav>
//             </div>
//           </div>
//         )}
//       </header>
//     );
//   }

//   // Authenticated navbar
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
//         <Image src={Ujoset} alt='ujoset logo' className="h-8 w-8 text-primary"/>
//         <span className="text-xl font-semibold tracking-tight">Academic Journal</span>
//         </Link>

//         {/* Desktop navigation */}
//         <div className="hidden md:flex items-center gap-6">
//           <nav className="flex space-x-6 text-sm font-medium">
//             {user?.role === 'admin' ? (
//               <Link
//                 href="/admin"
//                 className={`hover:text-primary transition-colors ${
//                   pathname.startsWith('/admin') ? 'text-primary' : 'text-muted-foreground'
//                 }`}
//               >
//                 Admin Dashboard
//               </Link>
//             ) : (
//               <>
//                 <Link
//                   href="/dashboard"
//                   className={`hover:text-primary transition-colors ${
//                     pathname.startsWith('/dashboard') ? 'text-primary' : 'text-muted-foreground'
//                   }`}
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   href="/upload"
//                   className={`hover:text-primary transition-colors ${
//                     pathname.startsWith('/upload') ? 'text-primary' : 'text-muted-foreground'
//                   }`}
//                 >
//                   Upload Journal
//                 </Link>
//               </>
//             )}
//           </nav>

//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
//               <User className="h-4 w-4" />
//               <span className="text-sm font-medium">{user?.name}</span>
//             </div>
//             <Button variant="ghost" size="sm" onClick={handleLogout}>
//               <LogOut className="h-4 w-4 mr-2" />
//               Logout
//             </Button>
//           </div>
//         </div>

//         Mobile menu button
//         <Button
//           variant="ghost"
//           size="sm"
//           className="md:hidden"
//           onClick={toggleMobileMenu}
//           aria-label="Toggle navigation menu"
//           aria-expanded={mobileMenuOpen}
//         >
//           {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//         </Button>
//       </div>

//       {/* Mobile menu overlay */}
//       {/* {mobileMenuOpen && (
//         <div className="fixed inset-0 top-[73px] z-50 md:hidden">
//           <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMobileMenu} />
//           <div className="relative bg-background border-b shadow-lg">
//             <nav className="container px-6 py-6 space-y-4">
//               {user?.role === 'admin' ? (
//                 <Link
//                   href="/admin"
//                   className={`block text-lg font-medium hover:text-primary transition-colors ${
//                     pathname.startsWith('/admin') ? 'text-primary' : 'text-muted-foreground'
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   Admin Dashboard
//                 </Link>
//               ) : (
//                 <>
//                   <Link
//                     href="/dashboard"
//                     className={`block text-lg font-medium hover:text-primary transition-colors ${
//                       pathname.startsWith('/dashboard') ? 'text-primary' : 'text-muted-foreground'
//                     }`}
//                     onClick={toggleMobileMenu}
//                   >
//                     Dashboard
//                   </Link>
//                   <Link
//                     href="/upload"
//                     className={`block text-lg font-medium hover:text-primary transition-colors ${
//                       pathname.startsWith('/upload') ? 'text-primary' : 'text-muted-foreground'
//                     }`}
//                     onClick={toggleMobileMenu}
//                   >
//                     Upload Journal
//                   </Link>
//                 </>
//               )}

//               <div className="pt-4 border-t space-y-4">
//                 <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted">
//                   <User className="h-4 w-4" />
//                   <span className="text-sm font-medium">{user?.name}</span>
//                 </div>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start"
//                   onClick={() => {
//                     handleLogout();
//                     toggleMobileMenu();
//                   }}
//                 >
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Logout
//                 </Button>
//               </div>
//             </nav>
//           </div>
//         </div>
//       )} */}
//     </header>
//   );
// }


"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { BookOpen, LogOut, User, Menu, X, ChevronDown, Bell, Settings, FileText, Upload, BarChart3, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
// import Image from 'next/image';
import Ujoset from '@/images/unicross.png'
import { useSession, signIn,signOut } from "next-auth/react";


export function NavBar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    signOut();
    router.push('/login');
    setUserDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const publicNavItems = [
    { href: '/', label: 'Home', icon: BookOpen },
    { href: '/about', label: 'About', icon: FileText },
    { href: '/journals', label: 'Journals', icon: BookOpen },
    { href: '/contact', label: 'Contact', icon: User }
  ];

  const adminNavItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/journals', label: 'Journals', icon: BookOpen },
    { href: '/admin/settings', label: 'Settings', icon: Settings }
  ];

  const userNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/upload', label: 'Upload Journal', icon: Upload },
    { href: '/my-journals', label: 'My Journals', icon: FileText }
  ];
  // const user = session?.user;
  console.log(session)

  const currentNavItems = user?.role === 'ADMIN' ? adminNavItems : userNavItems;

  if (!isAuthenticated) {
    return (
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
        }`}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-200 group">
              <div className="relative">
                <Image src={Ujoset} alt='ujoset logo' className="h-8 w-8 text-primary" />

              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold bg-gradient-to-r bg-blue-500 bg-clip-text text-transparent">
                  UNICROSS JOSET
                </div>
                <div className="text-xs text-gray-500 -mt-1">Academic Excellence</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {publicNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${isActive
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                Log in
              </Button>
              <Button
                onClick={() => router.push('/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign up
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMobileMenu} />
            <Card className="relative bg-white border-0 shadow-2xl rounded-t-none">
              <CardContent className="p-0">
                <nav className="px-6 py-6 space-y-2">
                  {publicNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActive
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        onClick={toggleMobileMenu}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        router.push('/login');
                        toggleMobileMenu();
                      }}
                      className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Button>
                    <Button
                      onClick={() => {
                        router.push('/signup');
                        toggleMobileMenu();
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      Sign up
                    </Button>
                  </div>
                </nav>
              </CardContent>
            </Card>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
        : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
      }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-200 group">
            <div className="relative">
            <Image src={Ujoset} alt='ujoset logo' className="h-8 w-8 text-primary" />

             
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r bg-blue-500 bg-clip-text text-transparent">
                UNICROSS JOSET
              </div>
              <div className="text-xs text-gray-500 -mt-1">Academic Excellence</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${isActive
                      ? 'text-blue-600 bg-blue-50 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 hover:bg-red-500 text-xs">
                3
              </Badge>
            </Button>

            {/* User Dropdown */}
            <div className="relative user-dropdown">
              <Button
                variant="ghost"
                onClick={toggleUserDropdown}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-500 capitalize flex items-center">
                      {user?.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                      {user?.role}
                    </div>
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''
                  }`} />
              </Button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <Card className="absolute right-0 top-full mt-2 w-64 shadow-xl border-0 z-50">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-white">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user?.name}</div>
                          <div className="text-sm text-gray-500">{user?.email}</div>
                          <Badge variant="outline" className="mt-1 text-xs capitalize">
                            {user?.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                            {user?.role}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 text-gray-500" />
                        <span>Profile Settings</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Settings className="h-4 w-4 text-gray-500" />
                        <span>Preferences</span>
                      </Link>
                      <div className="border-t border-gray-100 my-2"></div>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 h-auto"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMobileMenu} />
          <Card className="relative bg-white border-0 shadow-2xl rounded-t-none">
            <CardContent className="p-0">
              <nav className="px-6 py-6 space-y-2">
                {currentNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      onClick={toggleMobileMenu}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign out
                  </Button>
                </div>
              </nav>
            </CardContent>
          </Card>
        </div>
      )}
    </header>
  );
}