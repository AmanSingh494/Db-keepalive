export default async function handler(req, res) {
  const urls = [
    process.env.SUPABASE_URL_ORCHARD_EYES,
    process.env.SUPABASE_URL_SEED_SOCIETY,
    process.env.SUPABASE_URL_AUTODOC
  ]
  const keys = [
    process.env.SUPABASE_KEY_ORCHARD_EYES,
    process.env.SUPABASE_KEY_SEED_SOCIETY,
    process.env.SUPABASE_KEY_AUTODOC
  ]
  try {
    const results = await Promise.all(
      urls.map(async (url, index) => {
        const response = await fetch(`${url}/rest/v1/`, {
          method: 'GET',
          headers: {
            apikey: keys[index]
          }
        })

        return response.ok
          ? `Project ${index + 1} alive`
          : `Project ${index + 1} failed`
      })
    )

    res.status(200).json({ message: 'Pings sent', results })
  } catch (error) {
    res.status(500).json({ error: 'Ping failed', details: error.message })
  }
}
