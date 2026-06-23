import React from 'react'

const ProductImagesModal = ({open, onClose, handleImageChange, removeImage, images, error, onDone}) => {
  
if(!open) return

return     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3">Upload Images</h2>

        {/* error */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* file input */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        {/* previews */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.url}
                className="h-20 w-full object-cover rounded-md"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* actions */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-gray-200 rounded"
          >
            Close
          </button>

          <button
            onClick={onDone}
            className="px-3 py-1 text-sm bg-sky-500 text-white rounded"
          >
            Done
          </button>
        </div>
      </div>
    </div>

}


export default ProductImagesModal
