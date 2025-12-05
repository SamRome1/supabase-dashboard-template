"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";

interface Item {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  user_id: string;
}

export default function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchItems();

    // Subscribe to real-time changes
    const channel = supabase
      .channel("items-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "items",
        },
        () => {
          fetchItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching items:", error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    const { error } = await supabase.from("items").delete().eq("id", id);

    if (error) {
      alert("Error deleting item: " + error.message);
    } else {
      fetchItems();
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Loading items...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No items yet. Add your first item to get started!
          </p>
        </div>
        <AddItemModal onItemAdded={fetchItems} />
      </>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => (
            <li key={item.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    Created {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-4 flex space-x-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <AddItemModal onItemAdded={fetchItems} />
      {editingItem && (
        <EditItemModal
          item={editingItem}
          onItemUpdated={() => {
            setEditingItem(null);
            fetchItems();
          }}
          onClose={() => setEditingItem(null)}
        />
      )}
    </>
  );
}

