import { Task } from "./task.js";

export class PriorityTask extends Task {
  #dueDate;

  constructor(title, description = "", priority = "low", dueDate = null) {
    super(title, description, priority);
    if (dueDate !== null) {
      const date = new Date(dueDate);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid due date format");
      }
      this.#dueDate = date;
    } else {
      this.#dueDate = null;
    }
  }

  get dueDate() {
    return this.#dueDate;
  }

  get formattedDueDate() {
    if (!this.#dueDate) return "No due date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return this.#dueDate.toLocaleDateString(undefined, options);
  }

  toString() {
    const base = super.toString();
    return `${base} - Due: ${this.formattedDueDate}`;
  }
}
