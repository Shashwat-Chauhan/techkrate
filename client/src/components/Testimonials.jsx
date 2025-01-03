import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

const testimonials = [
  {
    quote: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate harum repellendus ipsum dignissimos? Officiis ipsam dolorum magnam assumenda.",
    author: "Johnathan Rodriguez",
    role: "UX Research, Atlassian"
  },
  {
    quote: "Expedita sequi cupiditate harum repellendus ipsum dignissimos. Officiis ipsam dolorum magnam assumenda, consectetur adipisicing elit.",
    author: "Sarah Chen",
    role: "Product Designer, Figma"
  },
  {
    quote: "Consectetur adipisicing elit, expedita sequi cupiditate harum repellendus ipsum dignissimos. Officiis ipsam dolorum magnam assumenda.",
    author: "Michael Park",
    role: "Engineering Lead, Vercel"
  },
  {
    quote: "Innovative solutions that truly revolutionized our workflow. The impact on our productivity has been immeasurable.",
    author: "Emily Watson",
    role: "CTO, TechNova"
  },
  {
    quote: "Exceptional customer service coupled with cutting-edge technology. It's rare to find a company that excels in both.",
    author: "David Lee",
    role: "Operations Manager, GlobalCorp"
  },
  {
    quote: "The intuitive interface made adoption across our team seamless. It's been a game-changer for our project management.",
    author: "Sophia Rodriguez",
    role: "Team Lead, InnovateTech"
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const progressRefs = useRef([])

  useEffect(() => {
    const animateProgress = (index) => {
      const progressBar = progressRefs.current[index]
      if (progressBar) {
        progressBar.style.transition = 'width 5s linear'
        progressBar.style.width = '100%'
      }
    }

    const resetProgress = () => {
      progressRefs.current.forEach((bar) => {
        if (bar) {
          bar.style.transition = 'none'
          bar.style.width = '0%'
        }
      })
    }

    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((current) => (current + 1) % testimonials.length)
        setIsAnimating(false)
        resetProgress()
        animateProgress((currentIndex + 1) % testimonials.length)
      }, 500)
    }, 5000)

    resetProgress()
    animateProgress(currentIndex)

    return () => clearInterval(timer)
  }, [currentIndex])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What our customers think
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus commodi sint, similique cupiditate possimus suscipit delectus illum eos iure magnam!
          </p>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <div key={index} className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  ref={(el) => (progressRefs.current[index] = el)}
                  className="h-full bg-black rounded-full"
                  style={{ width: index === currentIndex ? '0%' : '0%' }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[300px] bg-black text-white overflow-hidden">
          <div
            className={`absolute inset-0 p-8 transition-transform duration-500 ease-out ${
              isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}
          >
            <div className="h-full flex flex-col justify-between">
              <p className="text-xl italic leading-relaxed">
                &quot;{testimonials[currentIndex].quote}&quot;
              </p>
              <div>
                <p className="font-semibold text-lg">
                  {testimonials[currentIndex].author}
                </p>
                <p className="text-gray-400">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  )
}