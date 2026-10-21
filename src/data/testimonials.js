const STORAGE_KEY = 'portfolio_testimonials'

const defaultTestimonials = []

export function getTestimonials() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultTestimonials
  } catch {
    return defaultTestimonials
  }
}

export function saveTestimonials(testimonials) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials))
}

export function getTestimonialById(id) {
  return getTestimonials().find((item) => String(item.id) === String(id)) || null
}
