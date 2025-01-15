import  { PlusIcon }  from "../icons/Icons"

export const Title: React.FC = () => {
    return (
        <div className="flex justify-center gap-1">
            <p className="text-3xl font-bold">
                NotEz
            </p>
            
            <PlusIcon className="size-7 p-1 bg-[#3178C6] rounded-lg" />
        </div>
    )
}
