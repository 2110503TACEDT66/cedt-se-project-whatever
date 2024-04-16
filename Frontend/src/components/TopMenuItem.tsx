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
                px-2 text-sm ml-3"
                data-testid={title}>
              <Image 
                className="h-6 w-6"
                src={imgSrc} 
                alt={title} 
                width={0}
                height={0}/>
              <div className='m-2 font-serif font-medium text-cyan-600 text-lg'>{title}</div>
          </div>
    </Link>
  );
}
