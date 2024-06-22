import { createClient } from '../../utils/supabase/server';

export default async function Home() {
  const supabase = createClient();
  const { data: users, error } = await supabase.from("profiles").select('*');
  console.log(users)
  return (
    <div>
      <h1>{JSON.stringify(users, null, 2)}</h1>
    </div>
  );
}
