const mockupGroups = [
    {
      id: crypto.randomUUID(),
      title: "Portafolio",
      todos: [
        {
          id: 1,
          title: "Crear componente de portafolio",
          completed: false,
        },
        {
          id: 2,
          title: "Crear componente de contacto",
          completed: false,
        },
        {
          id: 3,
          title: "Crear componente de proyectos",
          completed: false,
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: "Proyectos",
      todos: [
        {
          id: 4,
          title: "Crear componente de proyectos",
          completed: false,
        },
        {
          id: 5,
          title: "Crear componente de proyectos",
          completed: false,
        },
        {
          id: 6,
          title: "Crear componente de proyectos",
          completed: false,
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: "Contacto",
      todos: [
        {
          id: 7,
          title: "Crear componente de contacto",
          completed: false,
        },
        {
          id: 8,
          title: "Crear componente de contacto",
          completed: false,
        },
        {
          id: 9,
          title: "Crear componente de contacto",
          completed: false,
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: "Blog",
      todos: [
        {
          id: 10,
          title: "Crear componente de blog",
          completed: false,
        },
        {
          id: 11,
          title: "Crear componente de blog",
          completed: false,
        },
        {
          id: 12,
          title: "Crear componente de blog",
          completed: false,
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: "Misceláneos",
      todos: [
        {
          id: 13,
          title: "Crear componente de misceláneos",
          completed: false,
        },
        {
          id: 14,
          title: "Crear componente de misceláneos",
          completed: false,
        },
        {
          id: 15,
          title: "Crear componente de misceláneos",
          completed: false,
        },
      ],
    },
  ];

export const Groups: React.FC = () => {
    return (
        <div className="flex mt-2 gap-2 overflow-auto will-change-scroll snap-x [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-500/40">
        {mockupGroups.map(({ id, title }) => (
          <div
            key={id}
            className="snap-center rounded-lg max-w-[200px] bg-neutral-800/40 p-2 cursor-pointer hover:bg-neutral-800/80 duration-500 border-neutral-800/60 border"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-sm truncate">{title}</p>

              <span className="flex gap-1 justify-center items-center truncate text-yellow-600 text-[10px] font-medium px-1 rounded-full">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2 bg-yellow-600"></span>
                </span>
                Pendientes
              </span>
            </div>
          </div>
        ))}
      </div>
    )
}