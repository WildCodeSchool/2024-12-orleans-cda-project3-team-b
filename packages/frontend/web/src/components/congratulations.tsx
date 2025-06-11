// import { GoBackToMenu } from "./go-back-to-menu";
// import type { PropsWithChildren } from 'react';

// type CongratulationsProps = PropsWithChildren<{
//   readonly children:string
// }>;

// export default function Congratulations ({children}:CongratulationsProps) {
// const [items, setItems] = useState<Single[]>([]);

// return(

//  <div className='mt-5 flex flex-col items-center'>
//       <h1 className='text-secondary text-2xl font-bold'>
//         {'CONGRATULATIONS!!! 🎊'}
//       </h1>

//       <h2 className='text-secondary mt-2 text-xl'>
//         {
//            `${single.artist_alias ?? `${single.artist_firstname} ${single.artist_lastname}`} just made a new ${children}!`
//           }
//       </h2>

//       <div className='mt-10 flex flex-col items-center'>
//         <h3 className='text-secondary text-2xl'>
//           { single.name}
//         </h3>
//         <p className='text-secondary text-sm font-light'>
//           {'by '}
//           {single
//             ? (single.artist_alias ??
//               `${single.artist_firstname} ${single.artist_lastname}`)
//             : 'Unknown Artist'}
//         </p>
//         <img
//           className='mt-4 h-22 w-22'
//           src='/assets/music-note.png'
//           alt='single cover'
//         />
//       </div>
//       <div className='mt-6 items-center'>
//         <div className='flex'>
//           <h2 className='text-secondary mr-2 font-bold'>
//             {'You just earned:'}
//           </h2>
//           <h3 className='text-secondary flex font-bold'>
//             {single.money_earned}
//             <img
//               className='mt-1.5 h-3.5 w-4'
//               src='/assets/dollar-icon.png'
//               alt='dollar icon'
//             />
//           </h3>
//         </div>
//       </div>
//       <div className='flex items-center'>
//         <GoBackToMenu />
//       </div>
//     </div>

// );

// }
