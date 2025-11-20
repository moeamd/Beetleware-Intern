// Async HTTP Client + Mini Vanilla TODO Example

// ===============================
// 1. Async/Await with Error Handling
// ===============================

async function runApiRequests() {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      fetch("/api/users"),
      fetch("/api/posts"),
    ]);
    const users = await usersResponse.json();
    const posts = await postsResponse.json();
    console.log("Parallel execution success.");
  } catch (error) {
    console.error("One request failed:", error.message);
  }
}

// ===============================
// 2. Fetch with Timeout & Cancellation
// ===============================

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      console.warn(`Fetch to ${url} aborted.`);
      throw new Error("Request timed out or cancelled.");
    }
    throw error;
  }
}

// ===============================
// 3. Retry with Exponential Backoff
// ===============================

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed: ${error.message}`);
      if (i === maxRetries - 1)
        throw new Error(`Failed to fetch ${url} after ${maxRetries} attempts.`);
      const delayTime = Math.pow(2, i) * 1000;
      console.log(`Retrying in ${delayTime / 1000} seconds...`);
      await delay(delayTime);
    }
  }
}

// ===============================
// 4. Mini Vanilla TODO App
// ===============================

const apiBase ="https://jsonplaceholder.typicode.com/todos" // demo API

async function loadTodos() {
  try {
    const todos = await fetchWithRetry(`${apiBase}?_limit=5`);
    renderTodos(todos);
  } catch (error) {
    console.error("Failed to load todos:", error.message);
  }
}

function renderTodos(todos) {
  const container = document.getElementById("todo-list");
  container.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.title + (todo.completed ? "/ Doooooon" : "");
    container.appendChild(li);
  });
}

// Add new TODO
async function addTodo(title) {
  try {
    const response = await fetchWithTimeout(apiBase, 5000);
    const newTodo = await response.json(); // just simulating
    console.log("New todo added:", title);
  } catch (error) {
    console.error("Failed to add todo:", error.message);
  }
}

// ===============================
// Initialize App
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
});
