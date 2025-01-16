import  { PlusIcon }  from "../icons/Icons"

export const Title: React.FC = () => {
    return (
        <header className="flex gap-1 mb-16">
            <p className="text-3xl font-bold">
                NotEz
            </p>
            
            <PlusIcon className="size-7 p-1 bg-[#3178C6] rounded-lg" />
        </header>
    )
}
