import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return res.status(401).json({ error: error.message })

  res.status(200).json({ message: 'Connexion réussie !' })
}
