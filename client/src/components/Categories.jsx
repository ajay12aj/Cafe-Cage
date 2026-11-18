import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  const { navigate } = useAppContext()

  return (
    <div className="mt-16">
      {/* Heading */}
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      
      {/* Categories Grid – with gap control */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-6 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            {/* Fixed size container – uniform images */}
            <div className="rounded-full overflow-hidden w-24 h-24 md:w-28 md:h-28 flex items-center justify-center bg-white shadow-sm">
              <img
                src={category.image}
                alt={category.text}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-center">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories