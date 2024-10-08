import React from "react";
import { LogIn, LogOut } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { getCurrentUser } from "@/services/authService";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "@/store/slices/userSlice";

export default function Navbar() {
  const userSlice = useSelector((state) => state.entities.user);
  const dispatch = useDispatch();
  // console.log("NV", userSlice);

  return (
    <div className="w-full p-2 grid justify-items-end bg-emerald-300">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/admin/student" className={navigationMenuTriggerStyle()}>
              Student
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/admin" className={navigationMenuTriggerStyle()}>
              Admin
            </Link>
          </NavigationMenuItem>{" "}
          {/* {currentUser === null ? ( */}
          {userSlice && userSlice.token != null ? (
            <NavigationMenuItem>
              <Link to="/logout" className={navigationMenuTriggerStyle()}>
                <LogOut size={20} color="#ff8800" strokeWidth={2} />
              </Link>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <Link to="/login" className={navigationMenuTriggerStyle()}>
                <LogIn size={20} color="#ff8800" strokeWidth={2} />
              </Link>
            </NavigationMenuItem>
          )}
          {/* ) : null} */}
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
