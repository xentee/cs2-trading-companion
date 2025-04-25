import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password, username } = req.body

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signUpError) return res.status(400).json({ error: signUpError.message })

  const userId = authData.user?.id
  if (!userId) return res.status(500).json({ error: 'User ID not returned' })

  const { error: insertError } = await supabase.from('users').insert([
    { id: userId, username }
  ])

  if (insertError) return res.status(500).json({ error: insertError.message })

  res.status(200).json({ message: 'Inscription réussie !' })
}
