export class Task {
  #title;
  #description;
  #status;
  #priority;

  constructor(title, description = "", priority = "low") {
    if (!title || typeof title !== "string" || title.trim() === "") {
      throw new Error("Title is required and must be a non-empty string");
    }
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      throw new Error(`Priority must be one of: ${validPriorities.join(", ")}`);
    }
    this.#title = title.trim();
    this.#description = description.trim();
    this.#status = "pending";
    this.#priority = priority;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get status() {
    return this.#status;
  }

  get priority() {
    return this.#priority;
  }

  complete() {
    if (this.#status === "completed") {
      throw new Error("Task is already completed");
    }
    this.#status = "completed";
  }

  undo() {
    if (this.#status === "pending") {
      throw new Error("Task is already pending");
    }
    this.#status = "pending";
  }

  toString() {
    const statusIcon = this.#status === "completed" ? "✔" : "○";
    return `[${statusIcon}] ${this.#title} (${this.#priority})`;
  }
}
