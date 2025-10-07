export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "thejongu";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "jgu2";
  }

  if (query.toLowerCase().includes("largest")) {
    // Find all numbers in the query (supports negative and decimal numbers).
    // Examples matched: 79, -3, 4.5
    const matches = query.match(/-?\d+(\.\d+)?/g);
    if (!matches || matches.length === 0) return "";

    const nums = matches
      .map((s) => Number(s))
      .filter((n) => !Number.isNaN(n));

    if (nums.length === 0) return "";

    const max = nums.reduce((a, b) => (a > b ? a : b), nums[0]);

    // Return as plain string (no extra punctuation).
    // If the max is an integer value like 79.0, return "79" instead of "79.0"
    if (Number.isInteger(max)) {
      return String(Math.trunc(max));
    }
    return String(max);
  }
  return ""
}
