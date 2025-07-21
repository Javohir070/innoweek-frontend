"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      title: "Urban.Tech Uzbekistan 2024 hackathon",
      content: "Urban.Tech Uzbekistan 2024 xakaton musobaqasi bo'lib o'tadi! 2024-yil 14-16 noyabr kunlari xakatonda ishtirok etib 48 soat ichida: ijodingizni namoyish eting, yangi do'stlar ortiring, mahoratingizni oshiring, portfolioyingizga yangi loyiha qo'shing.",
      image: "/assets/img/about/news1.png",
      author: "Innoweek",
      role: "Innovatsiya"
    },
    {
      title: "InnoWeek-2024 ochilish marosimi",
      content: "InnoWeek-2024– xalqaro innovatsion g'oyalar haftaligining ochilish marosimi bo'lib o'tdi. Unda O‘zbekiston Respublikasi Bosh vazirining o‘rinbosari Zulayxo Maxkamova, Oliy taʼlim, fan va innovatsiyalar vaziri Qo‘ng‘irotboy Sharipov ishtirok etishdi.",
      image: "/assets/img/about/news2.png",
      author: "Innoweek",
      role: "Innovatsiya"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                        <h3 className="text-xl font-bold mb-4">{testimonial.title}</h3>
                        <p className="mb-6">{testimonial.content}</p>
                        <div className="flex items-center">
                          <Image 
                            src="/assets/img/services/616.jpg" 
                            className="w-12 h-12 rounded-full mr-4" 
                            alt={testimonial.author}
                          />
                          <div>
                            <h4 className="font-bold">{testimonial.author}</h4>
                            <span className="text-sm text-gray-600">{testimonial.role}</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/3 hidden md:block">
                        <Image 
                          src={testimonial.image} 
                          className="w-full h-auto rounded-lg" 
                          alt="Testimonial"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}