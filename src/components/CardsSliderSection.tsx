import { useState } from "react"
import { ChevronLeft, ChevronRight, Wifi, Snowflake } from "lucide-react"

const cards = [
  {
    id: 1,
    owner: "Миша Петров",
    age: "8 лет",
    number: "4521 •••• •••• 3847",
    balance: "350 ₽",
    limit: "500 ₽ / день",
    color: "from-green-700 to-green-500",
    frozen: false,
    avatar: "МП",
    avatarColor: "bg-blue-500",
  },
  {
    id: 2,
    owner: "Соня Петрова",
    age: "11 лет",
    number: "4521 •••• •••• 9214",
    balance: "1 240 ₽",
    limit: "700 ₽ / день",
    color: "from-pink-700 to-pink-500",
    frozen: false,
    avatar: "СП",
    avatarColor: "bg-pink-500",
  },
  {
    id: 3,
    owner: "Артём Иванов",
    age: "9 лет",
    number: "4521 •••• •••• 6603",
    balance: "75 ₽",
    limit: "300 ₽ / день",
    color: "from-blue-700 to-blue-500",
    frozen: true,
    avatar: "АИ",
    avatarColor: "bg-indigo-500",
  },
  {
    id: 4,
    owner: "Лера Смирнова",
    age: "13 лет",
    number: "4521 •••• •••• 1189",
    balance: "3 600 ₽",
    limit: "1 000 ₽ / день",
    color: "from-teal-700 to-teal-500",
    frozen: false,
    avatar: "ЛС",
    avatarColor: "bg-teal-500",
  },
]

export function CardsSliderSection() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => (i === 0 ? cards.length - 1 : i - 1))
  const next = () => setActive((i) => (i === cards.length - 1 ? 0 : i + 1))

  const card = cards[active]

  return (
    <section className="px-4 md:px-8 py-12 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Карты ваших детей</h2>
        <p className="text-gray-400 text-sm">Все карты в одном месте — управляйте балансом и лимитами</p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="relative flex items-center gap-6 w-full justify-center">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] border border-[#262626] text-gray-400 hover:text-white hover:bg-[#222] transition-colors shrink-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="relative w-full max-w-sm">
            {cards.map((c, i) => {
              const offset = i - active
              const isActive = offset === 0
              const isAdjacent = Math.abs(offset) === 1
              return (
                <div
                  key={c.id}
                  onClick={() => setActive(i)}
                  className="absolute inset-0 transition-all duration-500 cursor-pointer"
                  style={{
                    transform: `translateX(${offset * 60}px) scale(${isActive ? 1 : 0.88}) translateZ(0)`,
                    opacity: isActive ? 1 : isAdjacent ? 0.45 : 0,
                    zIndex: isActive ? 10 : isAdjacent ? 5 : 0,
                    pointerEvents: isActive ? "auto" : isAdjacent ? "auto" : "none",
                  }}
                >
                  <div className={`rounded-3xl bg-gradient-to-br ${c.color} p-6 h-48 flex flex-col justify-between shadow-2xl`}>
                    {c.frozen && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/30 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
                        <Snowflake className="h-3 w-3" /> Заморожена
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white/70 text-xs mb-0.5">СберKids</p>
                        <p className="text-white font-semibold text-base">{c.owner}</p>
                        <p className="text-white/60 text-xs">{c.age}</p>
                      </div>
                      <Wifi className="h-5 w-5 text-white/60 rotate-90" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-1 font-mono">{c.number}</p>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-white/60 text-xs">Баланс</p>
                          <p className="text-white font-bold text-xl">{c.balance}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/60 text-xs">Лимит</p>
                          <p className="text-white text-sm font-medium">{c.limit}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="h-48 w-full" />
          </div>

          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] border border-[#262626] text-gray-400 hover:text-white hover:bg-[#222] transition-colors shrink-0"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-2 mt-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-green-500" : "w-1.5 bg-gray-600"}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl">
          {cards.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2.5 border transition-all ${
                i === active
                  ? "bg-[#1a1a1a] border-green-500/50 text-white"
                  : "bg-[#141414] border-[#262626] text-gray-500 hover:text-gray-300"
              }`}
            >
              <div className={`h-7 w-7 rounded-full ${c.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {c.avatar}
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-medium truncate">{c.owner.split(" ")[0]}</p>
                <p className="text-xs text-gray-600">{c.age}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
