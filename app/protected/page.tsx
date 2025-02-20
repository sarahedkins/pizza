import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <header>
        <h2 className="font-bold text-2xl mb-4">The Pizza Shop</h2>
        <p className="font-bold text-2xl mb-4">Inventory Management</p>
      </header>
      <ul className="flex flex-col space-y-4">
        <Link href="/protected/toppings-inventory">
          <button title="Toppings Inventory" className="bg-white text-black font-bold p-2 rounded-md">
            Toppings Inventory
          </button>
        </Link>
        <Link href="/protected/pizza-inventory">
          <button title="Pizza Inventory" className="bg-white text-black font-bold p-2 rounded-md">
            Pizza Inventory
          </button>
        </Link>
      </ul>
    </div>
  );
}
