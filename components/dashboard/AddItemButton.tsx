"use client";

export default function AddItemButton() {
  return (
    <button
      type="button"
      onClick={() => {
        const trigger = document.getElementById("add-item-trigger");
        if (trigger) {
          trigger.click();
        }
      }}
      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Add item
    </button>
  );
}

