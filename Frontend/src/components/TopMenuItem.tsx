import Link from 'next/link';
import Image from 'next/image';

export default function TopMenuItem({
  title,
  imgSrc,
  pageRef,
}: {
  title : string ;
  imgSrc: string;
  pageRef: string;
}) {
  return (
    <Link
      href={pageRef}>
         <div
              className="flex items-center h-full
                px-2 text-cyan-600 text-sm ml-3"
                data-testid={title}>
              <Image 
                className="h-[23px] w-[23px] "
                src={imgSrc} 
                alt={title} 
                width={0}
                height={0}/>
              <div className='m-2 font-serif font-medium text-white'>{title}</div>
          </div>
    </Link>
  );
}
