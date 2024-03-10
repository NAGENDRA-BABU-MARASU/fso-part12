import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Todo from "../Todos/Todo"

describe("Todo: not done", () => {
  const todo = {
    text: "New todo",
    done: false,
  }

  var container
  var mockDeleteTodo
  var mockCompleteTodo

  beforeEach(() => {
    mockDeleteTodo = jest.fn()
    mockCompleteTodo = jest.fn()
    container = render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    ).container
  })

  test("Everything is rendered", async () => {
    expect(screen.getByText("New todo")).toBeDefined()
    expect(screen.getByText("This todo is not done")).toBeDefined()
    expect(screen.getByText("Delete")).toBeDefined()
    expect(screen.getByText("Set as done")).toBeDefined()
  })
  test("Clicking 'delete' triggers delete", async () => {
    const button = screen.getByText("Delete")
    userEvent.click(button)
    expect(mockDeleteTodo.mock.calls).toHaveLength(1)
  })
  test("Clicking 'set as done' triggers completeTodo", async () => {
    const button = screen.getByText("Set as done")
    userEvent.click(button)
    expect(mockCompleteTodo.mock.calls).toHaveLength(1)
  })
})

describe("Todo: done", () => {
  const todo = {
    text: "Another todo",
    done: true,
  }

  var container
  var mockDeleteTodo
  var mockCompleteTodo

  beforeEach(() => {
    mockDeleteTodo = jest.fn()
    container = render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    ).container
  })

  test("Everything is rendered", async () => {
    expect(screen.getByText("Another todo")).toBeDefined()
    expect(screen.getByText("This todo is done")).toBeDefined()
    expect(screen.getByText("Delete")).toBeDefined()
  })
  test("Clicking 'delete' triggers delete", async () => {
    const button = screen.getByText("Delete")
    userEvent.click(button)
    expect(mockDeleteTodo.mock.calls).toHaveLength(1)
  })
})