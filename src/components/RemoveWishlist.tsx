"use client";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export default function RemoveWishlist({
  id,
  setDeleted,
  deleted,
}: {
  id: ObjectId;
  setDeleted: (num: boolean) => void;
  deleted: boolean;
}) {
  async function deleteWishlist() {
    await fetch("http://localhost:3000/api/wishlist/", {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setDeleted(true);
  }
  return (
    <>
      <div>
        <button onClick={deleteWishlist}>DELETE</button>
      </div>
    </>
  );
}
