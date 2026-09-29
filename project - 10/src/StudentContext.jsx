import { createContext, useContext } from 'react'

export const StudentContext = createContext(null)

export function useStudents() {
  return useContext(StudentContext)
}