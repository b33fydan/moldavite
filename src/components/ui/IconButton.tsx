interface Props {
  icon: string
  label: string
  selected: boolean
  onClick: () => void
}

export function IconButton({ icon, label, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`
        w-11 h-11 rounded-lg flex items-center justify-center text-lg
        transition-all duration-200 cursor-pointer border
        ${selected
          ? 'bg-[#6250d8] border-[#6250d8] text-white shadow-[0_0_12px_rgba(98,80,216,0.4)]'
          : 'bg-[#11131a] border-[#1e2028] text-[#777b86] hover:border-[#6250d8]/50 hover:text-[#f5f7fb]'
        }
      `}
    >
      {icon}
    </button>
  )
}
