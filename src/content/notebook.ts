/**
 * Notebook: small interactive explainers of things I learn from first
 * principles. Phase 2. Entries marked "COMING SOON" have no page yet.
 */

export type NotebookEntry = {
  slug: string;
  title: string;
  question: string;
  status: "COMING SOON" | "PUBLISHED";
};

export const notebook: NotebookEntry[] = [
  {
    slug: "gradient-descent",
    title: "Gradient descent, one step at a time",
    question: "How does a model find the bottom of a loss surface it cannot see?",
    status: "COMING SOON",
  },
  {
    slug: "train-vs-test-error",
    title: "Train error versus test error",
    question: "Why does a model that fits the training data perfectly do worse on new data?",
    status: "COMING SOON",
  },
  {
    slug: "running-python",
    title: "What happens when you run a Python program",
    question: "From source text to bytecode to the interpreter loop.",
    status: "COMING SOON",
  },
];
