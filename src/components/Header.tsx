import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-2">
        <SberLogo />
        <span className="text-lg font-semibold text-white">
          СберKids<sup className="text-xs">™</sup>
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Возможности
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1">
          Родителям <ChevronDown className="h-4 w-4" />
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Детям
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Безопасность
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Поддержка
        </a>
      </nav>

      <Button
        variant="outline"
        className="rounded-full border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300 bg-transparent"
      >
        Скачать приложение
      </Button>
    </header>
  )
}

function SberLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="13" fill="#21A038" />
      <path d="M14 6C9.58 6 6 9.58 6 14C6 18.42 9.58 22 14 22C18.42 22 22 18.42 22 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 6L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
