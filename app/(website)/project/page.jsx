import Image from "next/image"

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
];



export default function Page() {
  return (
    <div>
      <div className="bg-[url('/image/backgroundproject.jpg')] bg-center bg-cover">
        <h1 className="container py-56 text-6xl font-semibold tracking-widest text-white">Our Projects</h1>
      </div>
      
      <div className="container grid lg:grid-cols-2 gap-8 py-8">
        {projects.map((project) => (
          <div key={project.id} className="relative overflow-hidden rounded-xl group p-10">
            <Image
              src={project.image}
              width={480}
              height={380}
              alt={`Project: ${project.name}`}
              className="w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              // Apply priority only for the first project
              priority={project.id === 1} // Priority for the first image (above-the-fold)
              loading={project.id !== 1 ? "lazy" : undefined} // Lazy loading for other images
            />
            <div className="absolute bottom-0 right-0 bg-white/90 flex-col items-center justify-end w-96 h-96 gap-8 p-10  text-xl transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
              <h2 className="text-2xl font-semibold">{project.name}</h2>
              <p className="py-4">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
