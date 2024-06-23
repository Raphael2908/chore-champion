import Link from 'next/link';
import { createClient } from '../../../utils/supabase/server';

export default async function Leaderboard() {
    const supabase = createClient();
    const { data, error } = await supabase.from("family_chore_list").select(`chore_score, profiles(full_name))`);
    if(error){
      console.log(error)
    }
    let leaderboard = {}

    data.forEach(element => {
      if(leaderboard[element.profiles.full_name] == undefined) {
        leaderboard[element.profiles.full_name] = element.chore_score
      }
      leaderboard[element.profiles.full_name] = leaderboard[element.profiles.full_name] + element.chore_score 
    })
    // Sorting 
    const sortedLeaderboard = Object.fromEntries(
      Object.entries(leaderboard).sort(([,a],[,b]) => b - a) // compare diff between elements, sort highest to lowest from left to right
    );

    const Placement = () => {
      return (
        <>
          {Object.entries(sortedLeaderboard).map(([placement, score], index) => (
            <div className='bg-white w-full flex items-center justify-between px-5 rounded-md'>
              <div className='flex items-center gap-2 py-5'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="red" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <h1 key={index} className='text-lg text-slate-900'>{placement}</h1>
              </div>
              <h1 key={index} className='text-lg text-emerald-500'>{score}</h1>
            </div>
          ))}
        </>
      );
    };
  
    return (
      <div className="bg-sky-200 h-screen px-5 py-5 flex flex-col gap-5">
        <div className='flex items-center'>
          <Link href="/" className="">
            <img
            width={50}
            src="../assets/Expand_left_light.svg"
            alt="back to home"
            />
          </Link>
          <h1 className='text-xl'>Leaderboard</h1>
        </div>
        <Placement/>
      </div>
    );
  }
  