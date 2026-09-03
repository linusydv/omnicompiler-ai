export const PRESET_CODES = [
  {
    id: "py-two-sum-bug",
    name: "Python: Two Sum Index Error",
    language: "python",
    difficulty: "Beginner",
    description: "Finding two numbers in an array that add up to a target sum, but fails with IndexError due to out-of-bounds loop range.",
    buggyCode: `def two_sum(nums, target):
    # Bug: Loop range goes out of bounds when looking at i+1
    for i in range(len(nums)):
        for j in range(i + 1, len(nums) + 1):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# Test Case
result = two_sum([2, 7, 11, 15], 9)
print("Result:", result)`,
    lineError: {
      lineNumber: 4,
      errorType: "IndexError",
      message: "list index out of range",
      explanation: "Line 4 attempts to access `nums[j]` where `j` reaches `len(nums)` because `range(i + 1, len(nums) + 1)` includes `len(nums)`, which is out of bounds for zero-indexed Python lists."
    },
    fixedCode: `def two_sum(nums, target):
    # Fix: Correct loop range to len(nums)
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# Test Case
result = two_sum([2, 7, 11, 15], 9)
print("Result:", result)`,
    fixExplanation: "Changed `len(nums) + 1` to `len(nums)` on line 4 so `j` stops at `len(nums) - 1`, preventing invalid list index access.",
    topics: [
      {
        name: "Arrays & Lists",
        category: "Data Structures",
        explanation: "Contiguous memory blocks accessed by 0-based indices. Bounds checking is crucial to prevent IndexError exceptions."
      },
      {
        name: "Nested Loops",
        category: "Control Flow",
        explanation: "Iterating through pairs of elements using an inner loop initialized to `i + 1` to prevent checking an element against itself."
      },
      {
        name: "Index Bounds Safety",
        category: "Bug Prevention",
        explanation: "In 0-indexed languages, valid indices range from 0 to length - 1. Requesting index equal to length raises out of bounds errors."
      }
    ],
    alternateSolution: {
      title: "Hash Map / Dictionary Approach (Optimal)",
      description: "Store each element's value and index in a dictionary while iterating once. Allows constant O(1) time lookups.",
      code: `def two_sum_hashmap(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test Case
print("Optimized Result:", two_sum_hashmap([2, 7, 11, 15], 9))`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      pros: ["Reduces time complexity from quadratic O(N²) to linear O(N).", "Single pass algorithm.", "Ideal for large arrays."],
      cons: ["Uses extra O(N) memory for the hash dictionary.", "Hash collisions in rare edge cases (handled internally)."]
    },
    complexity: {
      buggyTime: "O(N²)",
      buggySpace: "O(1)",
      fixedTime: "O(N²)",
      fixedSpace: "O(1)"
    },
    testCases: [
      { input: "nums = [2, 7, 11, 15], target = 9", expectedOutput: "[0, 1]" },
      { input: "nums = [3, 2, 4], target = 6", expectedOutput: "[1, 2]" }
    ],
    executionSteps: [
      { line: 1, text: "Defined function `two_sum(nums, target)`", variables: { nums: "[2, 7, 11, 15]", target: "9" } },
      { line: 3, text: "Outer loop starts: i = 0 (nums[0] = 2)", variables: { i: 0, "nums[i]": 2 } },
      { line: 4, text: "Inner loop starts: j = 1 (nums[1] = 7)", variables: { j: 1, "nums[j]": 7 } },
      { line: 5, text: "Check condition: 2 + 7 == 9 -> True!", variables: { "2 + 7": 9, match: true } },
      { line: 6, text: "Return target indices [0, 1]", variables: { result: "[0, 1]" } }
    ]
  },
  {
    id: "js-async-unhandled-rejection",
    name: "JavaScript: Unhandled Promise / Async Bug",
    language: "javascript",
    difficulty: "Intermediate",
    description: "Fetching user data asynchronously without awaiting the Promise, causing operations on `undefined` response.",
    buggyCode: `async function fetchUserProfile(userId) {
    // Bug: Missing 'await' when calling fetchUserFromDB
    const user = fetchUserFromDB(userId);
    
    // Line 6: Trying to access property on a pending Promise instead of resolved user object
    const displayName = user.name.toUpperCase();
    return { id: user.id, name: displayName };
}

function fetchUserFromDB(id) {
    return new Promise(resolve => setTimeout(() => resolve({ id, name: "Alice" }), 100));
}

// Execution
fetchUserProfile(42).then(console.log);`,
    lineError: {
      lineNumber: 6,
      errorType: "TypeError",
      message: "Cannot read properties of undefined (reading 'toUpperCase')",
      explanation: "On Line 6, `user` is a `Promise` object because `fetchUserFromDB` was called without `await`. `user.name` evaluates to `undefined`, so invoking `.toUpperCase()` throws a TypeError."
    },
    fixedCode: `async function fetchUserProfile(userId) {
    // Fix: Added 'await' to resolve the Promise before reading properties
    const user = await fetchUserFromDB(userId);
    
    const displayName = user.name.toUpperCase();
    return { id: user.id, name: displayName };
}

function fetchUserFromDB(id) {
    return new Promise(resolve => setTimeout(() => resolve({ id, name: "Alice" }), 100));
}

// Execution
fetchUserProfile(42).then(console.log);`,
    fixExplanation: "Added `await` keyword on line 3 so execution pauses until `fetchUserFromDB` resolves, yielding the actual `{ id, name }` user object.",
    topics: [
      {
        name: "Async / Await",
        category: "Asynchronous JS",
        explanation: "Syntactic sugar over Promises allowing asynchronous code to be written synchronously."
      },
      {
        name: "Promises & Event Loop",
        category: "JS Concurrency",
        explanation: "Promises represent values that may be available now, in the future, or never. Must be awaited or handled with `.then()`."
      },
      {
        name: "Null/Undefined Safety",
        category: "Type Safety",
        explanation: "Accessing properties on undefined values crashes execution. Optional chaining `user?.name` provides extra safety."
      }
    ],
    alternateSolution: {
      title: "Promise Chain (.then) with Optional Chaining & Fallback",
      description: "Using standard Promise chaining with error catching and optional chaining `?.` to gracefully handle missing properties.",
      code: `function fetchUserProfilePromise(userId) {
    return fetchUserFromDB(userId)
        .then(user => ({
            id: user?.id ?? null,
            name: user?.name?.toUpperCase() ?? "ANONYMOUS"
        }))
        .catch(err => {
            console.error("Failed to load user:", err);
            return null;
        });
}`,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      pros: ["Works cleanly without needing async wrapper functions.", "Includes built-in error handling with .catch().", "Uses optional chaining to prevent crashes."],
      cons: ["Can lead to callback nesting if chaining multiple async steps."]
    },
    complexity: {
      buggyTime: "O(1)",
      buggySpace: "O(1)",
      fixedTime: "O(1)",
      fixedSpace: "O(1)"
    },
    testCases: [
      { input: "userId = 42", expectedOutput: "{ id: 42, name: 'ALICE' }" }
    ],
    executionSteps: [
      { line: 1, text: "Called `fetchUserProfile(42)`", variables: { userId: 42 } },
      { line: 3, text: "`await fetchUserFromDB(42)` invoked", variables: { status: "pending..." } },
      { line: 3, text: "Promise resolved!", variables: { user: "{ id: 42, name: 'Alice' }" } },
      { line: 5, text: "Computed `displayName = user.name.toUpperCase()`", variables: { displayName: "'ALICE'" } },
      { line: 6, text: "Returned resolved user profile object", variables: { result: "{ id: 42, name: 'ALICE' }" } }
    ]
  },
  {
    id: "cpp-null-pointer",
    name: "C++: Null Pointer Dereference",
    language: "cpp",
    difficulty: "Advanced",
    description: "Attempting to dereference a dynamic pointer before validating if memory allocation succeeded.",
    buggyCode: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

void printNodeValue(Node* node) {
    // Bug: Missing nullptr check before accessing node->data
    cout << "Value: " << node->data << endl;
}

int main() {
    Node* ptr = nullptr;
    // Line 16: Passing nullptr to function that dereferences it
    printNodeValue(ptr);
    return 0;
}`,
    lineError: {
      lineNumber: 11,
      errorType: "Segmentation Fault (SIGSEGV)",
      message: "Null Pointer Dereference at address 0x00000000",
      explanation: "Line 11 attempts `node->data` when `node` is `nullptr`. Accessing memory at address 0 causes a fatal operating system segmentation fault."
    },
    fixedCode: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

void printNodeValue(Node* node) {
    // Fix: Added nullptr guard check
    if (node == nullptr) {
        cout << "Error: Invalid null pointer!" << endl;
        return;
    }
    cout << "Value: " << node->data << endl;
}

int main() {
    Node* ptr = nullptr;
    printNodeValue(ptr);
    return 0;
}`,
    fixExplanation: "Added `if (node == nullptr)` check on line 11 to safely handle empty pointers without triggering a segmentation fault.",
    topics: [
      {
        name: "Pointers & Memory",
        category: "C++ Core",
        explanation: "Pointers store memory addresses of variables. Uninitialized or null pointers must never be dereferenced."
      },
      {
        name: "Segmentation Faults",
        category: "OS & Memory Management",
        explanation: "Occurs when a program attempts to access a memory location it does not have permission to access."
      },
      {
        name: "Defensive Programming",
        category: "Software Design",
        explanation: "Validating input conditions and invariants before performing risky operations."
      }
    ],
    alternateSolution: {
      title: "Modern C++ Smart Pointers & References",
      description: "Replacing raw pointers with C++11 `std::shared_ptr` or pass-by-reference `const Node&` to guarantee non-null invariants.",
      code: `#include <iostream>
#include <memory>
using namespace std;

struct Node {
    int data;
    shared_ptr<Node> next;
};

void printNodeRef(const Node& node) {
    // References cannot be null in standard C++
    cout << "Value: " << node.data << endl;
}

int main() {
    auto nodePtr = make_shared<Node>(Node{42, nullptr});
    if (nodePtr) {
        printNodeRef(*nodePtr);
    }
    return 0;
}`,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      pros: ["Prevents memory leaks via automatic RAII reference counting.", "Pass-by-reference avoids null pointer errors at compile time.", "Modern idiomatic C++ practice."],
      cons: ["Slight reference counting overhead for std::shared_ptr."]
    },
    complexity: {
      buggyTime: "O(1)",
      buggySpace: "O(1)",
      fixedTime: "O(1)",
      fixedSpace: "O(1)"
    },
    testCases: [
      { input: "ptr = nullptr", expectedOutput: "Error: Invalid null pointer!" }
    ],
    executionSteps: [
      { line: 16, text: "Main function initialized `ptr = nullptr`", variables: { ptr: "0x0 (nullptr)" } },
      { line: 17, text: "Call `printNodeValue(ptr)`", variables: { node: "0x0" } },
      { line: 11, text: "Evaluated `node == nullptr` -> True", variables: { nullGuardTriggered: true } },
      { line: 12, text: "Printed error message and gracefully returned", variables: { output: "Error: Invalid null pointer!" } }
    ]
  },
  {
    id: "java-recursion-stackoverflow",
    name: "Java: Recursion StackOverflowError",
    language: "java",
    difficulty: "Intermediate",
    description: "Calculating factorial recursively without a base case check for n <= 1, causing infinite recursive call stack depletion.",
    buggyCode: `public class FactorialCalculator {
    public static int factorial(int n) {
        // Bug: Missing base case check (n == 0 or n == 1)
        // Line 5: Continuously subtracts 1 into negative numbers infinitely
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        int result = factorial(5);
        System.out.println("Factorial: " + result);
    }
}`,
    lineError: {
      lineNumber: 5,
      errorType: "java.lang.StackOverflowError",
      message: "Recursive call depth exceeded stack allocation limit",
      explanation: "Line 5 calls `factorial(n - 1)` without stopping at 0 or 1. `factorial(5)` calls `factorial(4)` -> `factorial(3)` ... -> `factorial(-9999)` until the call stack runs out of memory."
    },
    fixedCode: `public class FactorialCalculator {
    public static int factorial(int n) {
        // Fix: Added base case check
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        int result = factorial(5);
        System.out.println("Factorial: " + result);
    }
}`,
    fixExplanation: "Added base condition `if (n <= 1) return 1;` on line 4 so recursive calls terminate cleanly at 1.",
    topics: [
      {
        name: "Recursion & Base Cases",
        category: "Algorithms",
        explanation: "Functions calling themselves must have explicit termination rules (base cases) to prevent infinite loops."
      },
      {
        name: "Call Stack Memory",
        category: "JVM Runtime",
        explanation: "Each method call allocates a frame on the thread's call stack storing local variables. Infinite recursion exhausts stack memory."
      }
    ],
    alternateSolution: {
      title: "Iterative Approach (Loop-based)",
      description: "Using a standard loop to compute the product without allocating recursive stack frames.",
      code: `public class FactorialIterative {
    public static long factorial(int n) {
        if (n < 0) throw new IllegalArgumentException("Negative input!");
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      pros: ["Zero call stack overhead (O(1) memory space).", "Prevents StackOverflowError completely.", "Supports larger numbers using long."],
      cons: ["Slightly less mathematically elegant than recursive notation."]
    },
    complexity: {
      buggyTime: "O(∞)",
      buggySpace: "O(∞)",
      fixedTime: "O(N)",
      fixedSpace: "O(N)"
    },
    testCases: [
      { input: "n = 5", expectedOutput: "Factorial: 120" }
    ],
    executionSteps: [
      { line: 9, text: "Invoked `factorial(5)`", variables: { n: 5 } },
      { line: 7, text: "Calculates `5 * factorial(4)`", variables: { frame: 1 } },
      { line: 7, text: "Calculates `4 * factorial(3)`", variables: { frame: 2 } },
      { line: 4, text: "Reached base case `factorial(1)` -> returns 1", variables: { baseCaseHit: true } },
      { line: 7, text: "Unwinding stack: 5 * 4 * 3 * 2 * 1 = 120", variables: { finalResult: 120 } }
    ]
  },
  {
    id: "sql-group-by-syntax-error",
    name: "SQL: Missing Column in GROUP BY",
    language: "sql",
    difficulty: "Beginner",
    description: "Selecting non-aggregated columns alongside aggregated functions without including them in the GROUP BY clause.",
    buggyCode: `-- Bug: Selecting department_name without adding it to GROUP BY
SELECT 
    department_name,
    category,
    COUNT(employee_id) AS total_employees,
    AVG(salary) AS avg_salary
FROM employees
-- Line 8: Missing 'department_name' in GROUP BY
GROUP BY category;`,
    lineError: {
      lineNumber: 8,
      errorType: "SQL Syntax/Semantic Error",
      message: "Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'employees.department_name'",
      explanation: "On line 8, `department_name` is present in the SELECT statement but omitted from the `GROUP BY` clause. SQL requires all non-aggregated select columns to be included in GROUP BY."
    },
    fixedCode: `SELECT 
    department_name,
    category,
    COUNT(employee_id) AS total_employees,
    AVG(salary) AS avg_salary
FROM employees
-- Fix: Include department_name in GROUP BY
GROUP BY department_name, category;`,
    fixExplanation: "Added `department_name` to the `GROUP BY` clause on line 8 so all non-aggregated select items match the grouping key structure.",
    topics: [
      {
        name: "SQL Aggregation & Grouping",
        category: "Databases",
        explanation: "Combining multiple rows into summary metrics (COUNT, AVG, SUM) grouped by distinct key columns."
      },
      {
        name: "Relational Query Standards",
        category: "ANSI SQL",
        explanation: "Strict SQL mode mandates that non-aggregated SELECT fields must be functionally dependent on GROUP BY columns."
      }
    ],
    alternateSolution: {
      title: "Window Functions (OVER / PARTITION BY)",
      description: "Using window functions to calculate aggregate totals without collapsing individual detailed rows.",
      code: `SELECT 
    employee_id,
    department_name,
    category,
    salary,
    COUNT(employee_id) OVER(PARTITION BY department_name, category) AS dept_total_emp,
    AVG(salary) OVER(PARTITION BY department_name, category) AS dept_avg_salary
FROM employees;`,
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      pros: ["Preserves individual employee detail rows alongside summary stats.", "Avoids collapsing records.", "Great for detailed reporting."],
      cons: ["Returns redundant aggregate values for every row in the partition."]
    },
    complexity: {
      buggyTime: "N/A (Syntax Error)",
      buggySpace: "N/A",
      fixedTime: "O(N log N)",
      fixedSpace: "O(N)"
    },
    testCases: [
      { input: "Query execution", expectedOutput: "Grouped dataset with department_name, category, total_employees, avg_salary" }
    ],
    executionSteps: [
      { line: 5, text: "Scanning `employees` table", variables: { rowsScanned: 100 } },
      { line: 8, text: "Grouping records by `(department_name, category)`", variables: { groupKeys: ["Engineering-Dev", "Sales-Rep"] } },
      { line: 3, text: "Evaluating `COUNT()` and `AVG()` per group", variables: { aggregationsDone: true } },
      { line: 1, text: "Returning formatted aggregate summary table", variables: { outputRows: 4 } }
    ]
  }
];
