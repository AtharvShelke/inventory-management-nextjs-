import Image from "next/image";

const projects = [
  {
    id: 1,
    name: 'Modern Minimalist Kitchen',
    description: 'A sleek, contemporary design with clean lines, neutral tones, and functional spaces. Open shelving and hidden storage enhance both form and practicality, creating a serene and balanced kitchen environment.',
    image: '/downloads/kitchen-5.jpg',
    link: ''
  },
  {
    id: 2,
    name: 'Rustic Farmhouse Kitchen',
    description: 'A warm, inviting design featuring earthy wood textures, open shelving, and a cozy ambiance. The spacious layout includes a farmhouse sink and ample room for family gatherings, combining functionality with a traditional charm.',
    image: '/downloads/kitchen-11.jpg',
    link: ''
  },
  {
    id: 3,
    name: 'Luxurious Modular Kitchen',
    description: 'A high-tech kitchen with premium finishes, marble countertops, and custom cabinetry. Innovative storage solutions like pull-out pantries and hidden drawers keep everything organized while maintaining a sleek and luxurious design.',
    image: '/downloads/kitchen-18.jpg',
    link: ''
  },
  {
    id: 4,
    name: 'Contemporary Urban Kitchen',
    description: 'This urban kitchen features a blend of modern aesthetics and practicality. Sleek black cabinetry, gold accents, and open shelving create an ideal setting for cooking and socializing in style.',
    image: '/downloads/kitchen-19.jpg',
    link: ''
  },
  {
    id: 5,
    name: 'Traditional English Kitchen',
    description: 'A charming, classic kitchen design that incorporates intricate cabinetry, vintage-inspired appliances, and timeless detailing. This design reflects the elegance and functionality of traditional English kitchens.',
    image: '/downloads/kitchen-9.jpg',
    link: ''
  },
  {
    id: 6,
    name: 'Scandinavian Bright Kitchen',
    description: 'Inspired by Scandinavian design principles, this kitchen features light wood finishes, bright whites, and clean lines, creating an open and airy environment that promotes simplicity and efficiency.',
    image: '/downloads/kitchen-16.jpg',
    link: ''
  },
];

export default function Page() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[url('/image/backgroundproject.jpg')] bg-center bg-cover bg-no-repeat h-[60vh] flex items-center justify-center text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-widest leading-tight px-4 sm:px-8">
          Our Projects
        </h1>
      </div>

      {/* Projects Section */}
      <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-16">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative w-full h-64 sm:h-80 md:h-96">
              <Image
                src={project.image}
                width={600}
                height={450}
                alt={`Project: ${project.name}`}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                priority={project.id === 1}
                loading={project.id !== 1 ? "lazy" : undefined}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-6 flex flex-col justify-end">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white">{project.name}</h2>
              <p className="text-sm sm:text-base text-white mt-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
