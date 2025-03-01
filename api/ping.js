const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
export default async function handler(req, res) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: SUPABASE_KEY
      }
    })

    if (response.ok) {
      res.status(200).json({ message: 'Supabase is active' })
    } else {
      res.status(500).json({ error: 'Failed to ping Supabase' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
