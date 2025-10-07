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

  // Handle simple addition queries like:
  // "What is 34 plus 22?" or "34 + 22" or "what is -3.5 plus 2.1?"
  if (
    /\b(plus|\+|add|sum of)\b/i.test(query)
  ) {
    // Try to capture two operands around "plus" or the plus sign
    const twoOpRegex = /(-?\d+(\.\d+)?)\s*(?:\+|plus|add|sum of)\s*(-?\d+(\.\d+)?)/i;
    const twoMatch = query.match(twoOpRegex);
    if (twoMatch) {
      const a = Number(twoMatch[1]);
      const b = Number(twoMatch[3]);
      if (!Number.isNaN(a) && !Number.isNaN(b)) {
        const sum = a + b;
        return Number.isInteger(sum) ? String(Math.trunc(sum)) : String(sum);
      }
    }

    // Fallback: extract all numbers and sum them (useful for "sum of 1, 2, and 3")
    const allMatches = query.match(/-?\d+(\.\d+)?/g);
    if (allMatches && allMatches.length > 0) {
      const nums = allMatches.map((s) => Number(s)).filter((n) => !Number.isNaN(n));
      if (nums.length > 0) {
        const total = nums.reduce((acc, n) => acc + n, 0);
        return Number.isInteger(total) ? String(Math.trunc(total)) : String(total);
      }
    }

    return "";
  }

  return "";
}
