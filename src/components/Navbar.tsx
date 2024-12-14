"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, ListIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Car Inventory
          </Link>
          <div className="space-x-2">
            <Button variant={pathname === "/" ? "default" : "outline"} asChild>
              <Link href="/">
                <ListIcon className="mr-2 h-4 w-4" />
                View Cars
              </Link>
            </Button>
            <Button
              variant={pathname === "/add-cars" ? "default" : "outline"}
              asChild
            >
              <Link href="/add-cars">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Car
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
