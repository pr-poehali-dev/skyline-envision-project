import { ArrowUpRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-12 pb-8 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] py-2 text-sm px-2">
        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">НОВИНКА</span>
        <span className="text-gray-300">Теперь доступно для детей от 6 лет</span>
        <ArrowUpRight className="h-4 w-4 text-gray-400" />
      </div>

      <h1 className="mb-4 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
        Первый банк для детей и их родителей
      </h1>

      <p className="mb-8 max-w-xl text-gray-400">Учите детей финансовой грамотности, контролируйте расходы и устанавливайте лимиты — всё в одном приложении.</p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button className="rounded-full bg-green-600 px-6 hover:bg-green-700 text-white">
          Открыть счёт ребёнку <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" className="rounded-full border-gray-700 bg-transparent text-white hover:bg-gray-800">
          <Play className="mr-2 h-4 w-4 fill-green-500 text-green-500" /> Смотреть обзор
        </Button>
      </div>
    </section>
  )
}
