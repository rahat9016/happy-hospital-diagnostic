import {
  CalendarDays,
  LayoutDashboard,
  LucideIcon
} from "lucide-react";

export interface MenuItem {
  label: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  href?: string;
  children?: { label: string; href: string }[];
}

export function getMenuItems(

): MenuItem[] {

  const menuItems: (MenuItem | false)[] = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin" },
    
    {
      label: "Events",
      icon: CalendarDays,
      // children: hasPermission
      //   ? [
      //       { label: "Event List", href: "/admin/events/events-list" },
      //       {
      //         label: "Events Categories",
      //         href: "/admin/events/events-categories",
      //       },
      //       { label: "Events Tags", href: "/admin/events/events-tags" },
      //     ]
      //   : [{ label: "Event List", href: "/admin/events/events-list" }],
    },
    
  ];

  return menuItems.filter(Boolean) as MenuItem[];
}
