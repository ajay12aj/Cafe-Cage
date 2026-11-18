import React, { useEffect, useState } from 'react'
import { assets, categories } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddProduct = () => {
  const [files, setFiles] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { axios, addProductToList, navigate } = useAppContext()

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file?.previewUrl) URL.revokeObjectURL(file.previewUrl)
      })
    }
  }, [files])

  const setSelectedFile = (index, selected) => {
    if (!selected) return

    if (!selected.type.startsWith('image/')) {
      toast.error('Please select an image file.')
      return
    }

    if (selected.size > 5 * 1024 * 1024) {
      toast.error('Each image must be 5 MB or smaller.')
      return
    }

    const nextFiles = [...files]
    const previous = nextFiles[index]

    if (previous?.previewUrl) {
      URL.revokeObjectURL(previous.previewUrl)
    }

    nextFiles[index] = {
      file: selected,
      previewUrl: URL.createObjectURL(selected),
    }

    setFiles(nextFiles)
  }

  const resetForm = () => {
    files.forEach((file) => {
      if (file?.previewUrl) URL.revokeObjectURL(file.previewUrl)
    })
    setName('')
    setDescription('')
    setCategory('')
    setPrice('')
    setOfferPrice('')
    setFiles([])
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    const cleanName = name.trim()
    const numericPrice = Number(price)
    const numericOfferPrice = Number(offerPrice)

    if (!cleanName || !category || !Number.isFinite(numericPrice) || !Number.isFinite(numericOfferPrice)) {
      toast.error('Please enter valid product details.')
      return
    }

    if (numericPrice < 0 || numericOfferPrice < 0) {
      toast.error('Price cannot be negative.')
      return
    }

    if (numericOfferPrice > numericPrice) {
      toast.error('Offer price cannot be greater than product price.')
      return
    }

    if (!files.some(Boolean)) {
      toast.error('Please select at least one product image.')
      return
    }

    setIsSubmitting(true)

    try {
      const productData = {
        name: cleanName,
        description: description.split('\n').map((line) => line.trim()).filter(Boolean),
        category,
        price: numericPrice,
        offerPrice: numericOfferPrice,
      }

      const formData = new FormData()
      formData.append('productData', JSON.stringify(productData))

      files.filter(Boolean).forEach(({ file }) => {
        formData.append('images', file)
      })

      const { data } = await axios.post('/api/product/add', formData, {
        timeout: 120000,
      })

      if (!data.success) {
        toast.error(data.message)
        return
      }

      // The API returns the complete new product, so update the global
      // product list immediately without waiting for a second API request.
      addProductToList(data.product)

      toast.success('Product added successfully.')

      // Send admin directly to the updated product list.
      navigate('/seller/product-list')
      resetForm()
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        'Unable to add product. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <p className="text-xs text-gray-500 mt-1">Add up to 4 images. JPG, PNG, WEBP, GIF or AVIF, max 5 MB each.</p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`images${index}`}>
                <input
                  onChange={(e) => setSelectedFile(index, e.target.files?.[0])}
                  type="file"
                  id={`images${index}`}
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  hidden
                />

                <img
                  className="max-w-24 w-24 h-24 object-cover cursor-pointer rounded border"
                  src={files[index]?.previewUrl || assets.upload_area}
                  alt="Upload preview"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
            disabled={isSubmitting}
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>{item.text}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex-1 flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              id="offer-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-2.5 text-white font-medium rounded cursor-pointer ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:opacity-90'
          }`}
        >
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  )
}

export default AddProduct
