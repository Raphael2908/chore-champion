import { SupabaseClient } from "@supabase/supabase-js";

export default async function handler( req, res ) {
  const supabase = new SupabaseClient(    
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (req.method === 'POST') {
    // Process a POST request
    const { error } = await supabase
    .from('family_chore_list')
    .insert({ chore_name: req.body.choreName, chore_score: req.body.choreScore, chore_status: false, chore_user_ID: req.body.choreUserId})
    if(error) { 
      console.log(error)
      return res.status(500).json({message: "Error when posting chore"})
    }
    return res.status(200).json({ message: 'Sent!' })
  } else {
    // Handle any other HTTP method
    return res.status(200).json({ message: 'Hello from Next.js!' })
  }
}