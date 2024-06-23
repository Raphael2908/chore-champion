import { createClient } from '../../../utils/supabase/server';
import ChoreFilter from './ChoreFilter';

export default async function Chores() {
  const supabase = createClient();
  const { data, error } = await supabase.from("family_chore_list").select(`chore_name, chore_status, profiles(full_name))`);
  const { data: kids, error: kidError } = await supabase.from("profiles").select(`full_name`).eq('family_role', 'child');

    return (
      <div className="bg-sky-200 h-screen px-5">
        <h1 className='py-2'>Chore management</h1>
        <ChoreFilter kids={kids} chores={data}/>
      </div>
    );
  }
  