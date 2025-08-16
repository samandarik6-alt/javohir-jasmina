"use client"

import type React from "react"

import Image from "next/image"
import { Heart, Calendar, Clock, MapPin, Instagram, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function WeddingInvitation() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const carouselImages = [
    "https://crm.uzjoylar.uz/img/3244edf3-00cc-473b-ab76-976ffcfa346f.jpg",
    "https://crm.uzjoylar.uz/img/c2965da3-c8e7-4fe9-902f-7f4aee270df0.jpg",
    "https://crm.uzjoylar.uz/img/28e50c2e-d3f9-437b-ad14-5881cccdbd69.jpg",
  ]

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [formData, setFormData] = useState({
    name: "",
    canAttend: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(carouselTimer)
  }, [carouselImages.length])

  useEffect(() => {
    const weddingDate = new Date("2025-08-24T19:00:00")

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handlePlayAudio = () => {
    const audio = audioRef.current
    if (audio && !isAudioPlaying) {
      audio.volume = 0
      audio
        .play()
        .then(() => {
          setIsAudioPlaying(true)

          const fadeInInterval = setInterval(() => {
            if (audio.volume < 0.3) {
              audio.volume = Math.min(audio.volume + 0.02, 0.3)
            } else {
              clearInterval(fadeInInterval)
            }
          }, 100)
        })
        .catch(console.error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.canAttend) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          canAttend: formData.canAttend,
        }),
      })

      if (response.ok) {
        alert("Спасибо! Ваш ответ отправлен.")
        setFormData({ name: "", canAttend: "" })
      } else {
        throw new Error("Failed to send")
      }
    } catch (error) {
      console.error("Error sending form:", error)
      alert("Произошла ошибка. Попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1f1f] via-[#2a2a2a] to-[#0f0f0f] text-white">
      <audio ref={audioRef} loop preload="auto" className="hidden">
        <source src="/audio.mp3" type="audio/mpeg" />
        Ваш браузер не поддерживает аудио элемент.
      </audio>

      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {carouselImages.map((image, index) => (
            <Image
              key={index}
              src={image || "/placeholder.svg"}
              alt="Жавохир и Жасмина"
              fill
              className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-40xl px-8 py-6 mx-6 border border-white/20 shadow-2xl mb-6">
              <div className="text-center space-y-4">
                <div className="space-y-3">
                  <h1 className="text-5xl font-serif font-bold text-white drop-shadow-2xl tracking-wide">Жавохир</h1>
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-px bg-white/70"></div>
                    <Heart className="mx-4 w-7 h-7 text-white fill-white/30 drop-shadow-lg" />
                    <div className="w-12 h-px bg-white/70"></div>
                  </div>
                  <h1 className="text-5xl font-serif font-bold text-white drop-shadow-2xl tracking-wide">Жасмина</h1>
                </div>
                <p className="text-xl text-white/95 font-light tracking-wide drop-shadow-lg">
                  Приглашают вас на свою свадьбу
                </p>
              </div>
            </div>

            {!isAudioPlaying && (
              <button
                onClick={handlePlayAudio}
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-200 shadow-lg"
              >
                🎵 Включить музыку
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative -mt-16 flex justify-end pr-6 z-10">
        <div className="animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30 shadow-lg">
            <ChevronDown className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="px-6 py-16 bg-gradient-to-b from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f]">
        <div className="max-w-md mx-auto space-y-10">
          <div className="flex items-center justify-center">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="mx-6 w-3 h-3 bg-white/80 rounded-full shadow-sm"></div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>

          <div className="text-center space-y-8">
            <div className="bg-[#1f1f1f]/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#3a3a3a]/50">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <Calendar className="w-7 h-7 text-white" />
                  <span className="text-4xl font-serif font-semibold text-white">24 августа</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <Clock className="w-6 h-6 text-gray-300" />
                  <span className="text-2xl text-gray-200 font-medium">19:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] text-white rounded-3xl p-8 text-center shadow-xl border border-[#404040]/50">
            <h3 className="text-2xl font-serif font-semibold mb-6">До свадьбы осталось:</h3>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-sm text-gray-300 mt-1">дней</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm text-gray-300 mt-1">часов</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-300 mt-1">минут</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-300 mt-1">секунд</div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-6 bg-[#1f1f1f]/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#3a3a3a]/50">
            <h2 className="text-4xl font-serif font-semibold text-white">Дорогие друзья!</h2>
            <p className="text-gray-200 leading-relaxed text-xl font-light">
              Мы будем счастливы разделить с вами один из самых важных дней в нашей жизни. Ваше присутствие сделает наш
              праздник еще более особенным.
            </p>
          </div>

          <div className="bg-[#1f1f1f]/80 backdrop-blur-sm border-2 border-[#3a3a3a]/50 rounded-3xl p-8 space-y-6 shadow-xl">
            <div className="flex items-center space-x-6">
              <Image
                src="https://crm.uzjoylar.uz/img/6bd653dd-8d76-4d03-9766-86e89f3be167.jpg"
                alt="Логотип Majestic ресторана"
                width={70}
                height={70}
                className="rounded-full object-cover shadow-md"
              />
              <div className="flex-1">
                <h3 className="font-serif font-semibold text-2xl text-white">Majestic restoran</h3>
                <p className="text-gray-300 text-lg">Место проведения</p>
              </div>
              <div className="flex space-x-3">
                <a
                  href="https://yandex.com/maps/10334/samarkand/?ll=66.981000%2C39.678658&mode=poi&poi%5Bpoint%5D=66.978144%2C39.680623&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D35251065058&z=17.03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-r from-[#2a2a2a] to-[#1f1f1f] text-white rounded-2xl hover:from-[#404040] hover:to-[#2a2a2a] transition-all duration-200 shadow-md"
                >
                  <MapPin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/majestic_restaurant.uz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-r from-[#2a2a2a] to-[#1f1f1f] text-white rounded-2xl hover:from-[#404040] hover:to-[#2a2a2a] transition-all duration-200 shadow-md"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>

            <Image
              src="https://crm.uzjoylar.uz/img/a1b77f35-3f6f-418d-a027-ef898eebab78.jpg"
              alt="Majestic ресторан"
              width={400}
              height={300}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="bg-gradient-to-br from-[#1f1f1f]/90 to-[#2a2a2a]/90 backdrop-blur-sm rounded-3xl p-8 space-y-8 shadow-xl border border-[#3a3a3a]/50">
            <div className="text-center">
              <h3 className="text-3xl font-serif font-semibold text-white">Подтверждение</h3>
              <p className="text-gray-300 text-base mt-3 font-light">
                Пожалуйста, подтвердите свое присутствие до 20 августа 2025 года.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-5 border-2 border-[#404040] bg-[#2a2a2a]/50 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-lg transition-all duration-200 text-white placeholder-[#888888]"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-200">Присутствие:</label>
                <div className="space-y-3">
                                      <label className="flex items-center p-4 border-2 border-[#404040] bg-[#2a2a2a]/30 backdrop-blur-sm rounded-2xl hover:bg-[#404040]/40 hover:border-[#505050] cursor-pointer transition-all duration-200">
                    <input
                      type="radio"
                      name="attendance"
                      value="Я смогу прийти"
                      checked={formData.canAttend === "Я смогу прийти"}
                      onChange={(e) => setFormData({ ...formData, canAttend: e.target.value })}
                      className="mr-4 w-5 h-5"
                    />
                    <span className="text-lg text-white">Я смогу прийти</span>
                  </label>
                  <label className="flex items-center p-4 border-2 border-[#404040] bg-[#2a2a2a]/30 backdrop-blur-sm rounded-2xl hover:bg-[#404040]/40 hover:border-[#505050] cursor-pointer transition-all duration-200">
                    <input
                      type="radio"
                      name="attendance"
                      value="Я не смогу прийти"
                      checked={formData.canAttend === "Я не смогу прийти"}
                      onChange={(e) => setFormData({ ...formData, canAttend: e.target.value })}
                      className="mr-4 w-5 h-5"
                    />
                    <span className="text-lg text-white">Я не смогу прийти</span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.canAttend}
                className="w-full bg-gradient-to-r from-[#2a2a2a] to-[#1f1f1f] text-white py-5 rounded-2xl text-xl font-semibold hover:from-[#404040] hover:to-[#2a2a2a] transition-all duration-200 disabled:bg-[#3a3a3a] disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? "Отправка..." : "Отправить"}
              </button>
            </div>
          </div>

          <div className="text-center pt-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-4 h-4 bg-white/20 rounded-full"></div>
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
              <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-lg font-serif italic">С любовью, Жавохир и Жасмина</p>
          </div>

         <div className="text-center pt-8 pb-6 border-t border-[#3a3a3a] mt-12">
  <p className="text-gray-500 text-sm mb-2">Связаться с разработчиком</p>

  {/* Telegram link */}
  <a
    href="https://t.me/uz_ai_dev"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm mb-2"
  >
    <span>Tg: @uz_ai_dev</span>
  </a>

  {/* Telefon link */}
  <a
    href="tel:+998979231770"
    className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
  >
    Tel: +998 97 923 17 70
  </a>
</div>

        </div>
      </div>
    </div>
  )
}