import { ChevronRight } from 'lucide-react'
type ContentProps = {
    heading: string;
    bgImg: string;
    text: string;
}
function ContentCard({ heading, bgImg, text }: ContentProps) {
    return (
        <div className='shadow-custom-small w-full cursor-pointer rounded-b-sm hover:text-red-600'>
            <div className={`bg-[url(/assets/images/${bgImg})] bg-cover bg[50%] w-full h-[178px] md:h-[330px]`} style={{backgroundImage: `url(/assets/images/${bgImg})`}}></div>
            <div className='p-8'>
                <div className='flex items-center gap-1 mb-4'>
                    <h4 className='font-bold'>{heading as string}</h4>
                    <ChevronRight color='red' />
                </div>
                <p className='text-black text-sm tracking-tighter'>{text}</p>
            </div>
        </div>
    )
}

export default ContentCard
