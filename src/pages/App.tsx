import { useEffect, useState } from "react"
import { Todos } from "../components/Todos"
import { FilterValue, TodoTitle, Todo as TodoType, type TodoId } from "../types/types"
import { TODO_FILTERS } from "../consts/consts"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

export const App = (): JSX.Element => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleUpdateLocalStorage = (newTodos: TodoType[]): void => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const handleRemoveTodo = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
    handleUpdateLocalStorage(newTodos)
  }

  const handleCompleted = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>
  ): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
    handleUpdateLocalStorage(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
    handleUpdateLocalStorage(newTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
    handleUpdateLocalStorage(newTodos)
  }

  const handleUpdateTitle = ({ id, title }: Pick<TodoType, 'id' | 'title'>
  ): void => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, title: title } : todo
      )
    )
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed

    return todo
  })

  useEffect(() => {
    const todosSaved = localStorage.getItem('todos')

    if (todosSaved) {
      setTodos(JSON.parse(todosSaved))
      return
    }

    localStorage.setItem('todos', JSON.stringify([]))
  }, [])

  return (
    <main
      className='top-0 z-[-2] w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen flex justify-center sm:items-center'>
      <section className="md:w-1/2 w-full text-gray-200 mx-4 my-16 sm:my-10">

        <Header onAddTodo={handleAddTodo} />

        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          filterSelected={filterSelected}
          onClearCompleted={handleRemoveAllCompleted}
          handleFilterChange={handleFilterChange}
        />

        <Todos
          todos={filteredTodos}
          setCompleted={handleCompleted}
          setTitle={handleUpdateTitle}
          removeTodo={handleRemoveTodo}
        />
      </section>
    </main>
  )
}