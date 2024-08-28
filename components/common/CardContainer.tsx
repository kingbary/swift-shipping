type Content = {
  heading: string;
  subHeading1: string;
  subHeading2: string;
  serviceAvailable: ServiceAvailableItems[]
}
type ServiceAvailableItems = {
  id: string | number;
  icon: React.ComponentType<any>;
  text: string;
}


function CardContainer({ content }: { content: Content }) {
  return (
    <div className='w-full h-[95%] bg-white rounded-md shadow-custom-small'>
      <div className='p-8'>
        <h2 className='text-2xl md:text-3xl font-extrabold tracking-tighter'>{content.heading}</h2>
        <p className='font-light text-xl md:text-2xl tracking-tighter mt-4'>{content.subHeading1}</p>
        <div className='h-[2px] w-14 bg-black mt-3'></div>
        <p className='font-extralight text-lg tracking-tighter mt-4'>
          {content.subHeading2}
        </p>
      </div>
      <div className='bg-[#f2f2f2] p-8'>
        <h5 className='font-bold tracking-tighter mb-4'>Services Available</h5>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {content.serviceAvailable.map((item) => {
            const Icon = item.icon;
            return (
              <div className='flex items-center gap-1 tracking-tighter text-sm' key={item.id}>
                <div className='bg-[#ffcc00] p-2 flex justify-center items-center rounded-sm'>
                  <Icon size={16} />
                </div>
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
      <div className='py-4 flex justify-center'>
        <button className='bg-red-600 tracking-tighter font-bold inline-flex h-12 items-center justify-center text-white w-full rounded-sm mx-6 hover:bg-red-600/90'>
          Explore SwiftShipping Express
        </button>
      </div>
    </div>
  );
}

export default CardContainer;
