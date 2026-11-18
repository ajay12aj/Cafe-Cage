import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { categories } from "../../assets/assets";

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();
  const [editing, setEditing] = useState(null);
  const [files, setFiles] = useState([]);

  const closeEdit = () => {
    setEditing(null);
    setFiles([]);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...editing,
        description: Array.isArray(editing.description)
          ? editing.description
          : String(editing.description || "").split("\n"),
      };
      const fd = new FormData();
      fd.append("productData", JSON.stringify(productData));
      files.forEach((file) => fd.append("images", file));

      const { data } = await axios.patch(
        `/api/product/update/${editing._id}`, fd, { timeout: 120000 }
      );

      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      closeEdit();
      await fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      const { data } = await axios.delete(`/api/product/${id}`);
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      await fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const editProduct = (product) => {
    setEditing({
      ...product,
      description: Array.isArray(product.description)
        ? product.description.join("\n")
        : product.description || "",
    });
    setFiles([]);
  };

  return (
    <div className="no-scrollbar min-w-0 flex-1 h-[95vh] overflow-y-auto">
      <div className="w-full min-w-0 p-4 md:p-6 lg:p-8">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        <div className="w-full overflow-x-auto rounded-md border border-gray-500/20 bg-white">
          <table className="w-full min-w-[600px] table-fixed">
            <colgroup>
              <col className="w-[42%]" />
              <col className="w-[18%]" />
              <col className="w-[17%]" />
              <col className="w-[23%]" />
            </colgroup>
            <thead className="bg-gray-50 text-left text-sm text-gray-900">
              <tr>
                {["Product", "Category", "Price", "Action"].map((title) => (
                  <th key={title} className="px-4 py-3">{title}</th>
                ))}
              </tr>
            </thead>

            <tbody className="text-sm text-gray-500">
              {(products || []).map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <img src={product.image?.[0]} alt={product.name || "Product"}
                        className="h-14 w-14 shrink-0 rounded object-cover sm:h-16 sm:w-16" />
                      <span className="break-words">{product.name}</span>
                    </div>
                  </td>
                  <td className="break-words px-4 py-3">{product.category}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {currency}{product.offerPrice}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button onClick={() => editProduct(product)}
                        className="rounded bg-primary/10 px-3 py-1.5 text-primary hover:bg-primary/20">
                        Edit
                      </button>
                      <button onClick={() => deleteProduct(product._id)}
                        className="rounded border border-red-200 px-3 py-1.5 text-red-600 hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!products || products.length === 0) && (
                <tr><td colSpan={4} className="px-4 py-8 text-center">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={saveEdit}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Edit Product</h3>
              <button type="button" onClick={closeEdit} className="text-2xl">×</button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input required value={editing.name || ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="Product name" className="rounded-lg border p-3" />

              <select required value={editing.category || ""}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="rounded-lg border p-3">
                {categories.map((c) => <option key={c.path} value={c.path}>{c.text}</option>)}
              </select>

              <input required type="number" min="0" step="any" value={editing.price ?? ""}
                onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                placeholder="Price" className="rounded-lg border p-3" />

              <input required type="number" min="0" step="any" value={editing.offerPrice ?? ""}
                onChange={(e) => setEditing({ ...editing, offerPrice: e.target.value })}
                placeholder="Offer price" className="rounded-lg border p-3" />
            </div>

            <textarea rows={4} value={editing.description || ""}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              placeholder="Description" className="mt-4 w-full rounded-lg border p-3" />

            <div className="mt-4">
              <label className="font-medium">Replace images (optional)</label>
              <input type="file" accept="image/*" multiple
                onChange={(e) => setFiles(Array.from(e.target.files || []).slice(0, 4))}
                className="mt-2 block max-w-full" />
              <p className="mt-1 text-xs text-gray-500">Maximum 4 selected images.</p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={closeEdit} className="rounded-lg border px-5 py-2">
                Cancel
              </button>
              <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-white">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductList;