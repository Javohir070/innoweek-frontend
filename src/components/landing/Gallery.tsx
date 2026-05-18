import AppImage from "@/lib/AppImage";

export default function GallerySection() {


  const galleryItems = [
    { id: 1, src: "/assets/img/abstract/gallery_1732534936.jpg", alt: "Gallery 1" },
    { id: 2, src: "/assets/img/abstract/gallery_1732534993.jpg", alt: "Gallery 2" },
    { id: 3, src: "/assets/img/abstract/gallery_1732534997.jpg", alt: "Gallery 3" },
    { id: 4, src: "/assets/img/abstract/gallery_1747399201.jpg", alt: "Gallery 4" },
    { id: 5, src: "/assets/img/abstract/gallery_1747399214.jpg", alt: "Gallery 5" },
    { id: 6, src: "/assets/img/abstract/gallery_1747399227.jpg", alt: "Gallery 6" },
    { id: 7, src: "/assets/img/abstract/4.jpg", alt: "Gallery 7" },
    { id: 8, src: "/assets/img/abstract/5.jpg", alt: "Gallery 8" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">INNOWEEK</h2>
          <p className="text-lg text-gray-600">GALEREYA</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div key={item.id} className="relative group overflow-hidden rounded-lg">
              <AppImage
                src={item.src}
                alt={item.alt}
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                <button className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}