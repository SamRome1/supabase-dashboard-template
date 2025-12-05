import ItemsList from "@/components/dashboard/ItemsList";
import AddItemButton from "@/components/dashboard/AddItemButton";

export default function DashboardPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            My Items
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Manage your personal items. Only you can see and edit your data.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <AddItemButton />
        </div>
      </div>
      <div className="mt-8">
        <ItemsList />
      </div>
    </div>
  );
}

