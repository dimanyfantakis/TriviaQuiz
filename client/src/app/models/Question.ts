import { Category } from "./Category";

export interface Question {
    category: Category,
    correct_answer: string,
    incorrect_answers: string[],
    question: string
}