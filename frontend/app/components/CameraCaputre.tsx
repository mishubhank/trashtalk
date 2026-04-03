"use client";

interface Props {
  image: File | null;
  setImage: (file: File | null) => void;
}

export default function CameraCapture({ image, setImage }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
      <div className="flex flex-col items-center gap-6">
        <div className="w-full aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">No photo captured</span>
          )}
        </div>

        <label className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold text-center cursor-pointer hover:bg-black transition-all">
          {image ? "Change Photo" : "📸 Take Photo"}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </label>
      </div>
    </div>
  );
}
