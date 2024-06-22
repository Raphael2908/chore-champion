import { createClient } from '../../utils/supabase/server';
import AssignChoreButton from './AssignChoreButton';
export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.from("family_chore_list").select(`chore_name, chore_score, chore_status, profiles(full_name))`);
  const { data: children, childrenError } = await supabase.from("profiles").select(`full_name, id`);
  console.log(error)

  const checklist = data.map((e) => {
    return (
      <div key={e.id} className="flex items-center gap-2 justify-between">
        <div className='flex gap-5'>
            <input type="checkbox" id="task1" className=""/>
            <div className='flex flex-col'>
              <label htmlFor="task1">{e.chore_name}</label>
              <label className='text-gray-500'>{e.profiles.full_name}</label>
            </div>
        </div>
        <h1 className='text-green-500'>{e.chore_score}</h1>
      </div>
    )
  })

  return (
    <div className="flex flex-col bg-sky-200 h-screen px-5 py-5 gap-5 ">
     <div className='flex justify-between items-center'>

      <div className="">
        <img
        src="assets/Trophy.svg"
        alt="Picture of the author"
      />
      </div>
    
      <h1 className="text-4xl">Lim Family</h1>


      <div className="flex">
        {/* Red circle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="red" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
        
        {/* Blue circle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-violet-400" fill="purple" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
        
        {/* Green circle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="green" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
     </div>

        <div className="bg-white rounded-md shadow-sm px-5 py-2">
          <h2 className="text-lg font-bold">Checklist</h2>
          {checklist}
        </div>
        <AssignChoreButton children={children}/>
    </div>
  );
}